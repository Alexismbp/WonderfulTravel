// form.js
import { loadTravels } from './travels.js';

export function initializeForm() {
    document.getElementById('insertTravel').addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío del formulario

        const form = e.target;
        const actionUrl = form.getAttribute('action'); // Obtiene la URL de destino del formulario
        const formData = new FormData(form);

        // Obtener el valor del botón submit
        const submitButton = form.querySelector('button[type="submit"]');
        formData.set('action', submitButton.value);

        fetch(actionUrl, {  // Envía los datos al servidor
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.success); // Muestra mensaje de éxito
                    form.reset(); // Opcional: limpia el formulario después de la inserción
                    loadTravels(); // Ahora loadTravels estará disponible
                } else if (data.error) {
                    alert('Error: ' + data.error); // Muestra mensaje de error
                }
            })
            .catch(error => console.error('Error:', error));
    });
}