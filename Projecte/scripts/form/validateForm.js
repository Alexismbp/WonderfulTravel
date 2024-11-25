import { VALIDATION_RULES } from './validationRules.js';

export function validateForm(form) {
    const formData = {
        name: form.querySelector('#nom').value,
        phone: form.querySelector('#telefon').value,
        date: new Date(form.querySelector('#data-viatge').value),
        people: parseInt(form.querySelector('#num-persones').value)
    };

    const validations = [
        {
            condition: !VALIDATION_RULES.NAME_REGEX.test(formData.name),
            message: 'El nom només pot contenir lletres i espais (2-50 caràcters)'
        },
        {
            condition: !VALIDATION_RULES.PHONE_REGEX.test(formData.phone),
            message: 'Introdueix un número de telèfon vàlid'
        },
        {
            condition: formData.date < new Date().setHours(0,0,0,0),
            message: 'La data no pot ser anterior a avui'
        },
        {
            condition: formData.people < VALIDATION_RULES.MIN_PEOPLE || formData.people > VALIDATION_RULES.MAX_PEOPLE,
            message: `El número de persones ha d'estar entre ${VALIDATION_RULES.MIN_PEOPLE} i ${VALIDATION_RULES.MAX_PEOPLE}`
        }
    ];

    const error = validations.find(v => v.condition);
    if (error) {
        alert(error.message);
        return false;
    }
    return true;
}