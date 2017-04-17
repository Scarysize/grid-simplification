// get the unique edge in the grid. The orientation of the edge is disregarded,
// we collapse edges at their mid point.
module.exports = function(grid) {
  const cells = grid.cells.filter(cell => cell.length);
  const positions = grid.positions;

  const edges = [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    const cellEdges = [
      [cell[0], cell[1]],
      [cell[0], cell[2]],
      [cell[0], cell[3]],
      [cell[1], cell[2]],
      [cell[1], cell[3]],
      [cell[2], cell[3]]
    ];

    const sortedByX = cellEdges.map(edge => {
      return edge.sort((a, b) => positions[a] < positions[b]);
    });

    sortedByX.forEach(edge => {
      const hasEdge = edges.find(
        storedEdge => storedEdge[0] === edge[0] && storedEdge[1] === edge[1]
      );

      if (hasEdge) {
        return;
      }

      edges.push(edge);
    });
  }

  return edges;
};
