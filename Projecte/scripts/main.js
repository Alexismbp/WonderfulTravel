import { ofertas } from './ofertas.js';
import './rellotge.js';
import { getContinents } from './desti.js';
import './desti.js';
import { initializeForm } from './form.js';
import { loadTravels } from './travels.js';

// Función para mostrar las ofertas
function mostrarOfertas() {
    console.log('Ofertas disponibles:', ofertas);
    // Aquí puedes agregar la lógica para mostrar las ofertas en el HTML
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Primero ejecutamos getContinents
        await getContinents();
        
        // Pequeña pausa para asegurar que la primera conexión se cierre
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Luego inicializamos el formulario
        await initializeForm();
        
        // Otra pequeña pausa
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Finalmente cargamos los viajes
        await loadTravels();
    } catch (error) {
        console.error('Error:', error);
    }
});