
import { imagenesPaises } from '../imagenes-paises.js';

// Función para renderizar una tarjeta de viaje
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
    `;
    return viajeElement;
}