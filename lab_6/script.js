const hero = document.getElementById("hero");
const numbersInput = document.getElementById("numbersInput");
const task1Main = document.getElementById("task1Main");
const task1Rest = document.getElementById("task1Rest");

const userPresetSelect = document.getElementById("userPreset");
const task2User = document.getElementById("task2User");
const task2Admin = document.getElementById("task2Admin");

const task3Likes = document.getElementById("task3Likes");
const task3Dialogs = document.getElementById("task3Dialogs");
const task3Messages = document.getElementById("task3Messages");
const task3NewPost = document.getElementById("task3NewPost");

const taskInput = document.getElementById("taskInput");
const taskBoard = document.getElementById("taskBoard");

const sumInputs = [...document.querySelectorAll("[data-sum-input]")];
const sumSpread = document.getElementById("sumSpread");
const sumResultEl = document.getElementById("sumResult");

// --- Hero gradient interactions ---
const green = { r: 0, g: 200, b: 83 };
const blue = { r: 0, g: 176, b: 255 };

const lerp = (a, b, t) => Math.round(a + (b - a) * t);

const mixColors = (colorA, colorB, t) =>
  `rgb(${lerp(colorA.r, colorB.r, t)}, ${lerp(colorA.g, colorB.g, t)}, ${lerp(
    colorA.b,
    colorB.b,
    t
  )})`;

let heroDragging = false;
let lastRemoteRatio = 0.5;
const clampRatio = (value) => Math.min(Math.max(value, 0), 1);

const setHeroGradient = (ratio) => {
  const startColor = mixColors(green, blue, ratio * 0.3);
  const endColor = mixColors(blue, green, 0.4 + ratio * 0.6);
  hero.style.setProperty(
    "--hero-bg",
    `linear-gradient(135deg, ${startColor}, ${endColor})`
  );
};

const applyRatio = (ratio) => {
  lastRemoteRatio = clampRatio(ratio);
  if (!heroDragging) {
    setHeroGradient(lastRemoteRatio);
  }
};

const updateHeroGradient = (event) => {
  const rect = hero.getBoundingClientRect();
  const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
  const ratio = rect.width === 0 ? 0 : x / rect.width;
  setHeroGradient(ratio);
};

hero.addEventListener("pointerdown", (event) => {
  heroDragging = true;
  hero.setPointerCapture(event.pointerId);
  updateHeroGradient(event);
});

hero.addEventListener("pointermove", (event) => {
  if (!heroDragging) return;
  updateHeroGradient(event);
});

const stopHeroDrag = (event) => {
  if (event.pointerId) {
    hero.releasePointerCapture(event.pointerId);
  }
  heroDragging = false;
  applyRatio(lastRemoteRatio);
};

hero.addEventListener("pointerup", stopHeroDrag);
hero.addEventListener("pointercancel", stopHeroDrag);
hero.addEventListener("pointerleave", () => {
  heroDragging = false;
  applyRatio(lastRemoteRatio);
});

const CAMERA_RATIO_URL = "http://127.0.0.1:8765/ratio";
let cameraPollErrorCount = 0;

const pollCameraRatio = async () => {
  try {
    const response = await fetch(CAMERA_RATIO_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Bad status");
    }
    const data = await response.json();
    if (typeof data.ratio === "number" && !Number.isNaN(data.ratio)) {
      cameraPollErrorCount = 0;
      applyRatio(data.ratio);
    }
  } catch (error) {
    cameraPollErrorCount += 1;
    if (cameraPollErrorCount === 5) {
      console.warn(
        "Не удаётся получить данные от finger_gradient.py. Убедись, что скрипт запущен."
      );
    }
  } finally {
    setTimeout(pollCameraRatio, 120);
  }
};

setHeroGradient(lastRemoteRatio);
pollCameraRatio();

// --- Задача 1 ---
const parseNumbers = (value) =>
  value
    .split(",")
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length)
    .map((chunk) => Number(chunk))
    .filter((num) => !Number.isNaN(num));

const updateNumbers = () => {
  const numbers = parseNumbers(numbersInput.value);

  if (numbers.length === 0) {
    task1Main.textContent = "Добавь минимум одно число в массив numbers.";
    task1Rest.textContent = "";
    return;
  }

  const [y, ...otherNumbers] = numbers;
  task1Main.textContent = `y = ${y}`;
  task1Rest.textContent = otherNumbers.length
    ? `Остальные элементы: [${otherNumbers.join(", ")}]`
    : "Больше элементов не осталось — rest вернул пустой массив.";
};

numbersInput.addEventListener("input", updateNumbers);
updateNumbers();

// --- Задача 2 ---
const baseUsers = {
  alice: { name: "Alice", age: 25, occupation: "дизайнер" },
  leo: { name: "Leo", age: 31, occupation: "разработчик" },
  mira: { name: "Mira", age: 22, occupation: "тьютор" },
};

const updateAdmin = () => {
  const user = baseUsers[userPresetSelect.value];
  const admin = { admin: true, ...user };

  task2User.textContent = `user = ${JSON.stringify(user)}`;
  task2Admin.textContent = `admin = ${JSON.stringify(admin)}`;
};

userPresetSelect.addEventListener("change", updateAdmin);
updateAdmin();

// --- Задача 3 ---
const store = {
  state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi", likesCount: 12 },
        { id: 2, message: "By", likesCount: 1 },
      ],
      newPostText: "About me",
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Valera" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Sasha" },
        { id: 4, name: "Viktor" },
      ],
      messages: [
        { id: 1, message: "hi" },
        { id: 2, message: "hi hi" },
        { id: 3, message: "hi hi hi" },
      ],
    },
    sidebar: [],
  },
};

const {
  state: {
    profilePage: { posts, newPostText },
    dialogsPage: { dialogs, messages },
  },
} = store;

const likesCounts = posts.map(({ likesCount }) => likesCount);
const evenDialogs = dialogs.filter(({ id }) => id % 2 === 0);
const helloMessages = messages.map(
  (msg) => `(id ${msg.id}) ${msg.message.toUpperCase()}`
);

task3Likes.textContent = `likesCount: [${likesCounts.join(", ")}]`;
task3Dialogs.textContent = `Чётные id: ${evenDialogs
  .map((d) => d.name)
  .join(", ")}`;
task3Messages.textContent = `messages => ${helloMessages.join(" | ")}`;
task3NewPost.textContent = `newPostText: "${newPostText}"`;

// --- Задача 4 ---
let tasks = [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactJS", isDone: false },
  { id: 4, title: "Rest API", isDone: false },
  { id: 5, title: "GraphQL", isDone: false },
];

const createTaskCard = (task, index) => {
  const li = document.createElement("li");
  li.className = "task-card";
  li.draggable = true;
  li.dataset.id = task.id;

  const priority = document.createElement("span");
  priority.className = "task-card__priority";
  priority.textContent = index + 1;

  const title = document.createElement("p");
  title.className = "task-card__title";
  title.textContent = task.title;

  const status = document.createElement("span");
  status.className = "task-card__status";
  status.textContent = task.isDone ? "готово" : "в работе";

  li.append(priority, title, status);
  return li;
};

const renderTaskBoard = () => {
  taskBoard.innerHTML = "";
  tasks.forEach((task, index) => {
    const card = createTaskCard(task, index);
    taskBoard.append(card);
  });
};

const handleDragStart = (event) => {
  const card = event.target.closest(".task-card");
  if (!card) return;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", card.dataset.id);
  card.classList.add("task-card--dragging");
};

const handleDragEnd = () => {
  const draggingCard = document.querySelector(".task-card--dragging");
  if (draggingCard) {
    draggingCard.classList.remove("task-card--dragging");
  }
  syncTasksWithDom();
};

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll(".task-card:not(.task-card--dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  ).element;
};

const syncTasksWithDom = () => {
  const orderIds = [...taskBoard.querySelectorAll(".task-card")].map((card) =>
    Number(card.dataset.id)
  );
  const map = new Map(tasks.map((task) => [task.id, task]));
  tasks = orderIds.map((id) => map.get(id));
  renderTaskBoard();
};

taskBoard.addEventListener("dragstart", handleDragStart, true);
taskBoard.addEventListener("dragend", handleDragEnd, true);

taskBoard.addEventListener("dragover", (event) => {
  event.preventDefault();
  const draggingCard = document.querySelector(".task-card--dragging");
  if (!draggingCard) return;

  const afterElement = getDragAfterElement(taskBoard, event.clientY);
  if (afterElement == null) {
    taskBoard.appendChild(draggingCard);
  } else {
    taskBoard.insertBefore(draggingCard, afterElement);
  }
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const title = taskInput.value.trim();
  if (!title) return;

  const newTask = { id: Date.now(), title, isDone: false };
  tasks = [...tasks, newTask];
  taskInput.value = "";
  renderTaskBoard();
});

renderTaskBoard();

// --- Задача 5 ---
function sumValues(x, y, z) {
  return x + y + z;
}

const updateSum = () => {
  const values = sumInputs.map((input) => Number(input.value));
  sumSpread.textContent = `values = [${values.join(", ")}]`;
  sumResultEl.textContent = `sumValues(...values) = ${sumValues(...values)}`;
};

sumInputs.forEach((input) => {
  input.addEventListener("input", updateSum);
});

updateSum();

