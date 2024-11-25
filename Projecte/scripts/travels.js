import { imagenesPaises } from './imagenes-paises.js';

export function loadTravels() {
    return fetch('controlador/ajax-handler.php?action=getAllTravels')
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

                // Añadir evento click al botón de eliminar
                const deleteBtn = viajeElement.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deleteTravel(travel.id));
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteTravel(travelId) {
    if (confirm('¿Estás seguro de que quieres eliminar este viaje?')) {
        const formData = new FormData();
        formData.append('action', 'deleteTravel');
        formData.append('travelId', travelId);

        fetch('controlador/ajax-handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadTravels(); // Recargar la lista de viajes
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}