const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

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

function startTouch(event) {
    draw = true;
}

function endTouch(event) {
    draw = false;
}

function touchMove(event) {
    const tx = event.touches[0].clientX;
    const ty = event.touches[0].clientY;
    event.preventDefault()
    if (!draw) {
        ctx.beginPath(tx, ty);
    } else {
        ctx.lineTo(tx, ty);
        ctx.stroke();
    }
    // if(!draw){
    //     ctx.beginPath();
    //     ctx.moveTo(tx, ty);
    // }else{
    //     ctx.lineTo(tx, ty);
    //     ctx.stroke();
    // }
}


if (canvas) {
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchmove", touchMove);
    canvas.addEventListener("touchstart", startTouch);
    canvas.addEventListener("touchend", endTouch);
}