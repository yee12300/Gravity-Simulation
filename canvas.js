// Get a reference to the canvas element
let canvas = document.getElementById('canvas');

// Set the canvas size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

drawing = new Drawing(canvas);

function animate() {
    drawing.clearCanvas();
    drawing.drawPlanets();
    drawing.updatePlanets();

    requestAnimationFrame(animate);
}

// Start the animation
animate();
