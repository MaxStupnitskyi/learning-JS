function randomizer() {
    return Math.floor(1 + Math.random() * 100); // generate random integer from 1 to 100
}

function endgame() {
    input.disabled = true;
    button.disabled = true;
    document.getElementById("restart").style.display = 'block';
}

function newGame() {
    attempts = 0;
    input.disabled = false;
    button.disabled = false;
    restart.style.display = 'none';
    output.innerHTML = "";
    number = randomizer();
    // console.log(`Number is ${number}`) // log this number
    output.style.color = 'red';
    document.getElementById("history").textContent = '';
    input.focus()
}

function enterData() {
    let result = Number(input.value);

    if (Number.isInteger(result) && result > 0 && result <= 100) { // check if input value is integer
        if (attempts === 0) {
            document.getElementById("history").textContent = 'Previous attempts: '
        }
        attempts++;

        document.getElementById("history").textContent += input.value + ' ';

        if (result < number) {
            output.textContent = "Too low"
        } else if (result > number) {
            output.textContent = "Too high"
        } else {
            output.style.color = 'green'
            output.textContent = `Correct! You guessed in ${attempts} attempts`;
            endgame()
        }

        if (attempts >= 10 && result != number) {
            output.textContent = "You lose :("
            endgame()
        }

    } else {
        output.textContent = "Please enter an integer from 1 to 100"
    }

    input.value = ''; // clear input after sending the result
}

let number = randomizer(); // create random number
// console.log(`Number is ${number}`) // log this number
button = document.getElementById("button");
restart = document.getElementById("restart");
input = document.getElementById("input");
output = document.getElementById("output");
history = document.getElementById("history"); // ???? not working ????
attempts = 0; // counter of attempts

input.focus()

input.addEventListener("keyup", function (event) { // submit result by pressing Enter button
    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

button.addEventListener('click', enterData)
restart.addEventListener('click', newGame)