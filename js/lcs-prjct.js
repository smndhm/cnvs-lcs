document.addEventListener("DOMContentLoaded", event => {
  // ADD CANVAS
  document.body.append(canvas);

  // DRAW ON CANVAS
  drawTriangleAfterNewVertex(settings);
  // drawTriangleForEachVertex();
  // drawTriangleAround();
  // drawDelaunay();
});
