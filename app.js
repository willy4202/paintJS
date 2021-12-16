const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

ctx.fillStyle = 'black';
ctx.linewidth = 2.5;

let draw = false;

function stopDraw() {
    draw = false;
};

function startDraw() {
    draw = true;
};

function onMove(event) {
    //console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if (!draw) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


if (canvas) {
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
}