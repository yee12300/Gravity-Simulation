// Get a reference to the canvas element
let canvas = document.getElementById('canvas');

// Set the canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Get the 2D drawing context
let ctx = canvas.getContext('2d');

// Set the fill color
ctx.fillStyle = '#fff'; // white

// Define the center of the circle's path
let cx = canvas.width / 2;
let cy = canvas.height / 2;

// Define the radius of the circle's path
let r = 100;

// Define the initial angle
let theta = 0;

// Define the speed of the circle's movement
let speed = Math.PI / 180;

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the circle's new position
    let x = cx + r * Math.cos(theta);
    let y = cy + r * Math.sin(theta);

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2, false);
    ctx.fill();

    // Increment the angle
    theta += speed;

    // Request the next frame
    requestAnimationFrame(animate);
}

// Start the animation
animate();