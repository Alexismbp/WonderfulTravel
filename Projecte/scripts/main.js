// Importació dels mòduls necessaris per l'aplicació
import { ofertas } from './ofertas.js';
import './rellotge.js';
import { getContinents } from './desti.js';
import './desti.js';
import { initializeForm } from './form.js';
import { loadTravels } from './travels.js';
import { initAnalogClock } from './analogClock.js';

// Funció per mostrar les ofertes disponibles a la consola
function mostrarOfertas() {
    console.log('Ofertas disponibles:', ofertas);
}

// Event listener que s'executa quan el DOM està completament carregat
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicialització del rellotge analògic
        initAnalogClock();
        
        // Obtenim els continents de la base de dades
        await getContinents();
        
        // Pausa per assegurar que la connexió anterior es tanqui correctament
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Inicialització del formulari amb les dades necessàries
        await initializeForm();
        
        // Pausa addicional per evitar conflictes entre connexions
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Càrrega dels viatges disponibles
        await loadTravels();
    } catch (error) {
        console.error('Error:', error);
    }
});