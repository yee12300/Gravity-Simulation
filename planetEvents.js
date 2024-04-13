function PlanetEvents(canvas) {
    let planets = [];
    this.cursor = {x: 0, y: 0};

    let first_click = true;
    let phase = 0;

    let G = 6.674 * Math.pow(10, -0.7);

    this.getPlanets = function() { return planets; }
    this.resetPlanets = function() { planets = []; }

    this.createPhase = function() { phase = 0; }
    this.simulatePhase = function() { phase = 1; }
    this.getPhase = function() { return phase; }

    this.updatePlanets = function() {
        if(phase === 1) {
            calAcceleration();
            updateSpeed();
            updatePosition();
        }
    }

    function calAcceleration() {
        for(let idx in planets) {
            let planet = planets[idx];
            planet.acceleration = {x: 0, y: 0};
            for(let idx2 in planets) {
                if(idx === idx2) continue;
                let planet2 = planets[idx2];
                let dx = planet2.position.x - planet.position.x;
                let dy = planet2.position.y - planet.position.y;
                let r = Math.sqrt(dx * dx + dy * dy);
                let a = G * planet2.getMass() / (r * r);
                planet.acceleration.x += a * dx / r;
                planet.acceleration.y += a * dy / r;
            }
        }
    }

    function updateSpeed() {
        for(let idx in planets) {
            let planet = planets[idx];
            planet.speed.x += planet.acceleration.x;
            planet.speed.y += planet.acceleration.y;
        }
    }

    function updatePosition() {
        for(let idx in planets) {
            let planet = planets[idx];
            planet.position.x += planet.speed.x;
            planet.position.y += planet.speed.y;
        }
    }

    this.updateCollision = function() {
        for(let idx in planets) {
            let planet = planets[idx];
            for(let idx2 in planets) {
                if(idx === idx2) continue;
                let planet2 = planets[idx2];
                if(checkCollision(planet, planet2)) {
                    let new_planet = mergePlanet(planet, planet2);
                    planets.splice(idx2, 1);
                    planets.splice(idx, 1);
                    planets.unshift(new_planet);
                    return;
                }
            }
        }
    }

    function checkCollision(planet1, planet2) {
        let dx = planet2.position.x - planet1.position.x;
        let dy = planet2.position.y - planet1.position.y;
        let r = Math.sqrt(dx * dx + dy * dy);
        return r <= planet1.getRadius() + planet2.getRadius();
    }

    function mergePlanet(planet1, planet2) {
        let mass = planet1.getMass() + planet2.getMass();
        let x = (planet1.position.x * planet1.getMass() + planet2.position.x * planet2.getMass()) / mass;
        let y = (planet1.position.y * planet1.getMass() + planet2.position.y * planet2.getMass()) / mass;
        let new_planet = new Planet('planet', x, y);
        new_planet.setMass(mass);
        new_planet.speed = {
            x: (planet1.speed.x * planet1.getMass() + planet2.speed.x * planet2.getMass()) / mass,
            y: (planet1.speed.y * planet1.getMass() + planet2.speed.y * planet2.getMass()) / mass
        }
        new_planet.Initialize();
        return new_planet;
    }

    canvas.addEventListener('mousemove', event => {
        let rect = canvas.getBoundingClientRect();
        this.cursor.x = event.clientX - rect.left;
        this.cursor.y = event.clientY - rect.top;
    });

    // Event listener for the 'click' event
    canvas.addEventListener('click', event => {
        if (phase !== 0) return;
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
            planets[0].speed = {
                x: (this.cursor.x - planets[0].position.x) / 20,
                y: (this.cursor.y - planets[0].position.y) / 20
            };
            planets[0].Initialize();
            first_click = true;
        }
    });

    // Event listener for the 'wheel' event
    canvas.addEventListener('wheel', event => {
        if (phase !== 0) return;
        // If the size is not fixed
        if (!planets[0].isInitialized()) {
            // Change the mass of the last planet
            planets[0].setMass(planets[0].getMass() - event.deltaY);
        }
    });
}