// Get a reference to the canvas element
let canvas = document.getElementById('canvas');

// Set the canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

planetEvents = new PlanetEvents(canvas);

function animate() {
    planetEvents.clearCanvas();

    planetEvents.drawPlanets();

    requestAnimationFrame(animate);
}

// Start the animation
animate();

