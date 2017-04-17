const getUniqueEdges = require('../topology/get-unique-edges');
const classifyVertex = require('../grid/classify-vertex');
const CLASSES = require('../grid/vertex-classes');

function distance(a, b) {
  return Math.sqrt(
    Math.pow(b[0] - a[0], 2) +
      Math.pow(b[1] - a[1], 2) +
      Math.pow(b[2] - a[2], 2)
  );
}

function edgeDistance(edge, grid) {
  const positionsA = grid.positions[edge[0]];
  const positionsB = grid.positions[edge[1]];

  return distance(positionsA, positionsB);
}

function shouldConsider(edge, grid) {
  const classA = classifyVertex(edge[0], grid);
  const classB = classifyVertex(edge[1], grid);

  // only collapse two inner or two surface vertices,
  // this keeps the outer shape of the grid intact
  if (
    (classA === CLASSES.INNER && classB === CLASSES.INNER) ||
    (classA === CLASSES.SURFACE && classB === CLASSES.SURFACE)
  ) {
    return true;
  }

  return false;
}

// select the shortest possible edge --> the collapse causes the least change
// to the grid
module.exports = function(grid) {
  const edges = getUniqueEdges(grid);
  const positions = grid.positions;

  let shortestEdge = null;
  let shortestDist = Infinity;
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    if (shouldConsider(edge, grid)) {
      const distance = edgeDistance(edge, grid);
      if (distance < shortestDist) {
        shortestDist = distance;
        shortestEdge = edge;
      }
    }
  }

  return shortestEdge;
};
