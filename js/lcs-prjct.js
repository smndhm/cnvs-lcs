/**
 * DISPLAY CANVAS
 */
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = settings.canvas.width;
canvas.height = settings.canvas.height;

if (Array.isArray(settings.color.fill)) {
  let linearGradient = ctx.createLinearGradient(
    0,
    0,
    0,
    settings.canvas.height
  );
  ctx.fillStyle = linearGradient;
  linearGradient.addColorStop(0, settings.color.fill[0]);
  linearGradient.addColorStop(1, settings.color.fill[1]);
} else {
  ctx.fillStyle = settings.color.fill;
}

if (Array.isArray(settings.color.stroke)) {
  let linearGradient = ctx.createLinearGradient(
    settings.canvas.padding,
    settings.canvas.padding,
    settings.canvas.padding,
    settings.canvas.height - settings.canvas.padding
  );
  ctx.strokeStyle = linearGradient;
  linearGradient.addColorStop(0, settings.color.stroke[0]);
  linearGradient.addColorStop(1, settings.color.stroke[1]);
} else {
  ctx.strokeStyle = settings.color.stroke;
}

ctx.lineWidth = settings.line.width;
ctx.lineCap = settings.line.cap;
ctx.lineJoin = settings.line.join;

//ADD BACKGROUND
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.addEventListener("DOMContentLoaded", event => {
  // ADD CANVAS
  document.body.append(canvas);

  // DRAW ON CANVAS
  drawTriangleAfterNewVertex(settings);
  // drawTriangleForEachVertex();
  // drawTriangleAround();
  // drawDelaunay();
});
