function changeView(x) {
    document.body.className = x;
}

let list = document.getElementById("listButton");
let grid = document.getElementById("gridButton");

list.onclick = function() {
    changeView('listView');
    document.getElementById('gridButton').classList.remove('active');
    this.classList.add('active');
}

grid.onclick = function() {
    changeView('gridView');
    document.getElementById('listButton').classList.remove('active');
    this.classList.add('active');
}