function PlanetEvents(canvas) {

    let ctx = canvas.getContext('2d');

    let planets = [];
    let cursor = {x: 0, y: 0};

    let first_click = true;

    canvas.addEventListener('mousemove', function (event) {
        let rect = canvas.getBoundingClientRect();
        cursor.x = event.clientX - rect.left;
        cursor.y = event.clientY - rect.top;
    });

    // Event listener for the 'click' event
    canvas.addEventListener('click', function (event) {
        // If the size is not fixed
        if (first_click) {
            // Get the click coordinates
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            // Push the new planet to the planets array
            let new_planet = new Planet('planet', x, y);
            new_planet.position = {x: x, y: y};
            planets.unshift(new_planet);
            first_click = false;
        } else {
            planets[0].speed = {x: (cursor.x - planets[0].position.x) / 10, y: (cursor.y - planets[0].position.y) / 10};
            planets[0].Initialize();
            first_click = true;
        }
    });

    // Event listener for the 'wheel' event
    canvas.addEventListener('wheel', function (event) {
        // If the size is not fixed
        if (!planets[0].isInitialized()) {
            // Change the mass of the last planet
            planets[0].setMass(planets[0].getMass() - event.deltaY * 10);
        }
    });

    this.clearCanvas = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.drawPlanets = function() {
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
                ctx.lineTo(cursor.x, cursor.y)
                ctx.stroke();
            }
            else {
                ctx.moveTo(planet.position.x, planet.position.y);
                ctx.lineTo(planet.position.x + planet.speed.x, planet.position.y + planet.speed.y);
                ctx.stroke();
            }
        }
    }
}