const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = []
let randomInitPoint;

function drawPoint(x, y, color) {
  if (color == null) {
    switch (randomInitPoint) {
      case 0:
        color = "red";
        break;
      case 1:
        color = "blue";
        break;
      case 2:
        color = "yellow";
        break;
      default:
        color = "white";
        break;

    }
  }

  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1)
}

function randomInt(min, max) {
  if (max == null) {
    max = Math.floor(min);
    min = 0;
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
  }
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function initPoints() {
  points[0] = {x: 0, y: canvas.height-1}
  points[1] = {x: canvas.width-1, y: canvas.height-1}
  points[2] = {x: canvas.width/2, y: 0}

  for (var i = 0; i < 3; i++) {
    drawPoint(points[i].x, points[i].y);
  }
}

function getMiddle(ax, ay) {
  randomInitPoint = randomInt(points.length-1);
  bx = points[randomInitPoint].x;
  by = points[randomInitPoint].y;

  if (ax >= bx) {
    var minX = bx;
  } else {
    var minX = ax;
  }

  if (ay >= by) {
    var minY = by;
  } else {
    var minY = ay;
  }


  x = Math.abs(ax-bx)/2+minX;
  y = Math.abs(ay-by)/2+minY;

  newPoint = {x:x, y:y};

  return newPoint;
}

function drawFirst() {
  let randomX = randomInt(canvas.width-1);
  let randomY = randomInt(canvas.height-1);

  drawPoint(randomX, randomY);

  let newPoint = getMiddle(randomX, randomY);
  drawPoint(newPoint.x, newPoint.y);

  draw(newPoint.x, newPoint.y)
}

function draw(x, y) {
  for (var i = 0; i < 100; i++) {
    drawPoint(x, y);

    let newPoint = getMiddle(x, y);
    drawPoint(newPoint.x, newPoint.y);
  }
  requestAnimationFrame(() => draw(newPoint.x, newPoint.y))
}

initPoints();
drawFirst();
