import { imagenesPaises } from './imagenes-paises.js';
import { fetchContinents, fetchCountries, fetchPrice } from './fetchData.js';
import { updateCountryOptions, updateCountryImage, updatePrice } from './updateUI.js';

// Funció per obtenir els continents
export function getContinents(retryCount = 3) {
    return fetchContinents(retryCount)
        .then(data => {
            const continentSelect = document.querySelector('select[name="continent"]');
            if (continentSelect) {
                continentSelect.innerHTML = '<option value="">-- Selecciona el continente --</option>';
                data.forEach(continent => {
                    const option = document.createElement('option');
                    option.value = continent.id;
                    option.textContent = continent.nom_continent;
                    continentSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error al cargar continentes:', error));
}

// Cargar països al seleccionar un continent
document.getElementById('continent').addEventListener('change', (event) => {
    const continentId = event.target.value;
    updateCountryOptions(continentId);
});

// Actualitzar imatge i preu al seleccionar un país
document.getElementById('pais').addEventListener('change', (event) => {
    const paisId = event.target.value;
    updateCountryImage(paisId);
    updatePrice(paisId);
});

// Llamar a getContinents para cargar los continentes al inicio
document.addEventListener('DOMContentLoaded', () => {
    getContinents();
});
