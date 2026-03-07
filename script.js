// MENU
function toggleMenu(){
document.getElementById("navLinks").classList.toggle("active");
}

// DARK MODE
function toggleMode(){
document.body.classList.toggle("light");
}

// TYPING
const text=["PHOTOGRAPHY","VIDEOGRAPHY","VIDEO-EDITOR","PHOTO-EDITOR","PROGRAMMER"];
let i=0,j=0;

function type(){
if(i<text.length){
document.getElementById("typing").innerHTML=text[i].slice(0,j++);
if(j>text[i].length){
i++;
j=0;
}
setTimeout(type,200);
}
}

type();

// PARTICLES
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:2
});
}

function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ffcc";

particles.forEach(p=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();

p.y+=0.5;

if(p.y>canvas.height){
p.y=0;
}
});

requestAnimationFrame(draw);
}

draw();


// CERTIFICATE MODAL
function openCert(img){
const modal=document.getElementById("certModal");
const modalImg=document.getElementById("modalImg");

modal.style.display="block";
modalImg.src=img.src;
}

document.querySelector(".close-modal").onclick=function(){
document.getElementById("certModal").style.display="none";
}

window.onclick=function(event){
const modal=document.getElementById("certModal");
if(event.target==modal){
modal.style.display="none";
}
}


// OPEN CERTIFICATE MODAL
function openCert(img) {
    var modal = document.getElementById("certModal");
    var modalImg = document.getElementById("modalImg");

    modal.style.display = "block";
    modalImg.src = img.src;
}

// CLOSE MODAL
document.querySelector(".close-modal").onclick = function () {
    document.getElementById("certModal").style.display = "none";
};