const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let options = ["Pizza","Movie","Study","Game"];
let startAngle = 0;
let arc;
let spinning = false;

function drawWheel(){
    arc = Math.PI * 2 / options.length;

    for(let i=0;i<options.length;i++){
        let angle = startAngle + i * arc;

        ctx.beginPath();
        ctx.fillStyle = `hsl(${i*60},70%,60%)`;
        ctx.moveTo(200,200);
        ctx.arc(200,200,200,angle,angle+arc);
        ctx.fill();

        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(angle + arc/2);
        ctx.fillStyle="black";
        ctx.fillText(options[i],80,0);
        ctx.restore();
    }
}

function spin(){
    if(spinning) return;

    spinning = true;

    let spinAngle = Math.random()*10+20;

    let spinTime = 0;
    let spinDuration = 3000;

    function rotate(){
        spinTime += 30;

        if(spinTime >= spinDuration){
            stopWheel();
            return;
        }

        startAngle += spinAngle * Math.PI/180;

        ctx.clearRect(0,0,400,400);
        drawWheel();

        requestAnimationFrame(rotate);
    }

    rotate();
}

function stopWheel(){
    spinning = false;

    let degrees = startAngle * 180 / Math.PI + 90;
    let arcDeg = arc * 180 / Math.PI;

    let index = Math.floor((360 - degrees % 360) / arcDeg);

    document.getElementById("result").innerText =
        "Result: " + options[index];
}

function addOption(){
    let input = document.getElementById("optionInput");

    if(input.value.trim() !== ""){
        options.push(input.value);
        input.value="";
        updateList();
        ctx.clearRect(0,0,400,400);
        drawWheel();
    }
}

function updateList(){
    let list = document.getElementById("optionList");
    list.innerHTML="";

    options.forEach(opt=>{
        let li=document.createElement("li");
        li.innerText=opt;
        list.appendChild(li);
    });
}

document.getElementById("spinBtn").onclick = spin;

updateList();
drawWheel();
