let pageWrap = document.querySelector('.pageWrap');
pageWrap.addEventListener('mousemove',(e) => {
    let eye1 = document.getElementById('eye1');
    let eye2 = document.getElementById('eye2');
    let cursorXLeft = (eye1.getBoundingClientRect().left);
    let cursorYLeft = (eye1.getBoundingClientRect().top);
    let cursorXRight = (eye2.getBoundingClientRect().left);
    let cursorYRight = (eye2.getBoundingClientRect().top);
    let cursorSpinLeft = Math.atan2(e.pageX - cursorXLeft, e.pageY - cursorYLeft);
    let cursorSpinRight = Math.atan2(e.pageX - cursorXRight, e.pageY - cursorYRight);
    let eyeSpinLeft = (cursorSpinLeft * (180/ Math.PI) * -1) + 180;
    let eyeSpinRight = (cursorSpinRight * (180/ Math.PI) * -1) + 180;
    eye1.style.transform = `rotate(${eyeSpinLeft}deg)`
    eye2.style.transform = `rotate(${eyeSpinRight}deg)`
});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 50;
var x = canvas.width/2;
var y = canvas.height-ballRadius;
var dx = 0.5;
var dy = 1;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;
}

$('.box').click(function(){
    console.log($(this).index());
    console.log($('.boxContainer').children().first());
    if($(this).index() == 0)
    {
        $(this).css({
            width : '100%',
            height : '100%',
            margin : '0',
            top : '0',
            left : '0',
            transform: 'perspective(1200px) rotateX(0deg) rotateY(00deg) rotateZ(0deg)',
        });
    }
    else 
    {
        $(this).prependTo($(this).parent());
    }
    console.log($('.boxContainer').children().first());
});

setInterval(draw, 50);

