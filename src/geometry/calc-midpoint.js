module.exports = function(edge, grid) {
  const indexA = edge[0];
  const indexB = edge[1];
  const positionA = grid.positions[indexA];
  const positionB = grid.positions[indexB];
  const midpoint = [
    (positionB[0] + positionA[0]) * 0.5,
    (positionB[1] + positionA[1]) * 0.5,
    (positionB[2] + positionA[2]) * 0.5
  ];

  return midpoint;
};
