const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let options = ["Pizza","Movie","Study","Game","Sleep","Code"];

let currentRotation = 0;
let velocity = 0;
let spinning = false;

function drawWheel(){

const size = options.length;
const arc = (Math.PI * 2) / size;

for(let i=0;i<size;i++){

let angle = i * arc;

ctx.beginPath();
ctx.moveTo(200,200);
ctx.arc(200,200,200,angle,angle+arc);
ctx.fillStyle = `hsl(${i*60},70%,60%)`;
ctx.fill();

ctx.save();

ctx.translate(200,200);
ctx.rotate(angle + arc/2);

ctx.fillStyle="black";
ctx.font="16px Arial";
ctx.textAlign="right";

ctx.fillText(options[i],170,10);

ctx.restore();
}
}

drawWheel();

function spin(){

if(spinning) return;

velocity = Math.random()*40 + 40;
spinning = true;

requestAnimationFrame(animate);
}

function animate(){

velocity *= 0.97;

currentRotation += velocity;

canvas.style.transform =
`rotate(${currentRotation}deg)`;

if(velocity > 0.3){

requestAnimationFrame(animate);

}else{

spinning=false;

}
}

document.getElementById("spinBtn")
.addEventListener("click",spin);
