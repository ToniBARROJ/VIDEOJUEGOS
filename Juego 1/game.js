const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const textInput = document.querySelector('.input')
const startGame = document.querySelector('.start-game')

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
        x: 780,
        y: 188.5,
        width: 20,
        height: 120,
        size: 50,
        speedX: 0,
        speedY: 1.5,
        color: "red"
    },
    {
        name: "rectangle 2",
        x: 0,
        y: 18.5,
        width: 20,
        height: 120,
        size: 50,
        speedX: 0,
        speedY: 1.5,
        color: "green"
    },
    {
        name: "ball",
        x: 400,
        y: 237.5,
        width: 20,
        height: 20,
        size: 50,
        speedX: 0,
        speedY: 0,
        color: "white"
    }
]

// Constantes de los objetos

const firstSquare = objects[0];
const secondSquare = objects[1];
const ball = objects[2];

// Función para actualizar automáticamente la posición

function update() {
    
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    let hit = false;

    if (ball.x + ball.width > canvas.width) {
        ball.x = canvas.width - ball.width;
        ball.speedX *= -1;
        hit = true;
    } else if (objects[2].x < 0) {
        ball.x = 0;
        ball.speedX *= -1;
        hit = true;
    }
    if (ball.y + ball.height > canvas.height) {
        ball.y = canvas.height - ball.height;
        ball.speedY *= -1
        hit = true;
    } else if (objects[2].y < 0) {
        ball.y = 0;
        ball.speedY *= -1
        hit = true;
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

    if (keys.w) firstSquare.y -= firstSquare.speedY;
    if (keys.s) firstSquare.y += firstSquare.speedY;
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
    
    let nextX = ball.x + ball.speedX;
    let nextY = ball.y + ball.speedY;
    const colision1 = isColiding(nextX, nextY, ball.width, ball.height, firstSquare.x, firstSquare.y, firstSquare.width, firstSquare.height);
    const colision2 = isColiding(nextX, nextY, ball.width, ball.height, secondSquare.x, secondSquare.y, secondSquare.width, secondSquare.height);

    if (colision1) {
        ball.speedX *= -1;
        nextX = ball.speedX > 0 ? firstSquare.x - ball.width : firstSquare.x + firstSquare.width;
    }

    if (colision2) {
        ball.speedX *= -1;
        nextX = ball.speedX > 0 ? secondSquare.x - ball.width : secondSquare.x + secondSquare.width;
    }

    if (nextY <= 0 || nextY + ball.height >= canvas.height) {
        ball.speedY *= -1;
    }

    ball.x += ball.speedX;
    ball.y += ball.speedY;

}

// Función para dibujar

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = objects[0].color;
    ctx.fillRect(objects[0].x, objects[0].y, objects[0].width, objects[0].height);
    ctx.fillStyle = secondSquare.color;
    ctx.fillRect(secondSquare.x, secondSquare.y, secondSquare.width, secondSquare.height)
    ctx.fillStyle = ball.color;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height)
}


// Game Loop

function gameLoop() {
    update();
    move();
    move2();
    objectColision();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego

gameLoop()