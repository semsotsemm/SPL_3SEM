import cv2
import numpy as np
import time
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Ошибка: Не удалось открыть камеру.")
    # Установите cap = None, чтобы избежать ошибок ниже
    cap = None
else:
    # Инициализация для обнаружения движения
    # Будет использоваться для сравнения с предыдущим кадром
    _, prev_frame = cap.read()
    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    prev_blur = cv2.GaussianBlur(prev_gray, (21, 21), 0)
    
    # Флаг для предотвращения многократной отправки одного и того же сигнала
    signal_sent = False
    
    print("Камера успешно инициализирована.")


def detect_hand_movement():
    """Функция для обнаружения движения на основе разницы кадров."""
    global prev_blur, signal_sent
    
    if cap is None:
        return # Выход, если камера не инициализирована

    while True:
        success, frame = cap.read()
        if not success:
            break
        
        # Обработка текущего кадра
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (21, 21), 0)
        
        # Вычисление разницы между текущим и предыдущим кадром
        frame_delta = cv2.absdiff(prev_blur, blur)
        thresh = cv2.threshold(frame_delta, 25, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        
        # Поиск контуров в пороговом изображении
        contours, _ = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        motion_detected = False
        
        # Перебор найденных контуров
        for contour in contours:
            # Если область контура слишком мала, игнорируем его (фильтр шума)
            if cv2.contourArea(contour) < 5000:  # Порог площади
                continue
            
            # Движение обнаружено
            motion_detected = True

        # Обновление предыдущего кадра для следующей итерации
        prev_blur = blur
        
        # Отправка сигнала через WebSocket
        if motion_detected and not signal_sent:
            print("Обнаружено движение! Отправка сигнала...")
            socketio.emit('motion_detected', {'status': 'active'}, namespace='/')
            signal_sent = True # Устанавливаем флаг
            time.sleep(2) # Задержка, чтобы избежать многократного срабатывания
            signal_sent = False # Сброс флага
            
        # Важно: дайте Flask-SocketIO обработать события
        socketio.sleep(0.01)

    if cap is not None:
        cap.release()
    cv2.destroyAllWindows()


@app.route('/')
def index():
    """Отображение HTML-страницы."""
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
    """Обработчик подключения WebSocket."""
    print('Client connected')


# Запуск обнаружения движения в отдельном потоке
socketio.start_background_task(detect_hand_movement)

if __name__ == '__main__':
    print("Запуск Flask сервера...")
    # Обязательно используйте run, предоставленный socketio
    socketio.run(app, debug=False)