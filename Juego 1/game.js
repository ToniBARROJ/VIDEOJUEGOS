const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del cuadrado

let x = 100;
let y = 100;
let speedX = 2;
let speedY = 1.5;
const size = 50;
let color = "red"

// Función para actualizar la posición

function update() {
    x += speedX;
    y += speedY;
    let hit = false;

    if (x + size > canvas.width) {
        x = canvas.width - size;
        speedX *= -1;
        hit = true;
    } else if (x < 0) {
        x = 0;
        speedX *= -1;
        hit = true;
    }
    if (y + size > canvas.height) {
        y = canvas.height - size;
        speedY *= -1
        hit = true;
    } else if (y < 0) {
        y = 0;
        speedY *= -1
        hit = true;
    }

    if (hit) {
        color = (color === "red") ? "blue" : "red";
    }
}

// Función para dibujar

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
}

// Game Loop

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego

gameLoop()