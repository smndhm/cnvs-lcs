/**
 * DRAW POLYGON
 */
const drawPolygon = (vertices, color) => {
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.closePath();
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.stroke();
};

/**
 * GET RANDOM NUMBER BETWEEN
 */
const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * GET RANDOM VERTEX
 */

const getRandomVertex = area => {
  return {
    x: getRandomNumberBetween(area[0].x, area[1].x),
    y: getRandomNumberBetween(area[0].y, area[1].y)
  };
};

/**
 * IS VERTEX IN CANVAS
 */
const isVertexInArea = (vertex, area) => {
  return (
    vertex.x > area[0].x &&
    vertex.x < area[1].x &&
    vertex.y > area[0].y &&
    vertex.y < area[1].y
  );
};

/**
 * GET VERTICES DISTANCE
 */
const getVerticesDistance = (vertexA, vertexB) => {
  return (
    Math.pow(vertexA.x - vertexB.x, 2) + Math.pow(vertexA.y - vertexB.y, 2)
  );
};

/**
 * GET CLOSEST VERTICES
 */
const getClosestVertices = (vertices, vertex, count) => {
  return vertices
    .sort((a, b) => {
      return getVerticesDistance(a, vertex) - getVerticesDistance(b, vertex);
    })
    .slice(0, count);
};

/**
 * GET RANDOM HEXA COLOR
 */

const getRandomHexColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
};

/**
 * GET VERTICES AREA
 */

const getVerticesArea = vertices => {
  let area = [{ x: null, y: null }, { x: null, y: null }];
  for (vertex of vertices) {
    area[0].x = vertex.x < area[0].x ? vertex.x : area[0].x || vertex.x;
    area[0].y = vertex.y < area[0].y ? vertex.y : area[0].y || vertex.y;
    area[1].x = vertex.x > area[1].x ? vertex.x : area[1].x || vertex.x;
    area[1].y = vertex.y > area[1].y ? vertex.y : area[1].y || vertex.y;
  }
  return area;
};
