function Planet(name, x, y) {
    let mass = 10000;
    let radius = Math.cbrt(mass);
    let color = getRandomColor();
    let isInitialized = false;
    this.position = {x: x, y: y};
    this.speed = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0};

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    this.setMass = function(newMass) {
        if(newMass >= 0) {
            mass = newMass;
            radius = Math.cbrt(mass);
        }
    }
    this.getMass = function() {
        return mass;
    }
    this.getName = function() {
        return name;
    }
    this.getRadius = function() {
        return radius;
    }
    this.getColor = function() {
        return color;
    }
    this.isInitialized = function() {
        return isInitialized;
    }
    this.Initialize = function() {
        isInitialized = true;
    }
}