// Определение класса ячейки
class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.value = '';
        this.element = document.createElement('div');
        this.element.classList.add('cell');
        this.element.addEventListener('click', () => this.handleClick());
    }
    // Обработка клика по ячейке
    handleClick() {
        if (this.value === '' && !game.over) {
            this.value = game.currentPlayer;
            this.element.innerHTML = this.value;
            this.element.classList.add('active'); // Добавление класса "active"
            game.checkWinner();
            game.switchPlayer();
        }
    }
    // Очистка ячейки
    clear() {
        this.value = '';
        this.element.textContent = '';
        this.element.classList.remove('active'); // Удаление класса "active"
    }
}
// Определение класса игры
class Game {
    constructor() {
        this.board = document.getElementById('board');
        this.scoresContainer = document.getElementById('scores');
        this.cells = [];
        this.currentPlayer = '<i class="fas fa-times"></i>';
        this.players = {
            'X': { score: 0 },
            'O': { score: 0 }
        };
        this.over = false;
        this.createBoard();
        this.displayScores();
    }
    // Создание игрового поля
    createBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = new Cell(i, j);
                this.cells.push(cell);
                this.board.appendChild(cell.element);
            }
        }
    }
    // Проверка выигрыша
    checkWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (
                this.cells[a].value &&
                this.cells[a].value === this.cells[b].value &&
                this.cells[a].value === this.cells[c].value
            ) {
                this.over = true;
                const winnerSymbol = this.cells[a].value;
                const winner = winnerSymbol === '<i class="fas fa-times"></i>' ? 'X' : 'O'; // Получаем ключ игрока
                alert(`${winner} wins!`);
                this.players[winner].score++;
                this.displayScores();
                this.clearBoard();
            }
        }
    }
    // Отображение очков игроков
    displayScores() {
        this.scoresContainer.innerHTML = '';
        for (const player in this.players) {
            const scoreDiv = document.createElement('div');
            scoreDiv.textContent = `${player}: ${this.players[player].score}`;
            this.scoresContainer.appendChild(scoreDiv);
        }
    }
    // Переключение игрока
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === '<i class="fas fa-times"></i>' ? '<i class="fa-regular fa-circle"></i>' : '<i class="fas fa-times"></i>';
    }
    // Очистка доски
    clearBoard() {
        for (const cell of this.cells) {
            cell.clear();
        }
        this.over = false;
        this.currentPlayer = '<i class="fas fa-times"></i>';
    }
}
// Создание экземпляра игры
const game = new Game();
