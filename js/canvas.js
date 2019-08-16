/**
 * SETTINGS
 */
const settings = {
  canvas: {
    width: 2200,
    height: 2200,
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
  }
};

/**
 * INIT CANVAS
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

const vertices = new Set();

/**
 * DISPLAY CANVAS
 */
document.addEventListener("DOMContentLoaded", event => {
  document.body.append(canvas);
});
