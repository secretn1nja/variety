// script.js

document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const turnIndicator = document.getElementById("turnIndicator");
    const winnerPopup = document.getElementById("winnerPopup");
    const winnerText = document.getElementById("winnerText");
    let currentPlayer = "X";
    const cells = [];
	const playButton = document.getElementById("playButton");
    const gamePopup = document.getElementById("gamePopup");

    
    playButton.addEventListener("click", showGame);

    function showGame() {
        gamePopup.style.display = "block";
        // Add any additional setup logic for starting the game here
    }

    // Create the Tic Tac Toe board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    updateTurnIndicator();

    function handleCellClick() {
        if (!this.textContent && currentPlayer === "X") {
            this.textContent = currentPlayer;
            if (checkWinner()) {
                showWinnerPopup(`Player ${currentPlayer} wins!`);
            } else if (isBoardFull()) {
                showWinnerPopup("It's a tie!");
            } else {
                currentPlayer = "O";
                updateTurnIndicator();
                makeAiMove();
            }
        }
    }

    function makeAiMove() {
        // Simple AI logic: Randomly choose an empty cell for now
        const emptyCells = cells.filter(cell => !cell.textContent);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const aiMove = emptyCells[randomIndex];
            aiMove.textContent = currentPlayer;
            if (checkWinner()) {
                showWinnerPopup(`Player ${currentPlayer} wins!`);
            } else if (isBoardFull()) {
                showWinnerPopup("It's a tie!");
            } else {
                currentPlayer = "X";
                updateTurnIndicator();
            }
        }
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Current Turn: Player ${currentPlayer}`;
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
    
        return winningCombos.some(combo => {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                return true;
            }
            return false;
        });
    }

    function isBoardFull() {
        return cells.every(cell => cell.textContent !== "");
    }

    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        updateTurnIndicator();
        closePopup();
    }

    function showWinnerPopup(message) {
        winnerText.textContent = message;
        winnerPopup.style.display = "block";
    }

    function closePopup() {
        winnerPopup.style.display = "none";
    }

    window.resetBoard = resetBoard;
    window.closePopup = closePopup;
});
