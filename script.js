const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let options = ["Pizza","Movie","Study","Game"];

let startAngle = 0;
let arc;
let spinVelocity = 0;
let spinning = false;

function drawWheel(){

ctx.clearRect(0,0,400,400);

arc = Math.PI * 2 / options.length;

for(let i=0;i<options.length;i++){

let angle = startAngle + i*arc;

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

function spin(){

if(spinning) return;

spinVelocity = Math.random()*0.3 + 0.35;
spinning = true;

requestAnimationFrame(rotate);
}

function rotate(){

startAngle += spinVelocity;

spinVelocity *= 0.985;   // friction (slow down)

drawWheel();

if(spinVelocity < 0.002){

spinning=false;
showResult();
return;
}

requestAnimationFrame(rotate);
}

function showResult(){

let degrees = startAngle * 180 / Math.PI + 90;
let arcDeg = arc * 180 / Math.PI;

let index = Math.floor((360 - degrees % 360) / arcDeg);

document.getElementById("result").innerText =
"Result: " + options[index];
}

function addOption(){

let input = document.getElementById("optionInput");

if(input.value.trim()=="") return;

options.push(input.value);

input.value="";

updateList();
drawWheel();
}

function updateList(){

let list=document.getElementById("optionList");
list.innerHTML="";

options.forEach(o=>{
let li=document.createElement("li");
li.innerText=o;
list.appendChild(li);
});
}

document.getElementById("spinBtn").onclick = spin;

updateList();
drawWheel();
