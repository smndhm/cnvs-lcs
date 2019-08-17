/**
 * SETTINGS
 */
const settings = {
  canvas: {
    width: 2100,
    height: 2970,
    padding: 100
  },
  color: {
    fill: "#ffffff",
    stroke: "#000000"
  },
  line: {
    width: 5,
    cap: "square",
    join: "round"
  },
  vertex: {
    distance: 5,
    nb: 3000
  }
};

/**
 * DISPLAY CANVAS
 */
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = settings.canvas.width;
canvas.height = settings.canvas.height;

ctx.fillStyle = settings.color.fill;

ctx.strokeStyle = settings.color.stroke;
ctx.lineWidth = settings.line.width;
ctx.lineCap = settings.line.cap;
ctx.lineJoin = settings.line.join;

//ADD BACKGROUND
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.addEventListener("DOMContentLoaded", event => {
  // ADD CANVAS
  document.body.append(canvas);

  // DRAW ON CANVAS
  // drawTriangleAfterNewVertex(10000);
  // drawTriangleForEachVertex(3000);
  drawTriangleAround(settings.vertex.nb);
});
