import { imagenesPaises } from './imagenes-paises.js';

/**
 * Funció principal per carregar i mostrar tots els viatges
 * Fa una petició AJAX per obtenir les dades i les mostra en el DOM
 */
export function loadTravels(retryCount = 3) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (attempts) => {
            fetch('controlador/ajax-handler.php?action=getAllTravels')
                .then(response => response.json())
                .then(travels => {
                    const container = document.getElementById('viajes-lista');
                    container.innerHTML = '';
                    
                    travels.forEach(travel => {
                        const viajeElement = document.createElement('div');
                        viajeElement.className = 'viaje-card';
                        viajeElement.innerHTML = `
                            <img src="${imagenesPaises[travel.pais_id]}" alt="Imagen de ${travel.nom_pais}">
                            <div class="viaje-info"><span>Fecha:</span> ${travel.data}</div>
                            <div class="viaje-info"><span>País:</span> ${travel.nom_pais}</div>
                            <div class="viaje-info"><span>Nombre:</span> ${travel.nom}</div>
                            <div class="viaje-info"><span>Teléfono:</span> ${travel.telefon}</div>
                            <div class="viaje-info"><span>Personas:</span> ${travel.num_persones}</div>
                            <div class="viaje-info"><span>Precio:</span> ${travel.preu}€</div>
                            <button class="delete-btn" data-id="${travel.id}">Eliminar</button>
                        `;
                        container.appendChild(viajeElement);
                        
                        const deleteBtn = viajeElement.querySelector('.delete-btn');
                        deleteBtn.addEventListener('click', () => deleteTravel(travel.id));
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

/**
 * Funció per eliminar un viatge específic
 * @param {number} travelId - ID del viatge a eliminar
 * Mostra un diàleg de confirmació abans d'eliminar
 * Fa una petició POST al servidor per realitzar l'eliminació
 */
function deleteTravel(travelId) {
    if (confirm('¿Estás seguro de que quieres eliminar este viaje?')) {
        // Preparació de les dades pel servidor
        const formData = new FormData();
        formData.append('action', 'deleteTravel');
        formData.append('travelId', travelId);

        // Petició AJAX per eliminar el viatge
        fetch('controlador/ajax-handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadTravels(); // Recarreguem la llista després d'eliminar
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}