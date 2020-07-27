import Cell from "./Cell.js";

export default function World(){
    let neighborhood = [];

    function populateWorld(columns, rows) {
        let y = 0
        let cell = Cell(false, 0,0);
        for (let i = 0; i < columns; i++) {
            let x = 0;
            neighborhood[i] = [];
            for (let j = 0; j < rows; j++) {
                cell = Cell(false, x, y)
                neighborhood[i][j] = cell;
                x += cell.size() + 1;
            }
            y += cell.size() + 1;
        }
    }

    function setAliveCells() {
        neighborhood[11][10].setState(true);
        neighborhood[10][10].setState(true);
        neighborhood[9][10].setState(true);
        neighborhood[11][11].setState(true);
        neighborhood[11][9].setState(true);
    }

    function countNeighbours(columns, rows) {
        for (let i = 1; i < columns - 1; i++) {
            for (let j = 1; j < rows - 1; j++) {
                neighborhood[i][j].setNeighbours(countCellNeighbours(i, j));
            }
        }
    }

    function countCellNeighbours(i, j) {
        let count = 0;
        if (neighborhood[i + 1][j].isAlive()) {
            count++;
        }
        if (neighborhood[i + 1][j + 1].isAlive()) {
            count++;
        }
        if (neighborhood[i][j + 1].isAlive()) {
            count++;
        }
        if (neighborhood[i - 1][j + 1].isAlive()) {
            count++;
        }
        if (neighborhood[i - 1][j].isAlive()) {
            count++;
        }
        if (neighborhood[i - 1][j - 1].isAlive()) {
            count++;
        }
        if (neighborhood[i][j - 1].isAlive()) {
            count++;
        }
        if (neighborhood[i + 1][j - 1].isAlive()) {
            count++;
        }
        return count;
    }

    function setCellState(columns, rows) {
        for (let i = 1; i < columns - 1; i++) {
            for (let j = 1; j < rows - 1; j++) {
                if (neighborhood[i][j].neighbours() === 3) {
                    neighborhood[i][j].setState(true);
                }
                if (neighborhood[i][j].neighbours() < 2 || neighborhood[i][j].neighbours() > 3) {
                    neighborhood[i][j].setState(false);
                }
            }
        }
    }

    return {
        populateWorld: populateWorld,
        setAliveCells: setAliveCells,
        countNeighbours: countNeighbours,
        setCellState: setCellState,
        getNeighborhood: function () { return neighborhood; }
    }
}
