// MENU
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// DARK MODE
function toggleMode() {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateThemeToggleText(isLight);
}

function updateThemeToggleText(isLight) {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.textContent = isLight ? "Dark Mode" : "Light Mode";
}

(function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";
    if (isLight) {
        document.body.classList.add("light");
    }
    updateThemeToggleText(isLight);
})();

// TYPING
const text = ["PHOTOGRAPHY", "VIDEOGRAPHY", "VIDEO-EDITOR", "PHOTO-EDITOR", "PROGRAMMER"];
let i = 0;
let j = 0;

function type() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML = text[i].slice(0, j++);
        if (j > text[i].length) {
            i++;
            j = 0;
        }
        setTimeout(type, 200);
    }
}

type();

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
for (let k = 0; k < 80; k++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ffcc";

    particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += 0.5;
        if (p.y > canvas.height) {
            p.y = 0;
        }
    });

    requestAnimationFrame(draw);
}

draw();

// CERTIFICATE MODAL
function openCert(img) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = img.src;
}

function closeCert() {
    document.getElementById("certModal").style.display = "none";
}

const closeBtn = document.querySelector(".close-modal");
if (closeBtn) {
    closeBtn.onclick = closeCert;
}

window.onclick = function (event) {
    const modal = document.getElementById("certModal");
    if (event.target === modal) {
        closeCert();
    }
};
