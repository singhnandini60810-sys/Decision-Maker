const canvas=document.getElementById("wheel");
const ctx=canvas.getContext("2d");

let options=[];
let rotation=0;
let velocity=0;
let spinning=false;

function drawWheel(){

ctx.clearRect(0,0,320,320);

if(options.length===0) return;

const arc=(Math.PI*2)/options.length;

options.forEach((opt,i)=>{

let angle=i*arc;

ctx.beginPath();
ctx.moveTo(160,160);
ctx.arc(160,160,160,angle,angle+arc);

ctx.fillStyle=`hsl(${i*60},70%,60%)`;
ctx.fill();

ctx.save();

ctx.translate(160,160);
ctx.rotate(angle+arc/2);

ctx.fillStyle="black";
ctx.textAlign="right";
ctx.font="14px Arial";

ctx.fillText(opt,140,5);

ctx.restore();

});

}

function spin(){

if(spinning || options.length===0) return;

velocity=Math.random()*40+35;

spinning=true;

requestAnimationFrame(animate);

}

function animate(){

velocity*=0.97;

rotation+=velocity;

canvas.style.transform=`rotate(${rotation}deg)`;

if(velocity>0.3){

requestAnimationFrame(animate);

}else{

spinning=false;
showResult();

}

}

function showResult(){

const arc=360/options.length;

let deg=(rotation%360);

let index=Math.floor((360-deg)/arc)%options.length;

document.getElementById("result").innerText=
"🎉 Selected: "+options[index];

}

document.getElementById("spinBtn").onclick=()=>{

const text=document.getElementById("optionsInput").value;

options=text.split(",").map(x=>x.trim()).filter(x=>x);

drawWheel();

spin();

};

document.getElementById("clearBtn").onclick=()=>{

document.getElementById("optionsInput").value="";
options=[];
drawWheel();

document.getElementById("result").innerText="Selected: -";

};

drawWheel();
