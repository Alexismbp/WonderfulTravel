// form.js
import { loadTravels } from './travels.js';

export function initializeForm() {
    // Configurar fecha mínima como hoy y fecha por defecto
    const today = new Date().toISOString().split('T')[0];
    const dataViatgeInput = document.getElementById('data-viatge');
    dataViatgeInput.value = today;
    dataViatgeInput.min = today;

    // Actualizar precio total cuando cambie el número de personas
    const numPersonesInput = document.getElementById('num-persones');
    const preuInput = document.getElementById('preu');
    const descompteCheckbox = document.getElementById('descompte');

    function updateTotalPrice() {
        const basePrice = parseFloat(preuInput.value) || 0;
        const numPersones = parseInt(numPersonesInput.value) || 0;
        let total = basePrice * numPersones;
        
        if (descompteCheckbox.checked) {
            total *= 0.8; // Aplicar 20% de descuento
        }
        
        preuInput.value = total.toFixed(2);
    }

    numPersonesInput.addEventListener('change', updateTotalPrice);
    descompteCheckbox.addEventListener('change', updateTotalPrice);

    // Manejar el envío del formulario
    document.getElementById('insertTravel').addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm(this)) {
            return;
        }

        const form = e.target;
        const actionUrl = form.getAttribute('action'); // Obtiene la URL de destino del formulario
        const formData = new FormData(form);
        
        // Obtener el valor del botón submit
        const submitButton = form.querySelector('button[type="submit"]');
        formData.set('action', submitButton.value);
        
        fetch(actionUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.success);
                this.reset();
                loadTravels();
                // Restablecer la fecha por defecto después de resetear el formulario
                dataViatgeInput.value = today;
            } else if (data.error) {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

function validateForm(form) {
    const nombre = form.querySelector('#nom').value;
    const telefono = form.querySelector('#telefon').value;
    const fecha = form.querySelector('#data-viatge').value;
    const numPersones = form.querySelector('#num-persones').value;

    // Validar nombre
    if (!/^[A-Za-zÀ-ÿ\s]{2,50}$/.test(nombre)) {
        alert('El nombre solo puede contener letras y espacios (2-50 caracteres)');
        return false;
    }

    // Validar teléfono
    if (!/^\+?[1-9]\d{7,14}$/.test(telefono)) {
        alert('Introduce un número de teléfono válido');
        return false;
    }

    // Validar fecha
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('La fecha no puede ser anterior a hoy');
        return false;
    }

    // Validar número de personas
    if (numPersones < 1 || numPersones > 50) {
        alert('El número de personas debe estar entre 1 y 50');
        return false;
    }

    return true;
}