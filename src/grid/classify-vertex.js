const calcSolidAngle = require('../geometry/calc-solid-angle');
const CLASSES = require('./vertex-classes');

// JS precision sucks, so wee use a constant here
const PI_HALF = 1.5707;
const FOUR_PI = 12.5663;
const THREE_PI_HALF = 4.7120;

// classify a vertex based on the sum of the solid angles created by incident
// cells.
function classifyVertex(index, grid) {
  const angle = calcSolidAngle(index, grid);
  const fourPiMinusAngle = FOUR_PI - angle;

  const isCorner = angle <= PI_HALF || fourPiMinusAngle <= PI_HALF;
  const isEdge = (PI_HALF < angle && angle <= THREE_PI_HALF) ||
    (PI_HALF < fourPiMinusAngle && fourPiMinusAngle <= THREE_PI_HALF);

  let vertexClass = 0;

  // Inner
  if (angle >= FOUR_PI) {
    vertexClass = CLASSES.INNER;
    // Curve Corner
  } else if (isCorner || isEdge) {
    vertexClass = CLASSES.CURVE_CORNER;
    // Surface
  } else if (angle < FOUR_PI) {
    vertexClass = CLASSES.SURFACE;
  }

  return vertexClass;
}

module.exports = classifyVertex;
