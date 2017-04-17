const CLASSES = require('../grid/vertex-classes');

const mapping = {
  // Corner
  [CLASSES.CURVE_CORNER]: [1, 0, 0, 1],
  // Surface
  [CLASSES.SURFACE]: [0, 0, 1, 1],
  // Inner
  [CLASSES.INNER]: [1, 1, 1, 1]
};

module.exports = (grid, collapse) => {
  const colors = [];

  for (let i = 0; i < grid.positions.length; i++) {
    const vertexClass = grid.vertexClasses[i];

    let color = [0, 0, 0, 1];

    if (collapse && collapse.includes(i)) {
      color = [0, 1, 0, 1];
    } else if (mapping[vertexClass]) {
      color = mapping[vertexClass];
    }

    colors.push(color);
  }

  return colors;
};
