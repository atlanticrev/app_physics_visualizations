const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const colors = {
  path: '#499f4e',
  vector: '#bce9bc',
  background: '#000'
};

// Styles
const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    #drawVector { 
        width: ${canvasWidth}px; 
        height: ${canvasHeight}px;
        background-color: ${colors.background}; 
    }

    #overlay {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }
`;
document.getElementsByTagName('head')[0].appendChild(style);

// Overlay
const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

// Canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
overlay.appendChild(canvas);
canvas.id = 'drawVector';
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

const canvasRect = canvas.getBoundingClientRect();

// canvas.addEventListener('mousemove', (e) => {
//   // Mouse in canvas coords system
//   let x = e.clientX - canvasRect.left;
//   let y = e.clientY - canvasRect.top;
//   let angle = Math.atan2(y, x) / Math.PI * 180;
//   let length = Math.hypot(x, y);
//
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawVector(null, null, length, angle);
// });

function drawVector (x, y, length, angle = 0) {
  const rad = (angle / 180 * Math.PI);

  ctx.save();
  ctx.translate(x + (length / 2 * Math.cos(rad)), y + (length / 2 * Math.sin(rad)));
  ctx.rotate(rad);

  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.vector;
  ctx.beginPath();
  ctx.moveTo(-(length / 2), 0);
  ctx.lineTo(length / 2, 0);
  ctx.stroke();
  ctx.closePath();

  // Arrow
  const arrHeight = 18;
  const arrWidth = 14;

  ctx.fillStyle = colors.vector;
  ctx.beginPath();
  ctx.moveTo(length / 2, 0);
  ctx.lineTo(length / 2 - arrHeight, -(arrWidth / 2));
  ctx.lineTo(length / 2 - arrHeight, (arrWidth / 2));
  ctx.lineTo(length / 2, 0);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

function drawCircle (x, y, radius, fill = false) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fill) {
    ctx.fillStyle = colors.vector;
    ctx.fill();
  } else {
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.path;
    ctx.stroke();
  }
  ctx.closePath();
}

// const circlePos = new Vector2D(50, 50);
// const rotation = Matrix2D.createRotationMatrix(20);
//
// for (let i = 0; i < 4; i++) {
//   circlePos.applyMatrix(rotation);
//   drawCircle(circlePos, 20);
// }
// const angleFirst = 50
// drawVector(20, 20, 100, angleFirst);
// const endX = 20 + 100 * Math.cos(angleFirst / 180 * Math.PI);
// const endY = 20 + 100 * Math.sin(angleFirst / 180 * Math.PI);
// drawVector(endX, endY, 100, 30);
// drawVector(20, 20, 100, 20);

/**
 * Grids
 */
// function drawGrid (x, y) {
//   for (let i = 1; i <= 200; i += 20) {
//     drawCircle(x, y, i);
//   }
//
//   for (let i = 0; i <= 360; i += 10) {
//     drawVector(x, y, 200, i);
//   }
// }

// for (let i = 0; i < 3; i++)
//   drawGrid(Math.random() * canvasWidth, Math.random() * canvasHeight);

// for (let i = 1; i <= 200; i += 20) {
//   drawCircle(canvasRect.width / 2, canvasRect.height / 2, i);
// }
//
// for (let i = 0; i <= 360; i += 10) {
//   drawVector(canvasRect.width / 2, canvasRect.height / 2, 200, i);
// }

// for (let i = 0; i < 150; i++) {
//   drawVector(Math.random() * canvasWidth, Math.random() * canvasHeight, Math.random() * 500 , Math.random() * 360);
// }

/**
 * Circular motion
 */
let centerX = canvasWidth / 2;
let centerY = canvasHeight / 2;

let angle = -90;
let vectorAngle = 0;
let radius = 150;

const angleVelocity = 1.25; // Degrees per 16.6667ms

function startRenderLoop () {
  let angleRads = angle / 180 * Math.PI;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawCircle(centerX, centerY, radius);
  const currX = centerX + radius * Math.cos(angleRads);
  const currY = centerY + radius * Math.sin(angleRads);
  drawCircle(currX, currY, 4, true);
  drawVector(currX, currY, 100, vectorAngle);
  drawVector(currX, currY, 100, vectorAngle + 90);
  angle += angleVelocity;
  vectorAngle += angleVelocity;
  requestAnimationFrame(startRenderLoop);
}

startRenderLoop();