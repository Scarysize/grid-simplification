const delaunay = require('delaunay-triangulate');
const fit = require('canvas-fit');
const initCamera = require('canvas-orbit-camera');
const initRegl = require('regl');
const mat4 = require('gl-mat4');

const calcMidpoint = require('./geometry/calc-midpoint');
const getColors = require('./lib/get-colors');
const renderer = require('./render');
const selectCollapse = require('./lib/select-collapse');

const exampleGrid = require('./grid/grid-5x5');
const Grid = require('./grid/grid');

// Canvas & Camera Setup
const container = document.querySelector('.canvas-container');
const canvas = container.appendChild(document.createElement('canvas'));
window.addEventListener('resize', fit(canvas), false);
const regl = initRegl(canvas);
const camera = initCamera(canvas);

const positions = exampleGrid.positions();
const cells = exampleGrid.cells();
const grid = new Grid(positions, cells);

let nextCollapse = selectCollapse(grid);
function executeCollapse() {
  if (!nextCollapse) {
    console.log('DONE');
    return;
  }

  const edge = nextCollapse;
  const indexA = edge[0];
  const indexB = edge[1];
  const midpoint = calcMidpoint(edge, grid);

  grid.replaceVertex(indexB, indexA);
  grid.updatePosition(indexA, midpoint);

  nextCollapse = selectCollapse(grid);
}

const collapseButton = document.querySelector('button');
collapseButton.addEventListener('click', executeCollapse);

const lineRenderer = new renderer.LineRenderer(regl, camera, grid);
const pointRenderer = new renderer.PointRenderer(regl, camera, grid);

// Animation loop
regl.frame(blub => {
  regl.clear({
    color: [0, 0, 0, 1]
  });

  camera.tick();

  const attributes = {
    positions: grid.positions,
    colors: getColors(grid, nextCollapse)
  };
  const elements = grid.cells;

  lineRenderer.draw(attributes, elements);
});
