export function fetchContinents(retryCount) {
    return new Promise((resolve, reject) => {
        const attemptFetch = (attempts) => {
            fetch('controlador/ajax-handler.php?action=ajaxContinents', {
                cache: 'force-cache',
                headers: {
                    'Cache-Control': 'max-age=3600'
                }
            })
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
                    resolve(data);
                })
                .catch(error => {
                    console.error(`Intent ${attempts}: Error al carregar continents:`, error);
                    if (attempts > 1) {
                        setTimeout(() => attemptFetch(attempts - 1), attempts * 2000);
                    } else {
                        reject(error);
                    }
                });
        };
        
        attemptFetch(retryCount);
    });
}

export function fetchCountries(continentId) {
    return fetch(`controlador/ajax-handler.php?action=ajaxCountries&continent_id=${continentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la resposta del servidor');
            }
            return response.json();
        });
}

export function fetchPrice(paisId) {
    return fetch(`controlador/ajax-handler.php?action=ajaxPrice&pais_id=${paisId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la resposta del servidor');
            }
            return response.json();
        });
}