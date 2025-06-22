function calculateTrajectory(angle, speed) {
    const gravity = 9.81; // acceleration due to gravity
    const time = speed / gravity; // time of flight
    const x = speed * Math.cos(angle) * time; // horizontal distance
    const y = speed * Math.sin(angle) * time - 0.5 * gravity * time * time; // vertical distance
    return { x, y };
}

function calculateRotationSpeed(initialSpeed, deceleration, time) {
    return Math.max(0, initialSpeed - deceleration * time);
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

export { calculateTrajectory, calculateRotationSpeed, degreesToRadians, radiansToDegrees };