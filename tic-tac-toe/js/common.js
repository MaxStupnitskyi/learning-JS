const cells = document.querySelectorAll('.cell');
let move = 'cross';
let moves = 0;
let stopGame;
let message = document.querySelector('.text');
let turn = document.querySelector('.turn_value');

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

document.querySelector('.restart').onclick = function () {
    stopGame = false;
    moves = 0;
    move = 'cross';
    message.textContent = 'Turn: X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    cells.forEach(function(cell) {
        cell.classList = "cell";
    })
}

function winner(w) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] == w && board[i][1] == w && board[i][2] == w ||
            board[0][i] == w && board[1][i] == w && board[2][i] == w ||
            board[0][0] == w && board[1][1] == w && board[2][2] == w ||
            board[0][2] == w && board[1][1] == w && board[2][0] == w) {
            message.textContent = `${w} is the winner!`;
            stopGame = true;
        }
    }
}

cells.forEach((cell, i) => cell.addEventListener('click', () => {
    moves++;

    if (stopGame) return;

    function placeFigure(figure) {
        if (i < 3) {
            board[0][i] = figure;
        } else if (i >= 3 && i < 6) {
            board[1][i % 3] = figure;
        } else {
            board[2][i % 6] = figure;
        }
    }

    function round(player) {
        cell.classList.add(move);
        placeFigure(player);
    }

    if (cell.classList.contains('cross') || cell.classList.contains('circle')) {
        return;
    } else {
        if (move == 'cross') {
            round('X');
            message.textContent = 'Turn: O';
            move = 'circle';
        } else {
            round('O');
            message.textContent = 'Turn: X';
            move = 'cross';
        }

        if (moves >= 9) {
            message.textContent = "It's a draw!";
        }
    }

    winner('X');
    winner('O');

}))

