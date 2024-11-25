import { createPriceTotalInput } from './createPriceTotalInput.js';
import { VALIDATION_RULES } from './validationRules.js';

export function setupPriceCalculator(numPersonesInput, preuBaseInput, descompteCheckbox) {
    const preuTotalInput = createPriceTotalInput(preuBaseInput);

    const updateTotalPrice = () => {
        const basePrice = parseFloat(preuBaseInput.value) || 0;
        const numPersones = parseInt(numPersonesInput.value) || 0;
        let total = basePrice * numPersones;
        
        if (descompteCheckbox.checked) {
            total *= VALIDATION_RULES.DISCOUNT_PERCENTAGE;
        }
        
        preuTotalInput.value = `${total.toFixed(2)}€`;
    };

    [numPersonesInput, descompteCheckbox, preuBaseInput].forEach(element => {
        element.addEventListener(element.type === 'checkbox' ? 'change' : 'input', updateTotalPrice);
    });

    // Agregar listener para el evento 'change' en preuBaseInput
    preuBaseInput.addEventListener('change', updateTotalPrice);
}