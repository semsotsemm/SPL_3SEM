// 1
const productsSet = new Set();
const productsEls = {
  name: document.getElementById('productName'),
  out: document.getElementById('productsOutput'),
  list: document.getElementById('productsList'),
  add: document.getElementById('btnAddProduct'),
  remove: document.getElementById('btnRemoveProduct'),
  has: document.getElementById('btnHasProduct'),
  count: document.getElementById('btnCountProducts'),
};

productsEls.add?.addEventListener('click', () => {
  const name = (productsEls.name?.value || '').trim();
  if (!name) {
    productsEls.out.textContent = 'Введите наименование.';
    return;
  }
  const before = productsSet.size;
  productsSet.add(name);
  const added = productsSet.size > before;
  productsEls.out.textContent = added ? `Товар «${name}» добавлен.` : `Товар «${name}» уже есть.`;
  renderProductsList();
});
productsEls.remove?.addEventListener('click', () => {
  const name = (productsEls.name?.value || '').trim();
  if (!name) {
    productsEls.out.textContent = 'Введите наименование.';
    return;
  }
  const removed = productsSet.delete(name);
  productsEls.out.textContent = removed ? `Товар «${name}» удалён.` : `Товар «${name}» не найден.`;
  renderProductsList();
});
productsEls.has?.addEventListener('click', () => {
  const name = (productsEls.name?.value || '').trim();
  if (!name) {
    productsEls.out.textContent = 'Введите наименование.';
    return;
  }
  const exists = productsSet.has(name);
  productsEls.out.textContent = exists ? `Товар «${name}» в наличии.` : `Товара «${name}» нет.`;
});
productsEls.count?.addEventListener('click', () => {
  productsEls.out.textContent = `Количество товаров: ${productsSet.size}`;
});

function renderProductsList() {
  productsEls.list.innerHTML = '';
  for (const name of productsSet) {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = String(name);
    productsEls.list.appendChild(pill);
  }
}

// 2
const studentsSet = new Set();
const studentsEls = {
  id: document.getElementById('studentId'),
  group: document.getElementById('studentGroup'),
  name: document.getElementById('studentName'),
  filterGroup: document.getElementById('filterGroup'),
  out: document.getElementById('studentsOutput'),
  table: document.querySelector('#studentsTable tbody'),
  add: document.getElementById('btnAddStudent'),
  remove: document.getElementById('btnRemoveStudent'),
  filter: document.getElementById('btnFilterStudents'),
  sort: document.getElementById('btnSortStudents'),
};л

studentsEls.add?.addEventListener('click', () => {
  const id = (studentsEls.id?.value || '').trim();
  const group = (studentsEls.group?.value || '').trim();
  const name = (studentsEls.name?.value || '').trim();
  if (!id || !group || !name) {
    studentsEls.out.textContent = 'Заполните № зачётки, группу и ФИО.';
    return;
  }
  for (const s of studentsSet) {
    if (s.id === id) {
      studentsEls.out.textContent = `Студент с № «${id}» уже существует.`;
      renderStudentsTable();
      return;
    }
  }
  studentsSet.add({ id, group, name });
  studentsEls.out.textContent = `Добавлен студент № «${id}».`;
  renderStudentsTable();
});
studentsEls.remove?.addEventListener('click', () => {
  const id = (studentsEls.id?.value || '').trim();
  if (!id) {
    studentsEls.out.textContent = 'Укажите № зачётки для удаления.';
    return;
  }
  let removed = false;
  for (const s of Array.from(studentsSet)) {
    if (s.id === id) {
      studentsSet.delete(s);
      removed = true;
      break;
    }
  }
  studentsEls.out.textContent = removed ? `Удалён студент № «${id}».` : `Студент № «${id}» не найден.`;
  renderStudentsTable();
});
studentsEls.filter?.addEventListener('click', () => {
  const g = (studentsEls.filterGroup?.value || '').trim();
  const list = g ? Array.from(studentsSet).filter(s => s.group === g) : Array.from(studentsSet);
  studentsEls.out.textContent = g ? `Отфильтровано по группе: ${g}. Найдено: ${list.length}` : `Показаны все студенты: ${list.length}`;
  renderStudentsTable(list);
});
studentsEls.sort?.addEventListener('click', () => {
  const list = Array.from(studentsSet).sort((a, b) => String(a.id).localeCompare(String(b.id), 'ru', { numeric: true }));
  studentsEls.out.textContent = 'Отсортировано по номеру зачётки.';
  renderStudentsTable(list);
});

function renderStudentsTable(list = Array.from(studentsSet)) {
  studentsEls.table.innerHTML = '';
  for (const s of list) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.id}</td><td>${s.group}</td><td>${s.name}</td>`;
    studentsEls.table.appendChild(tr);
  }
}

// 3
const cartMap = new Map();
const cartEls = {
  id: document.getElementById('cartId'),
  name: document.getElementById('cartName'),
  qty: document.getElementById('cartQty'),
  price: document.getElementById('cartPrice'),
  removeByName: document.getElementById('removeByName'),
  out: document.getElementById('cartOutput'),
  table: document.querySelector('#cartTable tbody'),
  positionsCount: document.getElementById('positionsCount'),
  grandTotal: document.getElementById('grandTotal'),
  add: document.getElementById('btnAddCartItem'),
  removeById: document.getElementById('btnRemoveById'),
  removeByNameBtn: document.getElementById('btnRemoveByName'),
  changeQty: document.getElementById('btnChangeQty'),
  changePrice: document.getElementById('btnChangePrice'),
  calcTotals: document.getElementById('btnCalcTotals'),
};

cartEls.add?.addEventListener('click', () => {
  const id = (cartEls.id?.value || '').trim();
  const name = (cartEls.name?.value || '').trim();
  const qty = Number(cartEls.qty?.value);
  const price = Number(cartEls.price?.value);
  if (!id || !name || !Number.isFinite(qty) || !Number.isFinite(price)) {
    cartEls.out.textContent = 'Заполните id, название, количество и цену.';
    return;
  }
  const existed = cartMap.has(id);
  cartMap.set(id, { name, qty, price });
  cartEls.out.textContent = existed ? `Позиция ${id} обновлена.` : `Позиция ${id} добавлена.`;
  renderCartTable();
});
cartEls.removeById?.addEventListener('click', () => {
  const id = (cartEls.id?.value || '').trim();
  if (!id) {
    cartEls.out.textContent = 'Укажите id для удаления.';
    return;
  }
  const removed = cartMap.delete(id);
  cartEls.out.textContent = removed ? `Удалён товар с id «${id}».` : `Товар с id «${id}» не найден.`;
  renderCartTable();
});
cartEls.removeByNameBtn?.addEventListener('click', () => {
  const target = (cartEls.removeByName?.value || '').trim();
  if (!target) {
    cartEls.out.textContent = 'Укажите название для удаления.';
    return;
  }
  let removedCount = 0;
  for (const [id, item] of Array.from(cartMap.entries())) {
    if (item.name === target) {
      cartMap.delete(id);
      removedCount += 1;
    }
  }
  cartEls.out.textContent = removedCount > 0 ? `Удалено позиций с названием «${target}»: ${removedCount}` : `Совпадений для «${target}» не найдено.`;
  renderCartTable();
});
cartEls.changeQty?.addEventListener('click', () => {
  const id = (cartEls.id?.value || '').trim();
  const qty = Number(cartEls.qty?.value);
  if (!id || !Number.isFinite(qty)) {
    cartEls.out.textContent = 'Укажите id и новое количество.';
    return;
  }
  const item = cartMap.get(id);
  if (!item) {
    cartEls.out.textContent = `Позиция ${id} не найдена.`;
    return;
  }
  item.qty = qty;
  cartEls.out.textContent = `Количество для ${id} изменено на ${qty}.`;
  renderCartTable();
});
cartEls.changePrice?.addEventListener('click', () => {
  const id = (cartEls.id?.value || '').trim();
  const price = Number(cartEls.price?.value);
  if (!id || !Number.isFinite(price)) {
    cartEls.out.textContent = 'Укажите id и новую цену.';
    return;
  }
  const item = cartMap.get(id);
  if (!item) {
    cartEls.out.textContent = `Позиция ${id} не найдена.`;
    return;
  }
  item.price = price;
  cartEls.out.textContent = `Цена для ${id} изменена на ${price}.`;
  renderCartTable();
});
cartEls.calcTotals?.addEventListener('click', () => {
  renderCartTable();
  cartEls.out.textContent = 'Пересчитаны итоги.';
});

function renderCartTable() {
  cartEls.table.innerHTML = '';
  let count = 0;
  let total = 0;
  for (const [id, item] of cartMap) {
    count += 1;
    const sum = Number(item.qty) * Number(item.price);
    total += sum;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${id}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td><td>${sum}</td>`;
    cartEls.table.appendChild(tr);
  }
  cartEls.positionsCount.textContent = String(count);
  cartEls.grandTotal.textContent = String(total);
}

// 4
let computationCache = new WeakMap();
const paramRegistry = new Map();
const cacheEls = {
  input: document.getElementById('cacheInput'),
  out: document.getElementById('cacheOutput'),
  compute: document.getElementById('btnCompute'),
  clear: document.getElementById('btnClearCache'),
};

function computeExpensive(objWithValue) {
  const x = Number(objWithValue.value) || 0;
  return x * x;
}

cacheEls.compute?.addEventListener('click', () => {
  const raw = cacheEls.input?.value ?? '';
  const keyStr = String(raw);
  let paramObj = paramRegistry.get(keyStr);
  if (!paramObj) {
    paramObj = { value: raw };
    paramRegistry.set(keyStr, paramObj);
  }
  if (computationCache.has(paramObj)) {
    cacheEls.out.textContent = 'Из кеша: ' + computationCache.get(paramObj);
    return;
  }
  const result = computeExpensive(paramObj);
  computationCache.set(paramObj, result);
  cacheEls.out.textContent = 'Вычислено: ' + result + ' (сохранено в WeakMap)';
});

cacheEls.clear?.addEventListener('click', () => {
  computationCache = new WeakMap();
  paramRegistry.clear();
  cacheEls.out.textContent = 'Кеш очищен: создан новый WeakMap.';
});


