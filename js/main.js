'use strict';

const settingsToggle = document.querySelector('.settings__toggle');
const settingsBtnClose = document.querySelector('.settings__btn-close');
const settings = document.querySelector('.main__settings');

settingsToggle.onclick = () => settings.classList.remove('hide');
settingsBtnClose.onclick = () => settings.classList.add('hide');

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    settings.classList.add('hide');
  }
});

const btnApply = document.querySelector('.settings__btn-apply');
let lineWidth = 5;
let lineColor = '#fff';
let bodyStyle = document.querySelector('body').style;

btnApply.onclick = () => {
  lineWidth = document.querySelector('.input-line-width').value;
  lineColor = document.querySelector('input[name="line-color"]').value;
  bodyStyle.backgroundColor = document.querySelector('input[name="bg-color"]').value;
};



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseDown = false;
let mouseCoordinateList = [];

canvas.addEventListener('mousedown', () => mouseDown = true);
canvas.addEventListener('mouseup', () => {
  mouseDown = false;
  ctx.beginPath();
  mouseCoordinateList.push('mouseup');
});

canvas.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    mouseCoordinateList.push({
      clientX: event.clientX,
      clientY: event.clientY
    });

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    drawsMousePath(event);
  }
});

document.addEventListener('keydown', (event) => {
  const KEY_C = 67;
  const KEY_S = 83;
  const KEY_R = 82;

  if (event.keyCode === KEY_C) {
    cleansCanvas();
  } else if (event.keyCode === KEY_S) {
    savesDrawing();
  } else if (event.keyCode === KEY_R) {
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


function drawsMousePath(event) {
  // draws a line
  ctx.lineTo(event.clientX, event.clientY);
  ctx.stroke();

  // draws a circle
  ctx.beginPath();
  ctx.arc(event.clientX, event.clientY, lineWidth / 2, 0, Math.PI * 2);
  ctx.fill();

  // updates path
  ctx.beginPath();
  ctx.moveTo(event.clientX, event.clientY);
}