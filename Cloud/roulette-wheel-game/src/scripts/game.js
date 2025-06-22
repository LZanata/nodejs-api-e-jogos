const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

let wheelRotation = 0;
let rotationSpeed = 0;
let ballPosition = { x: canvas.width / 2, y: canvas.height / 2 };
let ballVelocity = { x: 0, y: 0 };
let isSpinning = false;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(wheelRotation * Math.PI / 180);
    
    // Draw the wheel
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(0, 0, 150, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawBall() {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    if (isSpinning) {
        wheelRotation += rotationSpeed;
        rotationSpeed *= 0.99; // Simulate friction

        // Update ball position based on rotation
        ballPosition.x = canvas.width / 2 + 100 * Math.cos(wheelRotation * Math.PI / 180);
        ballPosition.y = canvas.height / 2 + 100 * Math.sin(wheelRotation * Math.PI / 180);
        
        // Simulate ball bouncing
        ballVelocity.y += 0.5; // Gravity effect
        ballPosition.y += ballVelocity.y;

        if (ballPosition.y >= canvas.height / 2) {
            ballVelocity.y *= -0.7; // Bounce effect
            ballPosition.y = canvas.height / 2; // Reset position
        }
    }

    drawWheel();
    drawBall();
    requestAnimationFrame(update);
}

function startSpin() {
    if (!isSpinning) {
        rotationSpeed = Math.random() * 10 + 5; // Random speed
        isSpinning = true;
    }
}

canvas.addEventListener('click', startSpin);
update();