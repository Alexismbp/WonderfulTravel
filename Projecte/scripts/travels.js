import { getCookie, setCookie } from './utils/cookies.js';
import { fetchTravels, deleteTravel } from './services/travelService.js';
import { renderTravelCard } from './utils/render.js';

/**
 * Funció principal per carregar i mostrar tots els viatges
 * Fa una petició AJAX per obtenir les dades i les mostra en el DOM
 */
export function loadTravels(retryCount = 3) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (attempts) => {
            const orderBy = getCookie('orderCriteria') || 'data';
            fetchTravels(orderBy)
                .then(travels => {
                    const container = document.getElementById('viajes-lista');
                    container.innerHTML = '';
                    
                    travels.forEach(travel => {
                        const viajeElement = renderTravelCard(travel);
                        container.appendChild(viajeElement);
                        
                        const deleteBtn = viajeElement.querySelector('.delete-btn');
                        deleteBtn.addEventListener('click', () => deleteTravel(travel.id).then(() => loadTravels()));
                    });
                    resolve(true);
                })
                .catch(error => {
                    console.error(`Intent ${attempts}: Error al carregar viatges:`, error);
                    if (attempts > 1) {
                        setTimeout(() => attemptFetch(attempts - 1), 1000);
                    } else {
                        reject(error);
                    }
                });
        };
        
        attemptFetch(retryCount);
    });
}

// Mover la inicialización del select fuera de DOMContentLoaded
export function initializeOrderSelect() {
    const orderSelect = document.getElementById('ordenar');
    if (!orderSelect) return; // Validación para asegurar que el elemento existe

    const savedOrder = getCookie('orderCriteria');
    if (savedOrder) {
        orderSelect.value = savedOrder;
    }

    orderSelect.addEventListener('change', (e) => {
        setCookie('orderCriteria', e.target.value);
        loadTravels(); // Recargar los viajes con el nuevo orden
    });

    // Cargar los viajes inicialmente
    loadTravels();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeOrderSelect();
});