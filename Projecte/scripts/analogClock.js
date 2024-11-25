// Funció per inicialitzar el rellotge analògic
export function initAnalogClock() {
    // Selecciona els elements del DOM per les agulles del rellotge
    const hourHand = document.querySelector('.hour');
    const minuteHand = document.querySelector('.minute');
    const secondHand = document.querySelector('.second'); 

    // Funció per actualitzar el rellotge
    function updateClock() {
        const now = new Date();
        
        // Calcular los grados para cada manecilla
        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360);
        
        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6);
        
        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30);

        // Aplicar las rotaciones
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    // Actualitzar el rellotge cada segon
    setInterval(updateClock, 1000);
    // Actualitzar el rellotge immediatament
    updateClock();
}