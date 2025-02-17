const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const rollDiceBtn = document.getElementById("rollDiceBtn");
const diceResult = document.getElementById("diceResult");
const turnIndicator = document.getElementById("turnIndicator");
const diceSound = document.getElementById("diceSound");
const moveSound = document.getElementById("moveSound");
const snakeSound = document.getElementById("snakeSound");
const ladderSound = document.getElementById("ladderSound");
const winSound = document.getElementById("winSound");

const playerPositions = [1, 1];
let currentPlayer = 0;

const snakes = {17: 13, 52: 29, 57: 40, 62: 22, 88: 18, 95: 51, 97: 79};
const ladders = {3: 21, 8: 30, 28: 84, 58: 77, 75: 86, 80: 99, 90: 91};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getPositionCoordinates(pos) {
    let row = Math.floor((pos - 1) / 10);
    let col = (pos - 1) % 10;
    if (row % 2 === 1) col = 9 - col; // Reverse for alternate rows

    // Adjust based on canvas size and grid cell size
    let cellSize = canvas.width / 10;
    let x = col * cellSize + cellSize / 2;
    let y = canvas.height - (row + 1) * cellSize + cellSize / 2;

    return {x, y};
}


function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerPositions.forEach((pos, i) => {
        const {x, y} = getPositionCoordinates(pos);
        ctx.fillStyle = i === 0 ? "red" : "blue";
        ctx.beginPath();
        ctx.arc(x + (i * 10 - 5), y, 15, 0, Math.PI * 2); // Offset second player
        ctx.fill();
    });
}


rollDiceBtn.addEventListener("click", () => {
    diceSound.play();
    const diceValue = rollDice();
    diceResult.textContent = `Dice: ${diceValue}`;
    let newPos = playerPositions[currentPlayer] + diceValue;
    if (newPos <= 100) {
        playerPositions[currentPlayer] = newPos;
        moveSound.play();
        if (snakes[newPos]) {
            playerPositions[currentPlayer] = snakes[newPos];
            snakeSound.play();
        }
        if (ladders[newPos]) {
            playerPositions[currentPlayer] = ladders[newPos];
            ladderSound.play();
        }
        if (playerPositions[currentPlayer] === 100) {
            winSound.play();
            alert(`🎉 Player ${currentPlayer + 1} Wins! 🎉`);
            location.reload();
        }
        currentPlayer = 1 - currentPlayer;
        turnIndicator.textContent = `Player ${currentPlayer + 1}'s Turn`;
    }
    updateGame();
});
updateGame();