function Drawing(canvas) {
    let ctx = canvas.getContext('2d');
    let planetEvents = new PlanetEvents(canvas);
    let buttonEvents = new ButtonEvents(planetEvents);

    this.clearCanvas = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.drawPlanets = function() {
        let planets = planetEvents.getPlanets();
        for(let idx in planets) {
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
        }
    }

    this.updatePlanets = function() {
        planetEvents.updatePlanets();
        planetEvents.updateCollision();
    }
}