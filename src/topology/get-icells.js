const intersection = require('lodash/intersection');

// get the cells shared by two vertices
module.exports = function(a, b, grid) {
  const vertexCellsA = grid.vertexCells[a];
  const vertexCellsB = grid.vertexCells[b];

  return intersection(vertexCellsA, vertexCellsB);
};
