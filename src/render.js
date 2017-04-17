const mat4 = require('gl-mat4');

const lineFrag = require('./shaders/line.frag.glsl');
const lineVert = require('./shaders/line.vert.glsl');
const pointFrag = require('./shaders/point.frag.glsl');
const pointVert = require('./shaders/point.vert.glsl');

function project({viewportWidth, viewportHeight}) {
  return mat4.perspective(
    [],
    Math.PI / 2,
    viewportWidth / viewportHeight,
    0.01,
    1000
  );
}

class Renderer {
  constructor(regl, camera) {
    this.regl = regl;
    this.camera = camera;
  }
}

class LineRenderer extends Renderer {
  constructor(regl, camera, grid) {
    super(regl, camera);

    this.grid = grid;
  }

  draw(attributes, elements) {
    this.regl({
      frag: lineFrag,
      vert: lineVert,
      attributes: {
        position: this.regl.buffer(attributes.positions),
        color: this.regl.buffer(attributes.colors)
      },
      uniforms: {
        proj: project,
        model: mat4.identity([]),
        view: () => this.camera.view()
      },
      elements,
      primitive: 'line'
    })();
  }
}

class PointRenderer extends Renderer {
  constructor(regl, camera, grid) {
    super(regl, camera);

    this.grid = grid;
  }

  draw(attributes) {
    this.regl({
      frag: pointFrag,
      vert: pointVert,
      attributes: {
        position: this.regl.buffer(attributes.positions),
        color: this.regl.buffer(attributes.colors)
      },
      uniforms: {
        proj: project,
        model: mat4.identity([]),
        view: () => this.camera.view()
      },
      count: attributes.positions.length,
      primitive: 'points'
    })();
  }
}

module.exports = {
  LineRenderer,
  PointRenderer
};
