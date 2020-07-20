export default function Cell(state, x, y) {
    let size = 24;
    let isAlive = state;
    let neighbours = 0;
    let posX = x;
    let posY = y;

    return {
        size: function () { return size; },
        isAlive: function () { return isAlive; },
        neighbours: function () { return neighbours; },
        posX: function () { return posX; },
        posY: function () { return posY; },
        setState: function (newState) { isAlive = newState; },
        setNeighbours: function (newNeighbours) { neighbours = newNeighbours; }
    }
}
