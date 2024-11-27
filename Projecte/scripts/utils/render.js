import { imagenesPaises } from '../imagenes-paises.js';
import { printTravel } from '../services/printService.js';

export function renderTravelCard(travel) {
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
        <button class="print-btn" data-id="${travel.id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
        </button>
    `;

    // Añadir event listener para el botón de impresión
    const printBtn = viajeElement.querySelector('.print-btn');
    printBtn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
            printTravel(travel);
        } catch (error) {
            console.error('Error al imprimir:', error);
            alert('Error al generar el PDF');
        }
    });

    return viajeElement;
}