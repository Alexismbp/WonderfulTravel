import { imagenesPaises } from './imagenes-paises.js';

// Funció per obtenir els continents
export function getContinents(retryCount = 3) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (attempts) => {
            fetch('controlador/ajax-handler.php?action=ajaxContinents')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la resposta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    // Afegir opcions de continents al select
                    const continentSelect = document.querySelector('select[name="continent"]');
                    data.forEach(continent => {
                        const option = document.createElement('option');
                        option.value = continent.id;
                        option.textContent = continent.nom_continent;
                        continentSelect.appendChild(option);
                    });
                    resolve(true);
                })
                .catch(error => {
                    console.error(`Intent ${attempts}: Error al carregar continents:`, error);
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

// Cargar països al seleccionar un continent
document.getElementById('continent').addEventListener('change', (event) => {
    const continentId = event.target.value;
    const paisSelect = document.getElementById('pais');
    paisSelect.innerHTML = '<option value="">-- Selecciona el país --</option>';
    document.getElementById('preu').value = '';  // Netejar camp de preu

    if (continentId) {
        paisSelect.disabled = false;
        // Cargar països des del servidor segons el continent seleccionat
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

// Actualitzar imatge i preu al seleccionar un país
document.getElementById('pais').addEventListener('change', (event) => {
    const paisId = event.target.value;
    const paisImagen = document.getElementById('pais-imagen');

    if (paisId) {
        // Actualitzar preu
        fetch(`controlador/ajax-handler.php?action=ajaxPrice&pais_id=${paisId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.preu) {
                    const preuBaseInput = document.getElementById('preu');
                    preuBaseInput.value = data.preu;
                    // Disparar esdeveniment change per actualitzar el preu total
                    preuBaseInput.dispatchEvent(new Event('change'));
                }
            })
            .catch(error => console.error('Error:', error));

        // Actualitzar imatge
        if (imagenesPaises[paisId]) {
            paisImagen.innerHTML = `<img src="${imagenesPaises[paisId]}" alt="Imatge del país" class="imagen-pais" style="max-width: 100%; max-height: 200px;">`;
        } else {
            paisImagen.innerHTML = '<p>Imatge no disponible</p>';
        }
    } else {
        document.getElementById('preu').value = '';
        document.getElementById('preu-total').value = '';
        paisImagen.innerHTML = '<p>Espai reservat per a la imatge del país</p>';
    }
});
