const difference = require('lodash/difference');
const union = require('lodash/union');

const getIcells = require('./get-icells');

// get the cells of vertices a and b excluding the cells using both vertices
// (symmetrical difference of all cells using a or b)
module.exports = function(a, b, grid) {
  const vertexCellsA = grid.vertexCells[a];
  const vertexCellsB = grid.vertexCells[b];

  const cellsAB = union(vertexCellsA, vertexCellsB);
  const icells = getIcells(a, b, grid);

  return difference(cellsAB, icells);
};
