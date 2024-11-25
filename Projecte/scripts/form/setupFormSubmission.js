import { validateForm } from './validateForm.js';
import { loadTravels } from '../travels.js';

export function setupFormSubmission(form, today) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!validateForm(this)) return;

        try {
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            formData.set('action', submitButton.value);

            const response = await fetch(form.getAttribute('action'), {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            if (data.success) {
                alert(data.success);
                form.reset();
                document.getElementById('data-viatge').value = today;
                await loadTravels();
            } else if (data.error) {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}