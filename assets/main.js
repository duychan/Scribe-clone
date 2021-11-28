const canvas = document.querySelector("#workspace");
const socket = io('http://localhost:1234');

const test = document.querySelector('.test');


let socketId = null;

socket.on('setInstanceId', res => {
    socketId = res.id;
});

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
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    socket.emit('startDraw', {
        isDrawing: true,
        x,
        y
    });
    e.preventDefault();
}

function draw(e) {
    if (isDrawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        ctx.lineWidth = drawWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.strokeStyle = drawColor;
        socket.emit('Drawing', {
            isDrawing: true,
            x,
            y,
            drawColor,
            drawWidth
        });
    }
    e.preventDefault();
}

function end(e) {
    if (isDrawing) {
        ctx.closePath();
        indexDraw += 1;
        arrImg.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        isDrawing = false;
        socket.emit('stopDraw', {
            isDrawing,
            indexDraw,
        })
    }
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
        const image = arrImg[indexDraw];
        ctx.putImageData(image, 0, 0);
        console.log(`1${image}`);
        socket.emit('undo', {
            indexDraw,
            image,
        })
    } else {
        clear();
    }
}


socket.on('sendDrawStart', (res) => {
    ctx.beginPath();
    ctx.moveTo(res.x, res.y);
});

socket.on('sendDrawing', (res) => {
    if (res.isDrawing && res.id !== socketId) {
        ctx.lineTo(res.x, res.y);
        ctx.lineWidth = res.drawWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.strokeStyle = res.drawColor;
    }
});
socket.on('stopFromServer', (res) => {
    if (res.isDrawing) {
        ctx.closePath();
        res.isDrawing = false;
    }
});

const text = document.querySelector('.text-answer');
const btnSend = document.querySelector('.button-send');
const chatWraper = document.querySelector('.chat-wraper');


btnSend.addEventListener('click', (e) => {
    socket.emit('message', {
        message: text.value
    });
    text.value = '';
    e.preventDefault();
});
text.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        socket.emit('message', {
            message: text.value
        });
        text.value = '';
    }
    e.preventDefault();
})
socket.on('messFromServer', (res) => {
    const Item = document.createElement('p');
    const nameItem = document.createElement('span');
    nameItem.style.fontWeight = 500;
    const messItem = document.createElement('span');
    nameItem.textContent = `${res.id}: `;
    messItem.textContent = res.message;
    Item.appendChild(spanItem);
    Item.appendChild(messItem);
    chatWraper.appendChild(Item);
});
const xemid = document.querySelector('.xemid');
socket.on('messFromServer', res => {
    xemid.innerText = socketId;
})