import Cell from "./Cell.js";

export default function World(){
    let world = [];
    let columns;
    let rows;
    let canvas;

    function setGrid() {
        canvas = document.getElementById('gameCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / 24;
        rows = canvas.height / 24;
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

    return {
        setGrid: setGrid,
        populateWorld: populateWorld,
        setAliveCells: setAliveCells,
        countNeighbours: countNeighbours,
        setCellState: setCellState,
        columns: function () { return columns; },
        rows: function () { return rows; },
        canvas: function () { return canvas; },
        world: function () { return world; }
    }

}
