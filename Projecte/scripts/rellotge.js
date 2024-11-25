// Variable per controlar si es mostra l'hora en format 24h o 12h
export let formato24 = false;

/**
 * Funció principal que actualitza la data i hora
 * S'executa cada segon per mantenir el rellotge actualitzat
 */
export function updateDateTime() {
    const now = new Date();
    // Array amb els noms dels dies de la setmana en català
    const days = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'];

    let hour = now.getHours();
    // Afegim un 0 davant si el minut/segon és menor que 10
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    // Conversió a format 12h si formato24 és fals
    if(!formato24){
        ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
    }

    hour = hour.toString().padStart(2, '0');
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Formatem la cadena de text amb la data i hora
    const dateTimeString = `${hour}:${minute}:${second} ${ampm} ${day} \n ${date}/${month}/${year}`;

    document.getElementById('datetime').textContent = dateTimeString;
}

// Configuració inicial del rellotge
document.addEventListener('DOMContentLoaded', () => {
    // Canvia entre format 12h/24h amb doble clic
    document.getElementById('datetime').addEventListener('dblclick', () => {
        formato24 = !formato24;
        updateDateTime();
    });

    // Actualitza el rellotge cada segon
    setInterval(updateDateTime, 1000);
    updateDateTime();
});
