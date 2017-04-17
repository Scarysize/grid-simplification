const classifyVertex = require('./classify-vertex');
const getVertexCells = require('../topology/get-vertex-cells');
const getIcells = require('../topology/get-icells');
const getNcells = require('../topology/get-ncells');

class Grid {
  constructor(positions, cells) {
    this.positions = positions;
    this.cells = cells;
    this.vertexCells = [];
    this.vertexClasses = [];

    this.populateVertexCells();
    this.populateVertexClasses();
  }

  populateVertexClasses() {
    for (let i = 0; i < this.positions.length; i++) {
      this.vertexClasses[i] = classifyVertex(i, this);
    }
  }

  populateVertexCells() {
    for (let i = 0; i < this.positions.length; i++) {
      this.vertexCells[i] = getVertexCells(i, this);
    }
  }

  replaceVertex(index, replacement) {
    const icells = getIcells(index, replacement, this);
    const ncells = getNcells(index, replacement, this);

    // ncells are modified by a edge collapse:
    // - replace the deleted vertex index
    // - recalculate the vertex classes of the these cells
    ncells.forEach(cellIndex => {
      const cell = this.cells[cellIndex];
      const indexToReplace = cell.indexOf(index);

      if (indexToReplace >= 0) {
        cell[indexToReplace] = replacement;
      }

      cell.forEach(cellVertex => {
        this.vertexClasses[cellVertex] = classifyVertex(cellVertex, this);
      });
    });

    // icells collapse to triangles --> remove them form the grid
    this.cells = this.cells.map((cell, index) => {
      if (icells.includes(index)) {
        return [];
      }

      return cell;
    });

    this.vertexCells[replacement] = getVertexCells(replacement, this);
  }

  updatePosition(index, position) {
    this.positions[index] = position;
  }
}

module.exports = Grid;
