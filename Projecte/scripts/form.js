import { setupDatePicker } from './form/setupDatePicker.js';
import { setupPriceCalculator } from './form/setupPriceCalculator.js';
import { setupFormSubmission } from './form/setupFormSubmission.js';

export function initializeForm() {
    const elements = {
        dataViatgeInput: document.getElementById('data-viatge'),
        calendarButton: document.getElementById('calendar-trigger'),
        numPersonesInput: document.getElementById('num-persones'),
        preuBaseInput: document.getElementById('preu'),
        descompteCheckbox: document.getElementById('descompte'),
        form: document.getElementById('insertTravel')
    };

    const today = setupDatePicker(elements.dataViatgeInput, elements.calendarButton);
    setupPriceCalculator(elements.numPersonesInput, elements.preuBaseInput, elements.descompteCheckbox);
    setupFormSubmission(elements.form, today);
}