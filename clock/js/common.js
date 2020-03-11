// clock arrows
const hoursArrow = document.querySelector('.hours');
const minutesArrow = document.querySelector('.minutes');
const secondsArrow = document.querySelector('.seconds');

let time, hours, minutes, seconds;

function clock() {
    time = new Date();
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();

    secondsArrow.style.transform = `rotate(${seconds * 6}deg)`;
    minutesArrow.style.transform = `rotate(${minutes * 6}deg)`;
    hoursArrow.style.transform = `rotate(${hours * 30 + 0.5 * minutes}deg)`;
}

clock(); // init clock
setInterval(clock, 1000) // refresh clock every second


/* Dark mode */
const checkbox = document.querySelector('#autoDarkMode');
const toggle = document.querySelector('.toggle');

if (!checkbox.checked) {
    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        toggle.classList.add('active');
    }
    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        toggle.classList.remove('active');
    }

    // check if dark mode is enable or disable
    function darkMode() {
        if (localStorage.getItem('darkMode') == 'on') {
            disableDarkMode()
            localStorage.setItem('darkMode', 'off');
        } else {
            enableDarkMode()
            localStorage.setItem('darkMode', 'on');
        }
    }

    // toggle click handler
    toggle.addEventListener('click', darkMode)

    // dark mode after initialization
    if (localStorage.getItem('darkMode') == 'on') {
        enableDarkMode()
    } else {
        disableDarkMode()
    }
}

// Enable or disable auto dark mode
checkbox.addEventListener('click', function () {
    if (checkbox.checked) {
        localStorage.setItem('autoDarkMode', 'on');
    } else {
        localStorage.setItem('autoDarkMode', 'off');
    }
})

// Auto dark mode
if (localStorage.getItem('autoDarkMode') == 'on') {
    checkbox.checked = true;
    if (hours >= 19) {
        enableDarkMode()
        localStorage.setItem('darkMode', 'on');
    } else {
        disableDarkMode()
        localStorage.setItem('darkMode', 'off');
    }
}