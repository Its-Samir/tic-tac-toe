const container = document.querySelector('.container');
const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');
const title = document.getElementById('title');
const overlay = document.getElementById('overlay');

let isDrawArr = [];

resetBtn.addEventListener('click', reset);

play();

let list = [];
let currentPlayer = 'x';

function play() {

    title.textContent = 'Start playing the game.';
    overlay.style.display = 'none';

    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    boxes.forEach(box => {
        box.addEventListener('click', (event) => {

            if (list[+event.target.getAttribute('id')] === undefined) {
                list[+event.target.getAttribute('id')] = currentPlayer;
                isDrawArr.push(currentPlayer);
                box.textContent = currentPlayer;
                for (const combination of winCombinations) {
                    const [a, b, c] = combination;
                    if (list[a] === currentPlayer && list[b] === currentPlayer && list[c] === currentPlayer) {
                        overlay.style.display = 'flex';
                        title.textContent = `${currentPlayer.toUpperCase()} won the game.`;
                        return;
                    }
                }
                currentPlayer === 'x' ? currentPlayer = 'o' : currentPlayer = 'x';
                title.textContent === 'Turn for O' ? title.textContent = 'Turn for X' : title.textContent = 'Turn for O';
            }

            if (title.textContent !== 'X won the game.' && title.textContent !== 'O won the game.' && isDrawArr.length >= 9) {
                overlay.style.display = 'flex';
                title.textContent = 'Game Draw.';
            }
        });
    });
}

function reset() {
    boxes.forEach(box => box.textContent = '');
    currentPlayer = 'x';
    list = [];
    isDrawArr = [];
    play();
}