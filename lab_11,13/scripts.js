class Task {
    constructor(title) {
        this.id = 'task-' + Date.now() + Math.random().toString(36).substr(2, 9);
        this.title = title;
        this.isCompleted = false;
    }

    toggleStatus() {
        this.isCompleted = !this.isCompleted;
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }
}

class Todolist {
    constructor(title = "Новый список") {
        this.id = 'list-' + Date.now() + Math.random().toString(36).substr(2, 9);
        this.title = title;
        this.tasks = [];
        this.filterState = 'all';
    }

    updateTitle(newTitle) {
        this.title = newTitle;
    }

    addTask(taskTitle) {
        if (!taskTitle.trim()) return;
        const newTask = new Task(taskTitle);
        this.tasks.push(newTask);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }

    getTask(taskId) {
        return this.tasks.find(t => t.id === taskId);
    }

    setFilter(state) {
        this.filterState = state;
    }

    getFilteredTasks() {
        if (this.filterState === 'completed') {
            return this.tasks.filter(t => t.isCompleted);
        } else if (this.filterState === 'active') {
            return this.tasks.filter(t => !t.isCompleted);
        }
        return this.tasks;
    }

    reorderTask(draggedTaskId, targetTaskId) {
        const draggedIndex = this.tasks.findIndex(t => t.id === draggedTaskId);
        const targetIndex = this.tasks.findIndex(t => t.id === targetTaskId);

        if (draggedIndex > -1 && targetIndex > -1) {
            const [draggedItem] = this.tasks.splice(draggedIndex, 1);
            this.tasks.splice(targetIndex, 0, draggedItem);
        }
    }
}


class App {
    constructor() {
        this.lists = [];
        const defaultList = new Todolist("Мои Задачи");
        defaultList.addTask("Сделать ЛР 11");
        defaultList.addTask("Сделать ЛР 13");
        defaultList.addTask("Добавить Drag and Drop");
        this.lists.push(defaultList);

        this.appContainer = document.getElementById('app');
        this.render();
    }

    createTodolist() {
        const name = prompt("Введите название новой группы:", "Новая группа");
        if (name) {
            this.lists.push(new Todolist(name));
            this.render();
        }
    }

    deleteTodolist(listId) {
        if (confirm("Удалить этот список?")) {
            this.lists = this.lists.filter(l => l.id !== listId);
            this.render();
        }
    }

    render() {
        this.appContainer.innerHTML = '';

        this.lists.forEach(list => {
            const listElement = document.createElement('div');
            listElement.className = 'todolist-card';
            listElement.innerHTML = `
                        <div class="list-header">
                            <input class="list-title" value="${list.title}" onchange="app.handleListTitleChange('${list.id}', this.value)">
                            <button class="btn-icon" onclick="app.deleteTodolist('${list.id}')"><i class="fas fa-trash"></i></button>
                        </div>
                        
                        <div class="add-task-form">
                            <input type="text" class="task-input" id="input-${list.id}" placeholder="Что нужно сделать?" onkeypress="if(event.key === 'Enter') app.handleAddTask('${list.id}')">
                            <button class="btn-add" onclick="app.handleAddTask('${list.id}')"><i class="fas fa-plus"></i></button>
                        </div>

                        <div class="filters">
                            <button class="filter-btn ${list.filterState === 'all' ? 'active' : ''}" onclick="app.handleFilter('${list.id}', 'all')">Все</button>
                            <button class="filter-btn ${list.filterState === 'active' ? 'active' : ''}" onclick="app.handleFilter('${list.id}', 'active')">В работе</button>
                            <button class="filter-btn ${list.filterState === 'completed' ? 'active' : ''}" onclick="app.handleFilter('${list.id}', 'completed')">Готовые</button>
                        </div>

                        <ul class="tasks-container" id="container-${list.id}" ondragover="app.handleDragOver(event)" ondrop="app.handleDrop(event, '${list.id}')">
                            ${this.renderTasks(list)}
                        </ul>
                    `;
            this.appContainer.appendChild(listElement);
        });
    }

    renderTasks(list) {
        const tasks = list.getFilteredTasks();
        if (tasks.length === 0) return `<li style="text-align:center; color:#ccc; padding:10px;">Нет задач</li>`;

        return tasks.map(task => `
                    <li class="task-item ${task.isCompleted ? 'completed' : ''}" 
                        draggable="true" 
                        data-id="${task.id}"
                        data-list-id="${list.id}"
                        ondragstart="app.handleDragStart(event)"
                        ondragend="app.handleDragEnd(event)">
                        
                        <div class="checkbox-wrapper">
                            <label>
                                <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onchange="app.handleToggleTask('${list.id}', '${task.id}')">
                                <span class="custom-checkbox"></span>
                            </label>
                        </div>
                        
                        <input class="task-text" value="${task.title}" onchange="app.handleEditTask('${list.id}', '${task.id}', this.value)">

                        <div class="task-actions">
                            <button class="btn-icon btn-small edit" onclick="this.parentElement.previousElementSibling.focus()"><i class="fas fa-pen"></i></button>
                            <button class="btn-icon btn-small delete" onclick="app.handleDeleteTask('${list.id}', '${task.id}')"><i class="fas fa-times"></i></button>
                        </div>
                    </li>
                `).join('');
    }


    handleListTitleChange(listId, newTitle) {
        const list = this.lists.find(l => l.id === listId);
        if (list) list.updateTitle(newTitle);
    }

    handleAddTask(listId) {
        const input = document.getElementById(`input-${listId}`);
        const list = this.lists.find(l => l.id === listId);
        if (list && input.value.trim()) {
            list.addTask(input.value);
            this.render();
        }
    }

    handleToggleTask(listId, taskId) {
        const list = this.lists.find(l => l.id === listId);
        const task = list.getTask(taskId);
        if (task) {
            task.toggleStatus();
            this.render();
        }
    }

    handleDeleteTask(listId, taskId) {
        const list = this.lists.find(l => l.id === listId);
        if (list) {
            list.removeTask(taskId);
            this.render();
        }
    }

    handleEditTask(listId, taskId, newTitle) {
        const list = this.lists.find(l => l.id === listId);
        const task = list.getTask(taskId);
        if (task) {
            task.updateTitle(newTitle);
        }
    }

    handleFilter(listId, state) {
        const list = this.lists.find(l => l.id === listId);
        if (list) {
            list.setFilter(state);
            this.render();
        }
    }


    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', JSON.stringify({
            taskId: e.target.dataset.id,
            listId: e.target.dataset.listId
        }));
        e.dataTransfer.effectAllowed = "move";
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
        const container = e.currentTarget;
        const dragging = document.querySelector('.dragging');
        if (!dragging) return;

        const afterElement = this.getDragAfterElement(container, e.clientY);
        if (afterElement == null) {
            container.appendChild(dragging);
        } else {
            container.insertBefore(dragging, afterElement);
        }
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    handleDrop(e, targetListId) {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const sourceListId = data.listId;
        const taskId = data.taskId;

        if (sourceListId !== targetListId) return;

        const list = this.lists.find(l => l.id === targetListId);

        const container = document.getElementById(`container-${targetListId}`);
        const domItems = [...container.querySelectorAll('.task-item')];
        const newIndex = domItems.findIndex(item => item.dataset.id === taskId);

        const oldIndex = list.tasks.findIndex(t => t.id === taskId);

        if (newIndex > -1 && oldIndex > -1) {
            const [movedTask] = list.tasks.splice(oldIndex, 1);
            list.tasks.splice(newIndex, 0, movedTask);
        }

        this.render();
    }
}

const app = new App();