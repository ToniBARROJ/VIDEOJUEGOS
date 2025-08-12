const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const textInput = document.querySelector('.input')

// Variables de teclas y colisión con canvas

let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false // Para aplicar efectos al cuadrado en el futuro (gravedad, giros,...)
}
let hit = false;
let touchLimits = false;

// Variables de los objetos

const objects = [
    {
        name: "rectangle 1",
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        size: 50,
        speedX: 1,
        speedY: 1,
        color: "red"
    },
    {
        name: "rectangle 2",
        x: 200,
        y: 150,
        width: 100,
        height: 100,
        size: 50,
        speedX: 0,
        speedY: 0,
        color: "green"
    }
]

// Constantes de los objetos

const firstSquare = objects[0];
const secondSquare = objects[1];

// Función para actualizar automáticamente la posición

function update() {
    firstSquare.x += firstSquare.speedX;
    firstSquare.y += firstSquare.speedY;
    let hit = false;

    if (firstSquare.x + firstSquare.size > canvas.width) {
        firstSquare.x = canvas.width - firstSquare.size;
        firstSquare.speedX *= -1;
        hit = true;
    } else if (objects[0].x < 0) {
        firstSquare.x = 0;
        firstSquare.speedX *= -1;
        hit = true;
    }
    if (firstSquare.y + firstSquare.size > canvas.height) {
        firstSquare.y = canvas.height - firstSquare.size;
        firstSquare.speedY *= -1
        hit = true;
    } else if (objects[0].y < 0) {
        firstSquare.y = 0;
        firstSquare.speedY *= -1
        hit = true;
    }

    if (hit) {
        firstSquare.color = (firstSquare.color === "red") ? "blue" : "red";
    }
}

// Código para controlar el cuadrado

window.addEventListener('keydown', function (e) {
    if (e.key === "w") keys.w = true;
    if (e.key === "a") keys.a = true;
    if (e.key === "s") keys.s = true;
    if (e.key === "d") keys.d = true;
});

window.addEventListener('keyup', function (e) {
    if (e.key === "a") keys.a = false;
    if (e.key === "s") keys.s = false;
    if (e.key === "w") keys.w = false;
    if (e.key === "d") keys.d = false;
});

let prevX = firstSquare.x;
let prevY = firstSquare.y;

function move() {
    let hit = false;

    if (keys.w) firstSquare.y -= firstSquare.speedX;
    if (keys.s) firstSquare.y += firstSquare.speedX;
    if (keys.a) firstSquare.x -= firstSquare.speedX;
    if (keys.d) firstSquare.x += firstSquare.speedX;

    // Detectar colisiones y mantener dentro del canvas

    if (firstSquare.x + firstSquare.size > canvas.width) {
        firstSquare.x = canvas.width - firstSquare.size;
        hit = true;
    } else if (firstSquare.x < 0) {
        firstSquare.x = 0;
        hit = true;
    }
    if (firstSquare.y + firstSquare.size > canvas.height) {
        firstSquare.y = canvas.height - firstSquare.size;
        hit = true;
    } else if (firstSquare.y < 0) {
        firstSquare.y = 0;
        hit = true;
    }

    let touchingPastLimit = touchLimits;

    if (hit && !touchingPastLimit) {
        firstSquare.color = (firstSquare.color === "red") ? "blue" : "red";
    }

    touchLimits = hit;
    prevX = firstSquare.x;
    prevY = firstSquare.y;
}

// Función para detectar colisión con objeto

function isColiding(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return (
        r1x < r2x + r2w &&
        r1x + r1w > r2x &&
        r1y < r2y + r2h &&
        r1y + r1h > r2y
    );
}

function objectColision() {
    let hit = false;
    textInput.value = "";
    textInput.style.setProperty("background-color", "")

    if (keys.w) firstSquare.y -= firstSquare.speedY;
    if (keys.s) firstSquare.y += firstSquare.speedY;
    if (keys.a) firstSquare.x -= firstSquare.speedX;
    if (keys.d) firstSquare.x += firstSquare.speedX;

    if (firstSquare.x + firstSquare.size > canvas.width) {
        firstSquare.x = canvas.width - firstSquare.size;
        hit = true;
    } else if (firstSquare.x < 0) {
        firstSquare.x = 0;
        hit = true;
    }
    if (firstSquare.y + firstSquare.size > canvas.height) {
        firstSquare.y = canvas.height - firstSquare.size;
        hit = true;
    } else if (firstSquare.y < 0) {
        firstSquare.y = 0;
        hit = true;
    }

    const colision = isColiding(firstSquare.x, firstSquare.y, firstSquare.size, firstSquare.size, secondSquare.x, secondSquare.y, secondSquare.size, secondSquare.size);

    if (colision) {
        console.log("He tocado el cuadrado verde")
        textInput.value = "Hola";
        textInput.style.setProperty("background-color", "red")
        const overlapX = Math.min(firstSquare.x + firstSquare.size, secondSquare.x + secondSquare.size) - Math.max(firstSquare.x, secondSquare.x);
        const overlapY = Math.min(firstSquare.y + firstSquare.size, secondSquare.y + secondSquare.size) - Math.max(firstSquare.y, secondSquare.y);

        if (overlapX < overlapY) {
            if (firstSquare.x < secondSquare.x) {
                firstSquare.x -= overlapX;
            } else {
                firstSquare.x += overlapX;
            }
        } else {
            if (firstSquare.y < secondSquare.y) {
                firstSquare.y -= overlapY;
            } else {
                firstSquare.y += overlapY;
            }
        }
    }

    prevX = firstSquare.x;
    prevY = firstSquare.y;
}

// Función para dibujar

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = objects[0].color;
    ctx.fillRect(objects[0].x, objects[0].y, objects[0].size, objects[0].size);
}
function draw2() {
    ctx.fillStyle = secondSquare.color;
    ctx.fillRect(secondSquare.x, secondSquare.y, secondSquare.size, secondSquare.size)
}

// Game Loop

function gameLoop() {
    //update();
    move();
    objectColision();
    draw();
    draw2();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego

gameLoop()