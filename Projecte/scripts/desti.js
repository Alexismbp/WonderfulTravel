import { imagenesPaises } from './imagenes-paises.js';

export function getContinents() {
    // Cargar continentes
    fetch('controlador/ajax-handler.php?action=ajaxContinents')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error('Error del servidor:', data.error);
                return;
            }
            const continentSelect = document.querySelector('select[name="continent"]');
            data.forEach(continent => {
                const option = document.createElement('option');
                option.value = continent.id;
                option.textContent = continent.nom_continent;
                continentSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar los continentes. Por favor, recarga la página.');
        });
}

// Cargar países al seleccionar un continente
document.getElementById('continent').addEventListener('change', (event) => {
    const continentId = event.target.value;
    const paisSelect = document.getElementById('pais');
    paisSelect.innerHTML = '<option value="">-- Selecciona el país --</option>';
    document.getElementById('preu').value = '';  // Limpiar campo de precio

    if (continentId) {
        paisSelect.disabled = false;
        fetch(`controlador/ajax-handler.php?action=ajaxCountries&continent_id=${continentId}`)
            .then(response => response.json())
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
});

// Actualizar imagen y precio al seleccionar un país
document.getElementById('pais').addEventListener('change', (event) => {
    const paisId = event.target.value;
    const paisImagen = document.getElementById('pais-imagen');

    if (paisId) {
        // Actualizar precio
        fetch(`controlador/ajax-handler.php?action=ajaxPrice&pais_id=${paisId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.preu) {
                    document.getElementById('preu').value = data.preu;
                }
            })
            .catch(error => console.error('Error:', error));

        // Actualizar imagen
        if (imagenesPaises[paisId]) {
            paisImagen.innerHTML = `<img src="${imagenesPaises[paisId]}" alt="Imagen del país" class="imagen-pais" style="max-width: 100%; max-height: 200px;">`;
        } else {
            paisImagen.innerHTML = '<p>Imagen no disponible</p>';
        }
    } else {
        document.getElementById('preu').value = '';
        paisImagen.innerHTML = '<p>Espacio reservado para la imagen del país</p>';
    }
});
;
