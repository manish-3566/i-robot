score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function(e) {
    console.log("Key code is ", e.keyCode)
    if (e.keyCode == 32) {
        document.querySelector('.robo');
        robo.classList.add('animaterobo');
        setTimeout(() => {
            robo.classList.remove('animaterobo')
        }, 700);
    }
    if (e.keyCode == 39) {
        document.querySelector('.robo');
        roboX = parseInt(window.getComputedStyle(robo, null).getPropertyValue('left'));
        robo.style.left = roboX + 112 + "px";
    }
    if (e.keyCode == 37) {
        document.querySelector('.robo');
        roboX = parseInt(window.getComputedStyle(robo, null).getPropertyValue('left'));
        robo.style.left = (roboX - 112) + "px";
    }
}


setInterval(() => {
    robo = document.querySelector('.robo');
    gameover = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');


    dx = parseInt(window.getComputedStyle(robo, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(robo, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "Game Over - Reload to play again";
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ' , newDur)
        }, 500);
    }

}, 10);

function updateScore(score) {
    scorecont.innerHTML = "Your Score: " + score;
}