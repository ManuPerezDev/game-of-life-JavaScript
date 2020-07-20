import Cell from "./Cell.js";

let canvas;
let world = [];
let columns;
let rows;

window.onload = function () {
    document.getElementById('playButton')
        .addEventListener('click', playGame);

    setGrid();
    setWorld();
    setGameLoop();
}

function setGrid() {
    canvas = document.getElementById('gameCanvas');
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
            world[i][j] = Cell(false, x, y);
            x += 25;
        }
        y += 25;
    }
}

function setAliveCells() {
    world[11][10].setState(true);
    world[10][10].setState(true);
    world[9][10].setState(true);
    world[11][11].setState(true);
    world[11][9].setState(true);
}



let play = false;
function setGameLoop() {

        const framesPerSecond = 5;
        setInterval(function () {
            if(play) {
                drawEverything();
            }
        }, 2500 / framesPerSecond);

}

function playGame() {
    play = true;
}

function stopGame() {
    play = false;
}

function drawEverything() {
    drawBackground();
    countNeighbours();
    setCellState();
    nextGeneration();
}

function drawBackground() {
    colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function colorRect(leftX, topY, width, height, drawColor) {
    let canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function countNeighbours() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            world[i][j].setNeighbours(countCellNeighbours(i, j));
        }
    }
}

function countCellNeighbours(i, j) {
    let count = 0;
    if (world[i + 1][j].isAlive()) {
        count++;
    }
    if (world[i + 1][j + 1].isAlive()) {
        count++;
    }
    if (world[i][j + 1].isAlive()) {
        count++;
    }
    if (world[i - 1][j + 1].isAlive()) {
        count++;
    }
    if (world[i - 1][j].isAlive()) {
        count++;
    }
    if (world[i - 1][j - 1].isAlive()) {
        count++;
    }
    if (world[i][j - 1].isAlive()) {
        count++;
    }
    if (world[i + 1][j - 1].isAlive()) {
        count++;
    }
    return count;
}

function setCellState() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            if (world[i][j].neighbours() === 3) {
                world[i][j].setState(true);
            }
            if (world[i][j].neighbours() < 2 || world[i][j].neighbours() > 3) {
                world[i][j].setState(false);
            }
        }
    }
}

function nextGeneration() {
    for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            if (world[i][j].isAlive()) {
                colorRect(world[i][j].posX(), world[i][j].posY(), world[i][j].size(), world[i][j].size(),'white');
            }
        }
    }
}

function findScreenCoords(mouseEvent)
{
    var xpos;
    var ypos;
    //FireFox
    xpos = mouseEvent.screenX;
    ypos = mouseEvent.screenY;
    console.log(xpos + ", " + ypos)
}



