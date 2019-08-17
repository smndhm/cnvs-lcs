/**
 * Draw Triangle after a new vertex is added
 * @param {int} nbVertex
 */
const drawTriangleAfterNewVertex = () => {
  let vertices = new Set();
  for (let i = 0; i < settings.vertex.nb; i++) {
    const vertex = getRandomVertex([
      { x: settings.canvas.padding, y: settings.canvas.padding },
      {
        x: settings.canvas.width - settings.canvas.padding,
        y: settings.canvas.height - settings.canvas.padding
      }
    ]);
    if (vertices.size >= 2) {
      closestVertices = getClosestVertices([...vertices], vertex, 2);
      drawPolygon(
        [vertex].concat(closestVertices),
        settings.vertex.color === "random"
          ? getRandomHexColor()
          : settings.vertex.color
      );
    }
    vertices.add(vertex);
  }
};

/**
 * Draw Triangles after all vertices are created
 * @param {int} nbVertex
 */
const drawTriangleForEachVertex = () => {
  let vertices = new Set();
  for (let i = 0; i < settings.vertex.nb; i++) {
    const vertex = getRandomVertex([
      { x: settings.canvas.padding, y: settings.canvas.padding },
      {
        x: settings.canvas.width - settings.canvas.padding,
        y: settings.canvas.height - settings.canvas.padding
      }
    ]);
    vertices.add(vertex);
  }
  for (let vertex of vertices) {
    const copyVertices = new Set(vertices);
    copyVertices.delete(vertex);
    closestVertices = getClosestVertices([...copyVertices], vertex, 2);
    drawPolygon(
      [vertex].concat(closestVertices),
      settings.vertex.color === "random"
        ? getRandomHexColor()
        : settings.vertex.color
    );
  }
};

/**
 * Draw Triangle With close vertex
 */
const drawTriangleAround = () => {
  let vertices = new Set();
  let canvasArea = [
    { x: settings.canvas.padding, y: settings.canvas.padding },
    {
      x: settings.canvas.width - settings.canvas.padding,
      y: settings.canvas.height - settings.canvas.padding
    }
  ];
  let verticesArea = JSON.parse(JSON.stringify(canvasArea));
  let verticesMaxArea = JSON.parse(JSON.stringify(canvasArea));
  for (let i = 0; i < settings.vertex.nb; i++) {
    let vertex;
    do {
      vertex = getRandomVertex(verticesMaxArea);
    } while (
      (vertices.size && isVertexInArea(vertex, verticesArea)) ||
      !isVertexInArea(vertex, verticesMaxArea) ||
      !isVertexInArea(vertex, canvasArea)
    );

    if (vertices.size >= 2) {
      closestVertices = getClosestVertices([...vertices], vertex, 2);
      drawPolygon(
        [vertex].concat(closestVertices),
        settings.vertex.color === "random"
          ? getRandomHexColor()
          : settings.vertex.color
      );
    }

    vertices.add(vertex);
    verticesArea = getVerticesArea(vertices);
    verticesMaxArea = JSON.parse(JSON.stringify(verticesArea));
    verticesMaxArea[0].x -= settings.vertex.distance;
    verticesMaxArea[0].y -= settings.vertex.distance;
    verticesMaxArea[1].x += settings.vertex.distance;
    verticesMaxArea[1].y += settings.vertex.distance;
  }
};
