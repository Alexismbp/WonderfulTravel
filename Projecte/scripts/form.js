import { loadTravels } from './travels.js';

export function initializeForm() {
    // Configurar la data mínima com avui i la data per defecte
    const today = new Date().toISOString().split('T')[0];
    const dataViatgeInput = document.getElementById('data-viatge');
    dataViatgeInput.value = today;
    dataViatgeInput.min = today;

    // Actualitzar el preu total quan canviï el número de persones
    const numPersonesInput = document.getElementById('num-persones');
    const preuBaseInput = document.getElementById('preu');
    const preuTotalInput = document.createElement('input');
    const descompteCheckbox = document.getElementById('descompte');

    // Configurar el nou camp de preu total
    preuTotalInput.type = 'text';
    preuTotalInput.id = 'preu-total';
    preuTotalInput.name = 'preu-total';
    preuTotalInput.readOnly = true;
    preuBaseInput.parentNode.insertAdjacentHTML('afterend', 
        '<div class="form-group"><label for="preu-total">Precio Total</label></div>'
    );
    document.querySelector('label[for="preu-total"]').parentNode.appendChild(preuTotalInput);

    // Funció per actualitzar el preu total
    function updateTotalPrice() {
        const basePrice = parseFloat(preuBaseInput.value) || 0;
        const numPersones = parseInt(numPersonesInput.value) || 0;
        let total = basePrice * numPersones;
        
        if (descompteCheckbox.checked) {
            total *= 0.8; // Aplicar 20% de descompte
        }
        
        preuTotalInput.value = total.toFixed(2) + '€';
    }

    // Event listeners per actualitzar el preu total
    numPersonesInput.addEventListener('input', updateTotalPrice);
    descompteCheckbox.addEventListener('change', updateTotalPrice);
    preuBaseInput.addEventListener('change', updateTotalPrice);

    // Manejar l'enviament del formulari
    document.getElementById('insertTravel').addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm(this)) {
            return;
        }

        const form = e.target;
        const actionUrl = form.getAttribute('action'); // Obté la URL de destinació del formulari
        const formData = new FormData(form);
        
        // Obtenir el valor del botó submit
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
                // Restablir la data per defecte després de resetejar el formulari
                dataViatgeInput.value = today;
            } else if (data.error) {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

// Funció per validar el formulari
function validateForm(form) {
    const nombre = form.querySelector('#nom').value;
    const telefono = form.querySelector('#telefon').value;
    const fecha = form.querySelector('#data-viatge').value;
    const numPersones = form.querySelector('#num-persones').value;

    // Validar nom
    if (!/^[A-Za-zÀ-ÿ\s]{2,50}$/.test(nombre)) {
        alert('El nom només pot contenir lletres i espais (2-50 caràcters)');
        return false;
    }

    // Validar telèfon
    if (!/^\+?[0-9]{8,15}$/.test(telefono)) {
        alert('Introdueix un número de telèfon vàlid');
        return false;
    }

    // Validar data
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('La data no pot ser anterior a avui');
        return false;
    }

    // Validar número de persones
    if (numPersones < 1 || numPersones > 50) {
        alert('El número de persones ha d\'estar entre 1 i 50');
        return false;
    }

    return true;
}