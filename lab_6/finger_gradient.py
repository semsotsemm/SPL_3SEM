
"""
Камера отслеживает руку по оттенку кожи, а коэффициент 0..1 раздаётся
локальному HTTP-серверу. Браузер запрашивает /ratio и меняет фон хедера.
"""

from __future__ import annotations

import threading
import time

import cv2
import numpy as np
from flask import Flask, jsonify

HOST = "127.0.0.1"
PORT = 8765

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
if not cap.isOpened():
    raise RuntimeError("Не удалось получить доступ к камере.")

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 640)
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 480)

latest_ratio = 0.5
stop_event = threading.Event()

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/ratio")
def get_ratio():
    return jsonify({"ratio": latest_ratio})


def create_gradient(ratio: float) -> np.ndarray:
    ratio = np.clip(ratio, 0.0, 1.0)
    start = np.array([0, 200, 83], dtype=np.float32)
    end = np.array([0, 176, 255], dtype=np.float32)
    mixed = start + (end - start) * ratio
    grad_line = np.linspace(mixed, mixed[::-1], width, axis=0)
    gradient = np.tile(grad_line, (height, 1, 1))
    return gradient.astype(np.uint8)


def find_hand_center(frame_bgr: np.ndarray):
    hsv = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2HSV)
    lower = np.array([0, 30, 40])
    upper = np.array([25, 200, 255])
    mask = cv2.inRange(hsv, lower, upper)

    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.erode(mask, kernel, iterations=1)
    mask = cv2.dilate(mask, kernel, iterations=2)
    mask = cv2.GaussianBlur(mask, (7, 7), 0)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return None, mask

    largest = max(contours, key=cv2.contourArea)
    area = cv2.contourArea(largest)
    if area < (width * height) * 0.01:
        return None, mask

    moments = cv2.moments(largest)
    if moments["m00"] == 0:
        return None, mask

    cx = int(moments["m10"] / moments["m00"])
    cy = int(moments["m01"] / moments["m00"])
    return (cx, cy, largest), mask


def camera_loop():
    global latest_ratio

    while not stop_event.is_set():
        ok, frame = cap.read()
        if not ok:
            time.sleep(0.01)
            continue

        frame = cv2.flip(frame, 1)
        hand_data, mask = find_hand_center(frame)

        ratio = latest_ratio
        if hand_data:
            cx, cy, contour = hand_data
            ratio = cx / width
            cv2.drawContours(frame, [contour], -1, (0, 255, 0), 2)
            cv2.circle(frame, (cx, cy), 10, (0, 0, 255), -1)
            cv2.putText(
                frame,
                f"x: {cx}px",
                (max(cx - 60, 10), max(cy - 20, 10)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (255, 255, 255),
                2,
            )
        else:
            cv2.putText(
                frame,
                "Show your hand to camera",
                (20, 30),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 0, 255),
                2,
            )

        latest_ratio = ratio

        gradient = create_gradient(ratio)
        blended = cv2.addWeighted(gradient, 0.75, frame, 0.25, 0)

        cv2.imshow("Finger Gradient", blended)
        cv2.imshow("Skin Mask", mask)

        if cv2.waitKey(1) & 0xFF == 27:
            stop_event.set()
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    worker = threading.Thread(target=camera_loop, daemon=True)
    worker.start()
    try:
        app.run(host=HOST, port=PORT, debug=False, use_reloader=False)
    finally:
        stop_event.set()
        worker.join(timeout=2)