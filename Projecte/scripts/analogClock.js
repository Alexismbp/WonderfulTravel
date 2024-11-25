// Funció per inicialitzar el rellotge analògic
export function initAnalogClock() {
    // Selecciona els elements del DOM per les agulles del rellotge
    const hourHand = document.querySelector('.hour');
    const minuteHand = document.querySelector('.minute');
    const secondHand = document.querySelector('.second'); 

    // Funció per actualitzar el rellotge
    function updateClock() {
        // Obtenir l'hora de Madrid
        const now = new Date();
        const madridTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
        
        // Obtenir els segons, minuts i hores de l'hora de Madrid
        const seconds = madridTime.getSeconds();
        const minutes = madridTime.getMinutes();
        const hours = madridTime.getHours();

        // Calcular els graus de rotació per les agulles del rellotge
        const secondsDegrees = (seconds / 60) * 360;
        const minutesDegrees = ((minutes + seconds/60) / 60) * 360;
        const hoursDegrees = ((hours + minutes/60) / 12) * 360;

        // Aplicar la rotació a les agulles del rellotge
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    // Actualitzar el rellotge cada segon
    setInterval(updateClock, 1000);
    // Actualitzar el rellotge immediatament
    updateClock();
}