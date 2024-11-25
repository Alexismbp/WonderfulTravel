
// Función para obtener todos los viajes
export function fetchTravels(orderBy) {
    return fetch(`controlador/ajax-handler.php?action=getAllTravels&orderBy=${orderBy}`)
        .then(response => response.json())
        .then(travels => {
            if (travels.error) {
                throw new Error(travels.error);
            }
            return travels;
        });
}

// Función para eliminar un viaje específico
export function deleteTravel(travelId) {
    if (confirm('¿Estás seguro de que quieres eliminar este viaje?')) {
        const formData = new FormData();
        formData.append('action', 'deleteTravel');
        formData.append('travelId', travelId);

        return fetch('controlador/ajax-handler.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                throw new Error(data.error);
            }
        });
    }
    return Promise.reject('Eliminación cancelada');
}