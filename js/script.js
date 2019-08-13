/**
 * INIT CANVAS
 */

let canvas = document.createElement('canvas');
canvas.width = 2100;
canvas.height = 2970;

let ctx = canvas.getContext('2d');

//ADD BACKGROUND
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//LINE SETTINGS
ctx.lineWidth = 10;
ctx.lineCap = 'square';
ctx.lineJoin = 'miter';

/**
 * DRAW POLYGON
 */

const drawPolygon = points => {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

// drawPolygon([{ x: 1000, y: 1000 }, { x: 1000, y: 2000 }, { x: 2000, y: 2000 }]);

/**
 * GET RANDOM NUMBER BETWEEN
 */

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// let points = [];
// for (let i = 0; i < 3; i++) {
//   points.push({
//     x: getRandomNumberBetween(0, canvas.width),
//     y: getRandomNumberBetween(0, canvas.height)
//   });
// }
// drawPolygon(points);

const points = [
  {
    x: getRandomNumberBetween(0, canvas.width),
    y: getRandomNumberBetween(0, canvas.height)
  }
];
const distance = 500;
for (let i = 0; i < 2; i++) {
  const previousPoint = points.slice(-1)[0];
  const nextPoint = {
    x: getRandomNumberBetween(
      previousPoint.x - distance < 0 ? 0 : previousPoint.x - distance,
      previousPoint.x + distance > canvas.width
        ? canvas.width
        : previousPoint.x + distance
    ),
    y: getRandomNumberBetween(
      previousPoint.y - distance < 0 ? 0 : previousPoint.y - distance,
      previousPoint.y + distance > canvas.height
        ? canvas.height
        : previousPoint.y + distance
    )
  };
  points.push(nextPoint);
}
drawPolygon(points);

/**
 * DISPLAY CANVAS
 */
document.addEventListener('DOMContentLoaded', event => {
  document.body.append(canvas);
});
