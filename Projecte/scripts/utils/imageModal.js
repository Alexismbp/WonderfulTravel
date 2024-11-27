
function createImageModal() {
    // Crear el modal si no existe
    if (!document.getElementById('imageModal')) {
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img class="modal-image" src="" alt="Imagen ampliada">
            </div>
        `;
        document.body.appendChild(modal);

        // Cerrar modal al hacer clic en la X o fuera de la imagen
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.className === 'close-modal') {
                modal.classList.remove('active');
            }
        });

        // Cerrar modal con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}

export function initializeImageModal() {
    createImageModal();
    
    // Añadir listeners a todas las imágenes clickeables
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.matches('.viaje-card img, .imagen-pais')) {
            const modal = document.getElementById('imageModal');
            const modalImg = modal.querySelector('.modal-image');
            modalImg.src = target.src;
            modal.classList.add('active');
        }
    });
}