function ButtonEvents(planetEvents) {
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
    });
}