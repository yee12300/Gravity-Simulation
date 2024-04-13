function Drawing(canvas) {
    let ctx = canvas.getContext('2d');
    let planetEvents = new PlanetEvents(canvas);
    let buttonEvents = new ButtonEvents(planetEvents);
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

    canvas.addEventListener('wheel', event => {
        if(planetEvents.getPhase() !== 1) return;
        scale.factor *= event.deltaY > 0 ? 0.9 : 1.1;
    });

    let isDragging = false;
    let previousMousePosition = {x: 0, y: 0};

    canvas.addEventListener('mousedown', event => {
        isDragging = true;
        let cursor = planetEvents.cursor;
        previousMousePosition.x = cursor.x;
        previousMousePosition.y = cursor.y;
    });

    canvas.addEventListener('mouseup', event => {
        isDragging = false;
    });

    canvas.addEventListener('mousemove', event => {
        if(planetEvents.getPhase() !== 1) return;
        let cursor = planetEvents.cursor;
        if (isDragging) {
            let dx = cursor.x - previousMousePosition.x;
            let dy = cursor.y - previousMousePosition.y;
            scale.origin_x += dx / scale.factor;
            scale.origin_y += dy / scale.factor;
            previousMousePosition.x = cursor.x;
            previousMousePosition.y = cursor.y;
        }
    });
}