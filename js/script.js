/**
 * INIT CANVAS
 */

let canvas = document.createElement("canvas");
canvas.width = 2100;
canvas.height = 2970;

let ctx = canvas.getContext("2d");

//ADD BACKGROUND
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//LINE SETTINGS
ctx.lineWidth = 10;
ctx.lineCap = "square";
ctx.lineJoin = "miter";

/**
 * DRAW POLYGON
 */

const drawPolygon = vertices => {
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

// EXEMPLE #1
//drawPolygon([{ x: 1000, y: 1000 }, { x: 1000, y: 2000 }, { x: 2000, y: 2000 }]);

/**
 * GET RANDOM NUMBER BETWEEN
 */

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// EXEMPLE #2
// let vertices = [];
// for (let i = 0; i < 3; i++) {
//   vertices.push({
//     x: getRandomNumberBetween(0, canvas.width),
//     y: getRandomNumberBetween(0, canvas.height)
//   });
// }
// drawPolygon(vertices);

const vertices = [
  {
    x: getRandomNumberBetween(0, canvas.width),
    y: getRandomNumberBetween(0, canvas.height)
  }
];
const distance = 500;
//TODO: ? add padding ?
/**
 * GET NEXT VERTEX
 */
const getNextVertex = vertex => {
  return {
    x: getRandomNumberBetween(
      vertex.x - distance < 0 ? 0 : vertex.x - distance,
      vertex.x + distance > canvas.width ? canvas.width : vertex.x + distance
    ),
    y: getRandomNumberBetween(
      vertex.y - distance < 0 ? 0 : vertex.y - distance,
      vertex.y + distance > canvas.height ? canvas.height : vertex.y + distance
    )
  };
};
for (let i = 0; i < 2; i++) {
  const previousVertex = vertices.slice(-1)[0];
  const nextVertex = getNextVertex(previousVertex);
  vertices.push(nextVertex);
}
drawPolygon(vertices);

/**
 * GET POLYGON EDGES
 */
const getPolygonEdges = vertices => {
  let edges = new Set();
  for (let i = 0; i < vertices.length; i++) {
    edges.add([vertices[i], vertices[(i + 1) % vertices.length]]);
  }
  return edges;
};
const polygonEdges = getPolygonEdges(vertices);
let edges = new Set([...polygonEdges]);
for (let edge of edges) {
  const newEdge = getNextVertex(edge.slice(-1)[0]);
  edge.push(newEdge);
  drawPolygon(edge);
}

/**
 * DISPLAY CANVAS
 */
document.addEventListener("DOMContentLoaded", event => {
  document.body.append(canvas);
});
