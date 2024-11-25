// Importació dels mòduls necessaris per l'aplicació
import { ofertas } from './ofertas.js';
import './rellotge.js';
import { getContinents } from './desti.js';
import './desti.js';
import { initializeForm } from './form.js';
import { loadTravels, initializeOrderSelect } from './travels.js';
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
        
        // Inicialitzar les dues peticions en paral·lel
        await Promise.all([
            getContinents().catch(error => {
                console.error('Error al carregar continents:', error);
                alert('Error al carregar els continents. Es tornará a intentar...');
                return getContinents(2); // Segon intent si falla
            }),
            loadTravels().catch(error => {
                console.error('Error al carregar viatges:', error);
                alert('Error al carregar els viatges. Es tornará a intentar...');
                return loadTravels(2); // Segon intent si falla
            })
        ]);
        
        // Inicialització del formulari
        await initializeForm();
        
        // Inicialització de l'ordre de selecció
        initializeOrderSelect();
        
    } catch (error) {
        console.error('Error crític:', error);
        alert('Hi ha hagut un error crític. Si us plau, recarrega la pàgina.');
    }
});