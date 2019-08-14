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
    width: 10,
    cap: "square",
    join: "miter"
  },
  vertex: {
    distance: {
      min: 200,
      max: 400
    },
    angle: {
      min: 30,
      max: 90
    }
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

/**
 * DRAW POLYGON
 */
const drawPolygon = (vertices, color = settings.color.fill) => {
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
};

// EXEMPLE #1 - Drawing Polygon with defined vertices
// drawPolygon([{ x: 1000, y: 1000 }, { x: 1000, y: 2000 }, { x: 2000, y: 2000 }]);

/**
 * GET RANDOM NUMBER BETWEEN
 */
const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// EXEMPLE #2 - Drawing Polygon with random vertices
// const vertices = [];
// for (let i = 0; i < 3; i++) {
//   vertices.push({
//     x: getRandomNumberBetween(
//       settings.canvas.padding,
//       settings.canvas.width - settings.canvas.padding
//     ),
//     y: getRandomNumberBetween(
//       settings.canvas.padding,
//       settings.canvas.height - settings.canvas.padding
//     )
//   });
// }
// drawPolygon(vertices);

const firstVertex = {
  x: getRandomNumberBetween(
    settings.canvas.padding,
    settings.canvas.width - settings.canvas.padding
  ),
  y: getRandomNumberBetween(
    settings.canvas.padding,
    settings.canvas.height - settings.canvas.padding
  )
};

/**
 * GET NEXT VERTEX BY ANGLE
 */
const getNextVertexByAngle = (vertexFrom, angle, distance) => {
  if (!angle)
    angle =
      (vertexFrom.a | 0) +
      getRandomNumberBetween(
        settings.vertex.angle.min,
        settings.vertex.angle.max
      );
  if (!distance)
    distance = getRandomNumberBetween(
      settings.vertex.distance.min,
      settings.vertex.distance.max
    );
  console.log(angle, distance);
  return {
    x: Math.round(Math.cos((angle * Math.PI) / 180) * distance + vertexFrom.x),
    y: Math.round(Math.sin((angle * Math.PI) / 180) * distance + vertexFrom.y),
    a: angle
  };
};

/**
 * IS VERTEX IN CANVAS
 */
const isVertexInCanvas = vertex => {
  return (
    vertex.x > settings.canvas.padding &&
    vertex.x < settings.canvas.width - settings.canvas.padding &&
    vertex.y > settings.canvas.padding &&
    vertex.y < settings.canvas.height - settings.canvas.padding
  );
};

const secondVertex = getNextVertexByAngle(firstVertex);
const thirdVertex = getNextVertexByAngle(secondVertex);
console.log(
  firstVertex,
  secondVertex,
  thirdVertex,
  isVertexInCanvas(secondVertex),
  isVertexInCanvas(thirdVertex)
);
drawPolygon([firstVertex, secondVertex, thirdVertex]);

/**
 * GET NEXT VERTEX
 */
// const getNextVertex = vertex => {
//   return {
//     x: getRandomNumberBetween(
//       vertex.x - settings.vertex.distance < settings.canvas.padding
//         ? settings.canvas.padding
//         : vertex.x - settings.vertex.distance,
//       vertex.x + settings.vertex.distance >
//         canvas.width - settings.canvas.padding
//         ? canvas.width - settings.canvas.padding
//         : vertex.x + settings.vertex.distance
//     ),
//     y: getRandomNumberBetween(
//       vertex.y - settings.vertex.distance < settings.canvas.padding
//         ? settings.canvas.padding
//         : vertex.y - settings.vertex.distance,
//       vertex.y + settings.vertex.distance >
//         canvas.height - settings.canvas.padding
//         ? canvas.height - settings.canvas.padding
//         : vertex.y + settings.vertex.distance
//     )
//   };
// };
// for (let i = 0; i < 2; i++) {
//   const previousVertex = vertices.slice(-1)[0];
//   const nextVertex = getNextVertex(previousVertex);
//   vertices.push(nextVertex);
// }
// drawPolygon(vertices);

// /**
//  * GET POLYGON EDGES
//  */
// const getPolygonEdges = vertices => {
//   let edges = new Set();
//   for (let i = 0; i < vertices.length; i++) {
//     edges.add([vertices[i], vertices[(i + 1) % vertices.length]]);
//   }
//   return edges;
// };
// const polygonEdges = getPolygonEdges(vertices);
// let edges = new Set([...polygonEdges]);
// for (let edge of edges) {
//   const newEdge = getNextVertex(edge.slice(-1)[0]);
//   edge.push(newEdge);
//   drawPolygon(edge, '#' + Math.floor(Math.random() * 16777215).toString(16));
// }

/**
 * DISPLAY CANVAS
 */
document.addEventListener("DOMContentLoaded", event => {
  document.body.append(canvas);
});
