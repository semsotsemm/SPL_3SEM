const numbersInput = document.getElementById("numbersInput");
const task1Main = document.getElementById("task1Main");
const task1Rest = document.getElementById("task1Rest");

// ... (весь остальной код для задач 1-5, который вы предоставили) ...

const userPresetSelect = document.getElementById("userPreset");
const task2User = document.getElementById("task2User");
// ...

// ... (Весь остальной код задач 1-5) ...

// === УДАЛЕННЫЙ БЛОК: Код SocketIO удален, чтобы избежать конфликтов ===
// const dynamicHeader = document.getElementById("dynamicHeader"); // УДАЛЕНО
// const socket = io(); // УДАЛЕНО
// socket.on('motion_detected', (data) => { ... }); // УДАЛЕНО
// =====================================================================

const likesCounts = posts.map(({ likesCount }) => likesCount);
// ... (Весь остальной код задач 1-5) ...

const updateSum = () => {
  const values = sumInputs.map((input) => Number(input.value));
  sumSpread.textContent = `values = [${values.join(", ")}]`;
  sumResultEl.textContent = `sumValues(...values) = ${sumValues(...values)}`;
};

sumInputs.forEach((input) => {
  input.addEventListener("input", updateSum);
});

updateSum();