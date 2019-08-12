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

drawPolygon([{ x: 1000, y: 1000 }, { x: 1000, y: 2000 }, { x: 2000, y: 1000 }]);

/**
 * DISPLAY CANVAS
 */
document.addEventListener('DOMContentLoaded', event => {
  document.body.append(canvas);
});
