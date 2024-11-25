export function createPriceTotalInput(preuBaseInput) {
    const preuTotalInput = document.createElement('input');
    Object.assign(preuTotalInput, {
        type: 'text',
        id: 'preu-total',
        name: 'preu-total',
        readOnly: true
    });

    const container = '<div class="form-group"><label for="preu-total">Precio Total</label></div>';
    preuBaseInput.parentNode.insertAdjacentHTML('afterend', container);
    document.querySelector('label[for="preu-total"]').parentNode.appendChild(preuTotalInput);

    return preuTotalInput;
}