var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var context = canvas.getContext('2d'),
    opacity = 0.6,
    amount = 500,
    radiusMax = 8,
    radiusMin = 3,
    speedMin = -2,
    speedMax = 2,
    fps = 60,
    speedX = 1,
    speedY = 2,

    colors = [
        'rgba(34, 49, 63,' + opacity + ')', // an array of rgb colors for the circles
        'rgba(255, 255, 255,' + opacity + ')',
        'rgba(0, 255, 157,' + opacity + ')',
        'rgba(56, 96, 91,' + opacity + ')',
        'rgba(96, 56, 87,' + opacity + ')',
        'rgba(230, 56, 87,' + opacity + ')',
        'rgba(157, 0, 255,' + opacity + ')'
    ],
    particles = [];

(function() {
    createParticles();
    window.onresize = function() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
})();


function getRandom(min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var result = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    if (exclude && result === exclude) {
        var temp = Math.floor(Math.random() * 2 + 1);
        if (temp === 1) {
            return result - 1;
        } else return result + 1;
    } else return result;
}


function createParticle() {

}


function createParticles() {
    for (i = 0; i < amount; i++) {
        var particle = new Object;
        particle.x = getRandom(0, canvas.width); // x-coordinate
        particle.y = getRandom(0, canvas.height); // y-coordinate
        particle.radius = getRandom(radiusMin, radiusMax); // radius
        particle.color = colors[getRandom(0, colors.length)];
        particle.speedX = (getRandom(speedMin, speedMax, 0)) / 10;
        particle.speedY = (getRandom(speedMin, speedMax, 0)) / 10;
        particles.push(particle);
    }
}

function animate(i) {
    var currentParticle = particles[i];
    var posX = currentParticle.x;
    var posY = currentParticle.y;
    context.beginPath();
    context.fillStyle = currentParticle.color;
    context.arc(posX, posY, currentParticle.radius, 0, Math.PI * 360);
    context.fill();
    if (posX >= canvas.width || posX <= 0) { speedX *= -1; }
    if (posY >= canvas.height || posY <= 0) { speedY *= -1; }
    posX += speedX;
    posY += speedY;
}


// function gameLoop() {
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     for (i = 0; i < particles.length; i++) {
//         animate(i);
//     }
// }


if (typeof(canvas.getContext) !== undefined) {
    context = canvas.getContext('2d');
    setInterval(gameLoop, 1000 / fps);
}


// TODO: When a particle exits the canvas, then reposition it randomly at an edge and give it a new direction and velocity
// TODO: Set a proximity for which the particles draws lines between each other
// TODO: Set the color of these lines accordingly to the distance between the particles
// TODO: Make the cursor draw these lines to the particles also

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        context.beginPath();
        context.fillStyle = p.color;
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 360);
        context.fill();
        if (p.x >= canvas.width || p.x <= 0) { p.speedX *= -1; } // bounce off the edges
        if (p.y >= canvas.height || p.y <= 0) { p.speedY *= -1; } // bounce off the edges


        // if (p.x >= canvas.width || p.x <= 0 || p.y >= canvas.height || p.y <= 0) { // reposition particle on canvas edge
        //     var edge = getRandom(0, 4);
        //     if (edge === 0) { // respawn on top
        //         p.x = getRandom(0, canvas.width); // x-coordinate
        //         p.y = 0;
        //         p.speedX = (getRandom(speedMin, speedMax, 0)) / 10;
        //         p.speedY = Math.abs((getRandom(speedMin, speedMax, 0)) / 10);
        //     }
        //     if (edge === 1) { // respawn on right
        //         p.x = canvas.width;
        //         p.y = getRandom(0, canvas.height); // y-coordinate
        //         p.speedX = ((getRandom(speedMin, speedMax, 0)) / 10) * -1;
        //         p.speedY = (getRandom(speedMin, speedMax, 0)) / 10;
        //     }
        //     if (edge === 2) { // respawn on bottom
        //         p.x = getRandom(0, canvas.width); // x-coordinate
        //         p.y = canvas.height;
        //         p.speedX = (getRandom(speedMin, speedMax, 0)) / 10;
        //         p.speedY = ((getRandom(speedMin, speedMax, 0)) / 10) * -1;
        //     } else { // respawn on left
        //         p.x = 0;
        //         p.y = getRandom(0, canvas.height); // y-coordinate
        //         p.speedX = Math.abs((getRandom(speedMin, speedMax, 0)) / 10);
        //         p.speedY = (getRandom(speedMin, speedMax, 0)) / 10;
        //     }
        // }

        p.x += p.speedX;
        p.y += p.speedY;
    }

}