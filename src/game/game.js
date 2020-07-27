import World from "./World.js";
let world;
let neighborhood;
let canvas;
let columns;
let rows;

window.onload = function () {
    setGrid();
    world = World();
    neighborhood = world.getNeighborhood();
    world.populateWorld(columns, rows);
    world.setAliveCells();
    setGameLoop();
}

function setGrid() {
    canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / 24;
    rows = canvas.height / 24;
}

function setGameLoop() {
    const framesPerSecond = 5;
    setInterval(function () {
        drawEverything();
    }, 2500 / framesPerSecond);
}

function drawEverything() {
    drawBackground();
    world.countNeighbours(columns, rows);
    world.setCellState(columns, rows);
    paintNextGeneration();
}

function drawBackground() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function colorRect(leftX, topY, width, height, drawColor) {
    let canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function paintNextGeneration() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            if (neighborhood[i][j].isAlive()) {
                colorRect(neighborhood[i][j].posX(), neighborhood[i][j].posY(), neighborhood[i][j].size(), neighborhood[i][j].size(),'white');
            }
        }
    }
}



