import World from "./World.js";
let world;
let grid;

window.onload = function () {
    world = World();
    grid = world.world();
    world.setGrid();
    world.populateWorld();
    world.setAliveCells();
    setGameLoop();
}

function setGameLoop() {
    const framesPerSecond = 5;
    setInterval(function () {
        drawEverything();
    }, 2500 / framesPerSecond);
}

function drawEverything() {
    drawBackground();
    world.countNeighbours();
    world.setCellState();
    nextGeneration();
}

function drawBackground() {
    colorRect(0, 0, world.canvas().width, world.canvas().height, 'black');
}

function colorRect(leftX, topY, width, height, drawColor) {
    let canvasContext = world.canvas().getContext('2d');
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function nextGeneration() {
    for (let i = 1; i < world.columns() - 1; i++) {
        for (let j = 1; j < world.rows() - 1; j++) {
            if (grid[i][j].isAlive()) {
                colorRect(grid[i][j].posX(), grid[i][j].posY(), grid[i][j].size(), grid[i][j].size(),'white');
            }
        }
    }
}



