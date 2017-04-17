const Vector = require('./vector');

// src: http://mathworld.wolfram.com/SphericalExcess.html
function calcSolidAngle(point, neighbours, positions) {
  if (!neighbours.length) {
    return 0;
  }
  // POINTS
  const O = Vector.fromArray(positions[point]);
  const A = Vector.fromArray(positions[neighbours[0]]);
  const B = Vector.fromArray(positions[neighbours[1]]);
  const C = Vector.fromArray(positions[neighbours[2]]);
  // VECTORS
  const a = A.subtract(O);
  const b = B.subtract(O);
  const c = C.subtract(O);
  // INTERMEDIATE STEPS
  const alpha = b.angleTo(c);
  const beta = a.angleTo(c);
  const gamma = a.angleTo(b);
  const s = (alpha + beta + gamma) / 2;

  const angle = Math.sqrt(
    Math.tan(s / 2) *
      Math.tan((s - alpha) / 2) *
      Math.tan((s - beta) / 2) *
      Math.tan((s - gamma) / 2)
  );

  // Numbers get to small for JS to handle
  if (isNaN(angle)) {
    return 0;
  }

  return 4 * Math.atan(angle);
}

function getCellNeighbours(index, cell) {
  return cell.filter(cellIndex => cellIndex !== index);
}

module.exports = function(index, grid) {
  const vertexCells = grid.vertexCells[index];

  let solidAngleSum = 0;

  for (let i = 0; i < vertexCells.length; i++) {
    const cell = grid.cells[vertexCells[i]];
    const cellNeighbours = getCellNeighbours(index, cell);
    const angleAtCell = calcSolidAngle(index, cellNeighbours, grid.positions);

    solidAngleSum += angleAtCell;
  }

  return solidAngleSum;
};
