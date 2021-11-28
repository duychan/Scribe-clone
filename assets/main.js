const canvas = document.querySelector("#workspace");

canvas.width = 600;
canvas.height = 400;

let backgroundColor = "white";
let isDrawing = false;
let drawWidth = 10;
let drawColor = "black";
let arrImg = [];
let indexDraw = -1;

const ctx = canvas.getContext("2d");
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", end, false);
canvas.addEventListener("mouseover", end, false);

function start(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    e.preventDefault();
}

function draw(e) {
    if (isDrawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.lineWidth = drawWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.strokeStyle = drawColor;
    }
    e.preventDefault();
}

function end(e) {
    if (isDrawing) {
        ctx.closePath();
        isDrawing = false;
    }
    indexDraw += 1;
    arrImg.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    e.preventDefault();
}

// clear canvas
const buttonClearElement = document.querySelector(".button-clear");

buttonClearElement.addEventListener("click", clear);

function clear() {
    ctx.fillStyle = backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawColor = "black";
}

// get color for 
const changeColor = document.querySelectorAll(".color");

changeColor.forEach(element => {
    element.addEventListener("click", switchColor);
})

function switchColor(event) {
    drawColor = event.target.style.backgroundColor;
}

// change size pen to draw
const size = document.querySelector(".size-pen");

size.addEventListener("change", changeSize);

function changeSize(event) {
    drawWidth = event.target.value;
}

// undo draw handle
const buttonUndoElement = document.querySelector(".button-undo");

buttonUndoElement.addEventListener("click", undo);

function undo() {
    if (indexDraw > 0) {
        arrImg.pop();
        indexDraw -= 1;
        ctx.putImageData(arrImg[indexDraw], 0, 0);
    }
}