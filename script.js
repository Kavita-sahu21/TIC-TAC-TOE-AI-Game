const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
const gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            return gameState[a];
        }
    }
    if (!gameState.includes(null)) {
        return 'Draw';
    }
    return null;
}

function makeMove(index) {
    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    const winner = checkWinner();
    if (winner) {
        message.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = currentPlayer === 'X' ? 'Your Turn!' : 'AI is Thinking...';
        if (currentPlayer === 'O') {
            setTimeout(aiMove, 500);
        }
    }
}

function aiMove() {
    const availableCells = gameState.map((cell, index) => (cell === null ? index : null)).filter((cell) => cell !== null);

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex);
}

function resetGame() {
    gameState.fill(null);
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = 'Your Turn!';
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        makeMove(parseInt(e.target.dataset.index, 10));
    }
});

resetButton.addEventListener('click', resetGame);
