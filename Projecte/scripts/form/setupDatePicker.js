export function setupDatePicker(dataViatgeInput, calendarButton) {
    const today = new Date().toISOString().split('T')[0];
    dataViatgeInput.value = today;
    dataViatgeInput.min = today;

    calendarButton.addEventListener('click', () => {
        dataViatgeInput.removeAttribute('readonly');
        dataViatgeInput.showPicker();
        setTimeout(() => dataViatgeInput.setAttribute('readonly', ''), 100);
    });

    dataViatgeInput.addEventListener('change', () => {
        dataViatgeInput.setAttribute('readonly', '');
    });

    dataViatgeInput.addEventListener('keydown', (e) => e.preventDefault());

    return today;
}