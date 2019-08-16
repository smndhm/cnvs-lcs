// for (let i = 0; i < 100000; i++) {
//   const vertex = getRandomVertex(
//     { x: settings.canvas.padding, y: settings.canvas.padding },
//     {
//       x: settings.canvas.width - settings.canvas.padding,
//       y: settings.canvas.height - settings.canvas.padding
//     }
//   );
//   if (vertices.size >= 2) {
//     closestVertices = getClosestVertices([...vertices], vertex, 2);
//     drawPolygon([vertex].concat(closestVertices));
//     // drawPolygon([vertex].concat(closestVertices), "#ffffff");
//     // drawPolygon([vertex].concat(closestVertices), getRandomHexColor());
//   }
//   vertices.add(vertex);
// }

for (let i = 0; i < 1000; i++) {
  const vertex = getRandomVertex(
    { x: settings.canvas.padding, y: settings.canvas.padding },
    {
      x: settings.canvas.width - settings.canvas.padding,
      y: settings.canvas.height - settings.canvas.padding
    }
  );
  vertices.add(vertex);
}
for (let vertex of vertices) {
  const copyVertices = new Set(vertices);
  copyVertices.delete(vertex);
  closestVertices = getClosestVertices([...copyVertices], vertex, 2);
  // drawPolygon([vertex].concat(closestVertices));
  // drawPolygon([vertex].concat(closestVertices), "#ffffff");
  drawPolygon([vertex].concat(closestVertices), getRandomHexColor());
}
