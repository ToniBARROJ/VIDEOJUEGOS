const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const textInput = document.querySelector('.input')

// Variables de teclas y colisión con canvas

let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    up: false,
    left: false,
    down: false,
    right: false,
    space: false // Para aplicar efectos al cuadrado en el futuro (gravedad, giros,...)
}
let hit = false;
let touchLimits = false;

// Variables de los objetos

const objects = [
    {
        name: "rectangle 1",
        x: 460,
        y: 200,
        width: 20,
        height: 120,
        size: 50,
        speedX: 0,
        speedY: 1.5,
        color: "red"
    },
    {
        name: "rectangle 2",
        x: 20,
        y: 225,
        width: 20,
        height: 120,
        size: 50,
        speedX: 0,
        speedY: 1.5,
        color: "green"
    },
    {
        name: "ball",
        x: 225,
        y: 225,
        width: 20,
        height: 20,
        size: 50,
        speedX: 1.5,
        speedY: 1,
        color: "white"
    }
]

// Constantes de los objetos

const firstSquare = objects[0];
const secondSquare = objects[1];
const ball = objects[2];

// Función para actualizar automáticamente la posición

function update() {
    secondSquare.x += secondSquare.speedX;
    secondSquare.y += secondSquare.speedY;
    let hit = false;

    if (secondSquare.x + secondSquare.width > canvas.width) {
        secondSquare.x = canvas.width - secondSquare.width;
        secondSquare.speedX *= -1;
        hit = true;
    } else if (objects[1].x < 0) {
        secondSquare.x = 0;
        secondSquare.speedX *= -1;
        hit = true;
    }
    if (secondSquare.y + secondSquare.height > canvas.height) {
        secondSquare.y = canvas.height - secondSquare.height;
        secondSquare.speedY *= -1
        hit = true;
    } else if (objects[1].y < 0) {
        secondSquare.y = 0;
        secondSquare.speedY *= -1
        hit = true;
    }

    if (hit) {
        secondSquare.color = (secondSquare.color === "green") ? "white" : "green";
    }
}

// Código para controlar el cuadrado

window.addEventListener('keydown', function (e) {
    if (e.key === "w") keys.w = true;
    if (e.key === "a") keys.a = true;
    if (e.key === "s") keys.s = true;
    if (e.key === "d") keys.d = true;
    if (e.key === "ArrowUp") keys.up = true;
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowDown") keys.down = true;
    if (e.key === "ArrowRight") keys.right = true;
});

window.addEventListener('keyup', function (e) {
    if (e.key === "w") keys.w = false;
    if (e.key === "a") keys.a = false;
    if (e.key === "s") keys.s = false;
    if (e.key === "d") keys.d = false;
    if (e.key === "ArrowUp") keys.up = false;
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowDown") keys.down = false;
    if (e.key === "ArrowRight") keys.right = false;
});

let prevX = firstSquare.x;
let prevY = firstSquare.y;
let prevX2 = secondSquare.x;
let prevY2 = secondSquare.y;


function move() {
    let hit = false;

    if (keys.w) firstSquare.y -= firstSquare.speedX;
    if (keys.s) firstSquare.y += firstSquare.speedX;
    if (keys.a) firstSquare.x -= firstSquare.speedX;
    if (keys.d) firstSquare.x += firstSquare.speedX;

    // Detectar colisiones y mantener dentro del canvas

    if (firstSquare.x + firstSquare.width > canvas.width) {
        firstSquare.x = canvas.width - firstSquare.width;
        hit = true;
    } else if (firstSquare.x < 0) {
        firstSquare.x = 0;
        hit = true;
    }
    if (firstSquare.y + firstSquare.height > canvas.height) {
        firstSquare.y = canvas.height - firstSquare.height;
        hit = true;
    } else if (firstSquare.y < 0) {
        firstSquare.y = 0;
        hit = true;
    }

    // let touchingPastLimit = touchLimits;

    // if (hit && !touchingPastLimit) {
    //     firstSquare.color = (firstSquare.color === "red") ? "blue" : "red";
    // }

    // touchLimits = hit;
    prevX = firstSquare.x;
    prevY = firstSquare.y;
}

function move2() {
    let hit = false;

    if (keys.up) secondSquare.y -= secondSquare.speedY;
    if (keys.down) secondSquare.y += secondSquare.speedY;
    if (keys.left) secondSquare.x -= secondSquare.speedX;
    if (keys.right) secondSquare.x += secondSquare.speedX;

    // Detectar colisiones y mantener dentro del canvas

    if (secondSquare.x + secondSquare.width > canvas.width) {
        secondSquare.x = canvas.width - secondSquare.width;
        hit = true;
    } else if (secondSquare.x < 0) {
        secondSquare.x = 0;
        hit = true;
    }
    if (secondSquare.y + secondSquare.height > canvas.height) {
        secondSquare.y = canvas.height - secondSquare.height;
        hit = true;
    } else if (secondSquare.y < 0) {
        secondSquare.y = 0;
        hit = true;
    }

    // let touchingPastLimit = touchLimits;

    // if (hit && !touchingPastLimit) {
    //     secondSquare.color = (secondSquare.color === "red") ? "blue" : "red";
    // }

    // touchLimits = hit;
    prevX2 = secondSquare.x;
    prevY2 = secondSquare.y;
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

    if (firstSquare.x + firstSquare.width > canvas.width) {
        firstSquare.x = canvas.width - firstSquare.width;
        hit = true;
    } else if (firstSquare.x < 0) {
        firstSquare.x = 0;
        hit = true;
    }
    if (firstSquare.y + firstSquare.height > canvas.height) {
        firstSquare.y = canvas.height - firstSquare.height;
        hit = true;
    } else if (firstSquare.y < 0) {
        firstSquare.y = 0;
        hit = true;
    }

    const colision = isColiding(firstSquare.x, firstSquare.y, firstSquare.width, firstSquare.height, secondSquare.x, secondSquare.y, secondSquare.width, secondSquare.height);

    if (colision) {
        console.log(`He tocado el cuadrado ${objects[1].color}`)
        textInput.value = "Hola";
        textInput.style.setProperty("background-color", "red")
        const overlapX = Math.min(firstSquare.x + firstSquare.width, secondSquare.x + secondSquare.width) - Math.max(firstSquare.x, secondSquare.x);
        const overlapY = Math.min(firstSquare.y + firstSquare.height, secondSquare.y + secondSquare.height) - Math.max(firstSquare.y, secondSquare.y);

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
    ctx.fillRect(objects[0].x, objects[0].y, objects[0].width, objects[0].height);
}
function draw2() {
    ctx.fillStyle = secondSquare.color;
    ctx.fillRect(secondSquare.x, secondSquare.y, secondSquare.width, secondSquare.height)
}

// Game Loop

function gameLoop() {
    //update();
    move();
    move2();
    objectColision();
    draw();
    draw2();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego

gameLoop()