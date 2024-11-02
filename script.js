document.addEventListener('DOMContentLoaded', () => {
    const gameState = {
        board: Array(3).fill(null).map(() => Array(3).fill(null)),
        currentPlayer: 'Red',
        winner: null,
    };

    const colorMap = {
        'Red': 'rgb(255, 0, 0)',
        'Green': 'rgb(0, 255, 0)',
        'Blue': 'rgb(0, 0, 255)',
    };

    const winningPatterns = [
        ['Red', 'Green', 'Blue'],
        ['Blue', 'Green', 'Red']
    ];

    function initializeGame() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', handleCellClick);
                gridContainer.appendChild(cell);
            }
        }
        updatePlayerTurn();
    }

    function handleCellClick(event) {
        if (gameState.winner) return;

        const cell = event.target;
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        if (gameState.board[x][y] !== null) return;

        gameState.board[x][y] = gameState.currentPlayer;
        cell.style.backgroundColor = colorMap[gameState.currentPlayer];

        if (checkWinner()) {
            showWinnerPopup(gameState.currentPlayer);
        } else if (checkTie()) {
            showTiePopup();
        } else {
            switchPlayer();
            updatePlayerTurn();
        }
    }

    function switchPlayer() {
        if (gameState.currentPlayer === 'Red') {
            gameState.currentPlayer = 'Green';
        } else if (gameState.currentPlayer === 'Green') {
            gameState.currentPlayer = 'Blue';
        } else {
            gameState.currentPlayer = 'Red';
        }
    }

    function updatePlayerTurn() {
        document.getElementById('current-player').innerText = `Current Player's Turn: ${gameState.currentPlayer}`;
    }

    function checkWinner() {
        for (let pattern of winningPatterns) {
            // Check rows
            for (let x = 0; x < 3; x++) {
                if (gameState.board[x].join() === pattern.join()) {
                    gameState.winner = gameState.currentPlayer;
                    return true;
                }
            }
            // Check columns
            for (let y = 0; y < 3; y++) {
                let column = [gameState.board[0][y], gameState.board[1][y], gameState.board[2][y]];
                if (column.join() === pattern.join()) {
                    gameState.winner = gameState.currentPlayer;
                    return true;
                }
            }
            // Check diagonals
            let diagonal1 = [gameState.board[0][0], gameState.board[1][1], gameState.board[2][2]];
            let diagonal2 = [gameState.board[0][2], gameState.board[1][1], gameState.board[2][0]];
            if (diagonal1.join() === pattern.join() || diagonal2.join() === pattern.join()) {
                gameState.winner = gameState.currentPlayer;
                return true;
            }
        }
        return false;
    }

    function checkTie() {
        // Check if all cells are filled
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (gameState.board[x][y] === null) {
                    return false; // If any cell is still null, not a tie
                }
            }
        }
        // If all cells are filled and no winner, it's a tie
        return gameState.winner === null;
    }

    function showWinnerPopup(winner) {
        setTimeout(() => {
            alert(`Winner: ${winner}`);
            resetGame();
        }, 200); // Delay the alert to show the final move
    }

    function showTiePopup() {
        setTimeout(() => {
            alert(`It's a Tie!`);
            resetGame();
        }, 200); // Delay the alert to show the final move
    }

    function resetGame() {
        gameState.board = Array(3).fill(null).map(() => Array(3).fill(null));
        gameState.currentPlayer = 'Red';
        gameState.winner = null;
        document.getElementById('current-player').innerText = `Current Player's Turn: Red`;
        document.getElementById('winner').innerText = '';
        initializeGame();
    }

    document.getElementById('reset-button').addEventListener('click', resetGame);

    document.getElementById('instructions-button').addEventListener('click', () => {
        const instructions = `How to Play:
        1. Click on any empty cell to place your color marker.
        2. The goal is to get three markers of your color in a row (horizontal, vertical, or diagonal).
        3. Players take turns. The current player's turn is displayed at the top.
        4. Click "Reset Game" to start a new game.
        5. Have fun playing Color Tic-Tac-Toe!`;

        alert(instructions);
    });

    initializeGame();
});



