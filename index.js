/*This was coded in my Youtube Video.
Please go visit it at "Ethan Attempts to Code" -- Youtube
If you're interested :)*/

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

class Ball {
    constructor(w, h, color) {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.width = w;
        this.height = h;
        this.color = color;
        this.velocity = {x: 2, y: 2};
    }
}

class AI {
    constructor() {
        this.x = 25;
        this.y = ball.y;
        this.width = 25;
        this.height = 150;
    }
}

class Player {
    constructor() {
        this.x = 1150;
        this.y = 0;
        this.width = 25;
        this.height = 150;
        this.velocity = 0;
    }
}

function drawRect(x, y, w, h, color) {  
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

function drawGame() {
    drawRect(0,0,canvas.width, canvas.height, 'black'); //CLEAR CANVAS

    if(ball.y >= 770) {
        ball.velocity.y *= -1;
    } else if(ball.y <= 0) {
        ball.velocity.y *= -1;
    }
    if(ball.x <= 50) { //MAKES CONTACT WITH AI PADDLE
        var base = score/4 + 2;
        var random = Math.floor(Math.random()*3);
        ball.velocity.x = base + random;
    } else if(ball.x >= 1120) {
        if(ball.y >= player.y && ball.y <= player.y+player.height) { //TOP OF BALL
            score++;
            updateScore();
            ball.velocity.x *= -1; 
        } else if(ball.y+ball.height >= player.y && ball.y+ball.height <= player.y+player.height) { //BOTTOM OF BALL
            score++;
            updateScore();
            ball.velocity.x *= -1;
        } else {
            location.reload();
            alert('you lose!');
        }
    }
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
    drawRect(ball.x, ball.y, ball.width, ball.height, ball.color); //DRAW BALL

    ai.y = ball.y;
    drawRect(ai.x, ai.y, ai.width, ai.height, 'white'); //DRAW AI PADDLE

    if(player.y + player.velocity >= 650 || player.y + player.velocity <= 0) {
        //DO NOTHING
    } else {
        player.y += player.velocity;
    }
    


    drawRect(player.x, player.y, player.width, player.height, 'white'); //DRAW PLAYER PADDLE
}

function updateScore() {
    document.getElementById('score').innerHTML = 'Score: ' + score;
}

document.addEventListener('keydown', (event) => {
    if(event.key == 'w') {
        player.velocity = -5;
    } else if(event.key == 's') {
        player.velocity = 5;
    }
});

document.addEventListener('keyup', (event) => {
    if(event.key == 'w' || event.key == 's') {
        player.velocity = 0;
    }
});

drawRect(0,0,canvas.width, canvas.height, 'black');
var ball = new Ball(30, 30, 'white');
var ai = new AI();
var player = new Player();
var score = 0;
setInterval(drawGame, 10);