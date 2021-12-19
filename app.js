const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange")
const fill = document.querySelector("#jsMode")
const save = document.querySelector("#jsSave")
const erase = document.querySelector("#jsErase")

const OGCOLOR = "black"

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width, canvas.height)
ctx.strokeStyle = OGCOLOR;
ctx.fillStyle = OGCOLOR;
ctx.lineWidth = 2.5;

let draw = false;
let filling = false;

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
    const sx = event.touches[0].pageX
    const sy = event.touches[0].pageY
    console.log(sx, sy);
    ctx.beginPath();
}

function endTouch(event) {
    ctx.closePath();
    draw = false;
}

function touchMove(event) {
    const tx = event.changedTouches[0].pageX;
    const ty = event.changedTouches[0].pageY;
    event.preventDefault()
    if (!draw) {
        ctx.moveTo(tx, ty);
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
    canvas.addEventListener("click", fillClick);
}

function changeC(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(colors).forEach(color => color.addEventListener("click", changeC));
// 배열을 만들어주고, 그 안에서 각각의 함수를 시행한다. 이벤트리스너로 들릴때마다

function handleRange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

if (range) {
    range.addEventListener("input", handleRange);
}

function hamdlemode(event) {
    if (filling === true) {
        filling = false;
        fill.innerText = "Paint";
    } else {
        filling = true;
        fill.innerText = "FILL"
    }
}

fill.addEventListener("click", hamdlemode);

function fillClick(event) {
    if (filling) {
        ctx.fillRect(0,0,canvas.width, canvas.height)
    }
}

save.addEventListener("click", savePic);

function savePic(event) {
    const image = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "save.png"
    link.click();    
}

function clearclick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
};

erase.addEventListener("click", clearclick);