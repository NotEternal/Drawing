'use strict';

const sidebarToogle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.main__sidebar');

sidebarToogle.onclick = () => {
  if (sidebarToogle.classList.contains('active')) {
    sidebarToogle.classList.remove('active');
    sidebar.classList.add('hide');
  } else {
    sidebarToogle.classList.add('active');
    sidebar.classList.remove('hide');
  }
};



const buttonApply = document.querySelector('.button-apply');
let lineWidth = 5;
let lineColor = '#fff';
let bodyStyle = document.querySelector('body').style;

buttonApply.onclick = () => {
  lineWidth = document.querySelector('.input-line-width').value;
  lineColor = document.querySelector('input[name="line-color"]:checked').value;
  bodyStyle.backgroundColor = document.querySelector('input[name="background-color"]:checked').value;
};



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let mouseDown;
let mouseCoordinateList = [];

canvas.addEventListener('mousedown', () => mouseDown = true);
canvas.addEventListener('mouseup', () => {
  mouseDown = false;
  ctx.beginPath();
  mouseCoordinateList.push('mouseup');
});

canvas.addEventListener('mousemove', (evt) => {
  if (mouseDown) {
    mouseCoordinateList.push({
      clientX : evt.clientX,
      clientY : evt.clientY
    });

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    drawsMousePath(evt);
  }
});


document.addEventListener('keydown', (evt) => {
  const KEY_C = 67;
  const KEY_S = 83;
  const KEY_R = 82;

  if (evt.keyCode === KEY_C) {
    cleansCanvas();
  } else if (evt.keyCode === KEY_S) {
    savesDrawing();
  } else if (evt.keyCode === KEY_R) {
    repeatsDrawing();
  }
});

function cleansCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function savesDrawing() {
  window.localStorage.setItem('coordinate mouse', JSON.stringify(mouseCoordinateList));
}

function repeatsDrawing() {
  mouseCoordinateList = JSON.parse(localStorage.getItem('coordinate mouse'));
  cleansCanvas();

  const timer = setInterval(() => {
    if (mouseCoordinateList.length === 0) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }

    const firsCoordinateObject = mouseCoordinateList.shift();
    drawsMousePath(firsCoordinateObject);
  }, 30);
}


function drawsMousePath(evt) {
  // draws a line
  ctx.lineTo(evt.clientX, evt.clientY);
  ctx.stroke();

  // draws a circle
  ctx.beginPath();
  ctx.arc(evt.clientX, evt.clientY, lineWidth / 2, 0, Math.PI * 2);
  ctx.fill();

  // updates path
  ctx.beginPath();
  ctx.moveTo(evt.clientX, evt.clientY);
}