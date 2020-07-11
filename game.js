let canvas;
let canvasContext;
let world = [];
let columns;
let rows;

window.onload = function () {
    setGrid();
    setWorld();
    setGameLoop();
}

function setGrid() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / 24;
    rows = canvas.height / 24;
}


function setWorld() {
    populateWorld();
    setAliveCells();
}

function populateWorld() {
    let y = 0
    for (let i = 0; i < columns; i++) {
        let x = 0;
        world[i] = [];
        for (let j = 0; j < rows; j++) {
            world[i][j] = new Cell(false, x, y);
            x += 25;
        }
        y += 25;
    }
}

function setAliveCells() {
    world[11][10].isAlive = true;
    world[10][10].isAlive = true;
    world[9][10].isAlive = true;
    world[11][11].isAlive = true;
    world[11][9].isAlive = true;
}

function Cell(isAlive, posX, posY) {
    this.size = 24;
    this.isAlive = isAlive;
    this.neighbours = 0;
    this.posX = posX;
    this.posY = posY;
}

function setGameLoop() {
    const framesPerSecond = 5;
    setInterval(function () {
        drawEverything();
    }, 2500 / framesPerSecond);
}

function drawEverything() {
    drawBackground();
    countNeighbours();
    setCellState();
    drawNewGeneration();
}

function drawBackground() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function countNeighbours() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            world[i][j].neighbours = countCellNeighbours(i, j);
        }
    }
}

function countCellNeighbours(i, j) {
    let count = 0;
    if (world[i + 1][j].isAlive) {
        count++;
    }
    if (world[i + 1][j + 1].isAlive) {
        count++;
    }
    if (world[i][j + 1].isAlive) {
        count++;
    }
    if (world[i - 1][j + 1].isAlive) {
        count++;
    }
    if (world[i - 1][j].isAlive) {
        count++;
    }
    if (world[i - 1][j - 1].isAlive) {
        count++;
    }
    if (world[i][j - 1].isAlive) {
        count++;
    }
    if (world[i + 1][j - 1].isAlive) {
        count++;
    }
    return count;
}

function setCellState() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            if (world[i][j].neighbours === 3) {
                world[i][j].isAlive = true;
            }
            if (world[i][j].neighbours < 2 || world[i][j].neighbours > 3) {
                world[i][j].isAlive = false;
            }
        }
    }
}

function drawNewGeneration() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            if (world[i][j].isAlive) {
                colorRect(world[i][j].posX, world[i][j].posY, world[i][j].size, world[i][j].size, 'white');
            }
        }
    }
}


