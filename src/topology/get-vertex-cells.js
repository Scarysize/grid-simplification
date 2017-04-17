module.exports = function(index, grid) {
  const cells = grid.cells;
  const vertexCells = [];

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    if (cell.includes(index)) {
      vertexCells.push(i);
    }
  }

  return vertexCells;
};
