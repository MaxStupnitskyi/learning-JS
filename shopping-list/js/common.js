// DOM
var list = document.querySelector('.output ul');
var totalBox = document.querySelector('.total');
var hint = document.querySelector('.hint');
var title = document.getElementById('title');
var price = document.getElementById('price');
var button = document.getElementById('add');
var warn = document.getElementById('warning');

var pricing = [];
var total = 0;

list.innerHTML = '';
totalBox.textContent = '';

title.focus()

button.onclick = function () {

    if (title.value != '' && price.value != '' && !isNaN(price.value)) {
        var listItem = document.createElement('li');
        listItem.textContent = `${title.value} – \$${price.value}`;
        list.appendChild(listItem);

        total += Number(price.value);

        totalBox.textContent = 'Total: $' + total.toFixed(2);
        hint.style.display = "block";

        if (warn.style.display = "block") {
            warn.style.display = "none";
        }

        title.value = '';
        price.value = '';

        title.focus()

    } else if (title.value == '' && price.value == '' || title.value == '' && isNaN(price.value)) {
        warn.textContent = "Please, enter product name and price in correct format";
        warn.style.display = "block";
        title.focus();
    } else if (price.value == '' || isNaN(price.value)) {
        warn.textContent = "Please, enter price in correct format";
        warn.style.display = "block";
        price.focus();
    } else if (title.value == '') {
        warn.textContent = "Please, enter product name";
        warn.style.display = "block";
        title.focus();
    }

    if (list.hasChildNodes()) {
        let listItems = document.querySelectorAll("li");

        for (i = 0; i < listItems.length; i++) {
            listItems[i].addEventListener("click", remove)
        }
    } 
}

function remove() {
    this.parentNode.removeChild(this);
    let value = this.textContent;
    let divider = value.indexOf("$") + 1;
    let price = value.slice(divider);
    total -= Number(price);
    totalBox.textContent = 'Total: $' + total.toFixed(2);

    if (!list.hasChildNodes()) {
        hint.style.display = "none";
        totalBox.textContent = '';
    }
}

function enter(input) {
    input.addEventListener("keyup", function (event) { // submit result by pressing Enter button
        if (event.keyCode === 13) {
            event.preventDefault();
            button.click();
        }
    });
}

enter(title);
enter(price);