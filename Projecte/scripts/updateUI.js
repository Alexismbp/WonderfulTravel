import { fetchCountries, fetchPrice } from './fetchData.js';
import { imagenesPaises } from './imagenes-paises.js';

export function updateCountryOptions(continentId) {
    const paisSelect = document.getElementById('pais');
    paisSelect.innerHTML = '<option value="">-- Selecciona el país --</option>';
    document.getElementById('preu').value = '';  // Netejar camp de preu

    if (continentId) {
        paisSelect.disabled = false;
        fetchCountries(continentId)
            .then(data => {
                data.forEach(pais => {
                    const option = document.createElement('option');
                    option.value = pais.id;
                    option.textContent = pais.nom_pais;
                    paisSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    } else {
        paisSelect.disabled = true;
    }
}

export function updateCountryImage(paisId) {
    const paisImagen = document.getElementById('pais-imagen');

    if (imagenesPaises[paisId]) {
        paisImagen.innerHTML = `<img src="${imagenesPaises[paisId]}" alt="Imagen del país" class="imagen-pais" style="max-width: 100%; max-height: 200px;">`;
    } else {
        paisImagen.innerHTML = '<p>Imagen no disponible</p>';
    }
}

export function updatePrice(paisId) {
    fetchPrice(paisId)
        .then(data => {
            const precio = typeof data === 'number' ? data : data.preu;
            if (precio) {
                const preuBaseInput = document.getElementById('preu');
                preuBaseInput.value = precio;
                preuBaseInput.dispatchEvent(new Event('change'));
            } else {
                throw new Error('Precio no disponible');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener el precio');
            document.getElementById('preu').value = '';
            document.getElementById('preu-total').value = '';
        });
}