class Sudoku {
    constructor() {
        this.board = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.initialBoard = null;
        this.solution = null;
    }

    reset() {
        this.board = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    isValid(board, row, col, num) {
        for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
        for (let x = 0; x < 9; x++) if (board[x][col] === num) return false;
        let startRow = row - row % 3, startCol = col - col % 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (board[i + startRow][j + startCol] === num) return false;
        return true;
    }

    solveBoard(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                    for (let num of nums) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.solveBoard(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    generateFullBoard() {
        this.reset();
        this.solveBoard(this.board);
        return JSON.parse(JSON.stringify(this.board));
    }

    generatePuzzle(difficulty = 40) {
        this.generateFullBoard();
        this.solution = JSON.parse(JSON.stringify(this.board));

        let attempts = difficulty;
        while (attempts > 0) {
            let r = Math.floor(Math.random() * 9);
            let c = Math.floor(Math.random() * 9);
            if (this.board[r][c] !== 0) {
                this.board[r][c] = 0;
                attempts--;
            }
        }
        this.initialBoard = JSON.parse(JSON.stringify(this.board));
    }

    checkErrors(currentBoard) {
        let errors = { rows: new Set(), cols: new Set(), squares: new Set(), isComplete: true };

        for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (currentBoard[r][c] === 0) errors.isComplete = false;

        const checkSet = (arr, type, index) => {
            let seen = new Set();
            arr.forEach(val => {
                if (val !== 0) {
                    if (seen.has(val)) {
                        if (type === 'row') {
                            errors.rows.add(index);
                        }
                        if (type === 'col') {
                            errors.cols.add(index);
                        }
                        if (type === 'sq') {
                            errors.squares.add(index);
                        }
                        console.log(`Ошибка: ${type} ${index + 1}`);
                    }
                    seen.add(val);
                }
            });
        };

        for (let i = 0; i < 9; i++) {
            checkSet(currentBoard[i], 'row', i);
            checkSet(currentBoard.map(row => row[i]), 'col', i);
        }
        for (let i = 0; i < 9; i++) {
            let sq = [];
            let rStart = Math.floor(i / 3) * 3, cStart = (i % 3) * 3;
            for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) sq.push(currentBoard[rStart + r][cStart + c]);
            checkSet(sq, 'sq', i);
        }
        return errors;
    }
}

const game = new Sudoku();
const boardEl = document.getElementById('board');

function initUI() {
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'cell';
            input.dataset.row = i;
            input.dataset.col = j;

            if ((j + 1) % 3 === 0 && j !== 8) {
                input.classList.add('border-right-thick');
            }
            if ((i + 1) % 3 === 0 && i !== 8) {
                input.classList.add('border-bottom-thick');
            }
            input.addEventListener('focus', () => highlightAxis(i, j));
            input.addEventListener('blur', removeHighlightAxis);

            input.addEventListener('input', (e) => {
                const val = e.target.value;
                if (!/^[1-9]$/.test(val)) e.target.value = '';
                clearStatusColors();
            });

            boardEl.appendChild(input);
        }
    }
}

function highlightAxis(row, col) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        if ((r === row || c === col) && !(r === row && c === col)) {
            cell.classList.add('highlight-axis');
        }
    });
}

function removeHighlightAxis() {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('highlight-axis'));
}

function renderBoard(showSolution = false) {
    const cells = document.querySelectorAll('.cell');
    const data = showSolution ? game.solution : game.board;

    cells.forEach(input => {
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);

        if (!showSolution) {
            const initialVal = game.initialBoard[r][c];

            if (initialVal !== 0) {
                input.value = initialVal;
                input.classList.add('initial');
                input.readOnly = true;
            }
            else {
                const currentVal = game.board[r][c];
                input.value = currentVal === 0 ? '' : currentVal;
                input.classList.remove('initial');
                input.readOnly = false;
            }
        }
        else {
            input.value = data[r][c];
        }
    });
    clearStatusColors();
}

function getBoardFromUI() {
    const current = [];
    for (let r = 0; r < 9; r++) {
        const row = [];
        for (let c = 0; c < 9; c++) {
            const input = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            row.push(parseInt(input.value) || 0);
        }
        current.push(row);
    }
    return current;
}

function clearStatusColors() {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('error', 'success'));
}

function handleNewGame() {
    game.generatePuzzle();
    const cells = document.querySelectorAll('.cell');
    cells.forEach(c => { c.value = ''; c.classList.remove('initial', 'error', 'success'); c.readOnly = false; });
    renderBoard();
}

function handleCheck() {
    const currentBoard = getBoardFromUI();
    const errors = game.checkErrors(currentBoard);
    clearStatusColors();

    const cells = document.querySelectorAll('.cell');

    if (errors.rows.size === 0 && errors.cols.size === 0 && errors.squares.size === 0) {
        if (errors.isComplete) {
            cells.forEach(c => c.classList.add('success'));
            alert("Победа! Всё верно.");
        }
        else {
            alert("Ошибок пока нет, но нужно заполнить всё поле.");
        }
        return;
    }

    cells.forEach(input => {
        const r = parseInt(input.dataset.row);
        const c = parseInt(input.dataset.col);
        const sq = Math.floor(r / 3) * 3 + Math.floor(c / 3);

        if (errors.rows.has(r) || errors.cols.has(c) || errors.squares.has(sq)) {
            if (input.value !== '') {
                input.classList.add('error');
            }
        }
    });
}

function handleSolve() {
    renderBoard(true);
}

initUI();
handleNewGame();