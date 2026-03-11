const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const options = [
"Pizza",
"Movie",
"Study",
"Game",
"Sleep",
"Code"
];

let rotation = 0;
let velocity = 0;
let spinning = false;

function drawWheel(){

const arc = (Math.PI * 2) / options.length;

options.forEach((opt,i)=>{

let angle = i * arc;

ctx.beginPath();
ctx.moveTo(160,160);
ctx.arc(160,160,160,angle,angle+arc);

ctx.fillStyle = `hsl(${i*60},70%,60%)`;
ctx.fill();

ctx.save();

ctx.translate(160,160);
ctx.rotate(angle + arc/2);

ctx.fillStyle="black";
ctx.textAlign="right";
ctx.font="14px Arial";

ctx.fillText(opt,140,5);

ctx.restore();

});
}

function spin(){

if(spinning) return;

velocity = Math.random()*40 + 35;
spinning = true;

requestAnimationFrame(animate);
}

function animate(){

velocity *= 0.97;
rotation += velocity;

canvas.style.transform = `rotate(${rotation}deg)`;

if(velocity > 0.3){

requestAnimationFrame(animate);

}else{

spinning = false;

}

}

document.getElementById("spinBtn").onclick = spin;

drawWheel();
