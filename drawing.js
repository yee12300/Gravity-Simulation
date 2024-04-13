function Drawing(canvas) {
    let ctx = canvas.getContext('2d');
    let planetEvents = new PlanetEvents(canvas);
    let scale = {
        factor : 1,
        origin_x : 0,
        origin_y : 0
    }

    this.clearCanvas = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.drawPlanets = function() {
        let planets = planetEvents.getPlanets();
        for(let idx in planets) {
            ctx.save();
            ctx.scale(scale.factor, scale.factor);
            ctx.translate(scale.origin_x, scale.origin_y);

            ctx.beginPath();
            let planet = planets[idx];
            ctx.fillStyle = planet.getColor();
            ctx.arc(planet.position.x, planet.position.y, planet.getRadius(), 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText(planet.getMass(), planet.position.x, planet.position.y);

            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            if(!planet.isInitialized()) {
                ctx.moveTo(planet.position.x, planet.position.y);
                ctx.lineTo(planetEvents.cursor.x, planetEvents.cursor.y)
                ctx.stroke();
            }
            else {
                ctx.moveTo(planet.position.x, planet.position.y);
                ctx.lineTo(planet.position.x + planet.speed.x * 4, planet.position.y + planet.speed.y * 4);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    this.updatePlanets = function() {
        planetEvents.updatePlanets();
        planetEvents.updateCollision();
    }

    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let reset = document.getElementById('reset');

    start.addEventListener('click', function() {
        planetEvents.simulatePhase();
    });
    stop.addEventListener('click', function() {
        planetEvents.createPhase();
    });
    reset.addEventListener('click', function() {
        planetEvents.createPhase();
        planetEvents.resetPlanets();
        scale = {
            factor : 1,
            origin_x : 0,
            origin_y : 0
        }
    });

    canvas.addEventListener('wheel', event => {
        if(planetEvents.getPhase() !== 1) return;
        let unitStepScaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
        scale.factor *= unitStepScaleFactor;

        scale.origin_x /= unitStepScaleFactor;
        scale.origin_y /= unitStepScaleFactor;

        let x = event.clientX / scale.factor - scale.origin_x;
        let y = event.clientY / scale.factor - scale.origin_y;

        scale.origin_x += x * (1 - unitStepScaleFactor);
        scale.origin_y += y * (1 - unitStepScaleFactor);
    });

    let isDragging = false;
    let previousMousePosition = {x: 0, y: 0};

    canvas.addEventListener('mousedown', event => {
        isDragging = true;
        previousMousePosition.x = event.clientX;
        previousMousePosition.y = event.clientY;
    });

    canvas.addEventListener('mouseup', event => {
        isDragging = false;
    });

    canvas.addEventListener('mousemove', event => {
        if(planetEvents.getPhase() !== 1) return;
        if (isDragging) {
            let dx = event.clientX - previousMousePosition.x;
            let dy = event.clientY - previousMousePosition.y;
            scale.origin_x += dx / scale.factor;
            scale.origin_y += dy / scale.factor;
            previousMousePosition.x = event.clientX;
            previousMousePosition.y = event.clientY;
        }
    });
}