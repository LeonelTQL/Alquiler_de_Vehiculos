document.addEventListener('DOMContentLoaded', function () {
    // Función para limpiar completamente los modales y sus restos
    function limpiarModales() {
        // Eliminar todos los backdrops
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());

        // Eliminar clases residuales del body
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Forzar cierre de todos los modales abiertos
        const modalesAbiertos = document.querySelectorAll('.modal.show');
        modalesAbiertos.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        });
    }

    // Seleccionar todos los enlaces para cambiar entre modales
    const modalSwitchLinks = document.querySelectorAll('[data-bs-dismiss="modal"][data-bs-toggle="modal"]');

    modalSwitchLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Limpiar primero cualquier resto de modal anterior
            limpiarModales();

            // Obtener el modal de destino
            const targetModalId = this.getAttribute('data-bs-target');
            const targetModal = document.querySelector(targetModalId);

            // Esperar un momento antes de abrir el nuevo modal
            setTimeout(() => {
                if (targetModal) {
                    const newModalInstance = new bootstrap.Modal(targetModal);
                    newModalInstance.show();
                }
            }, 300);
        });
    });

    // Agregar listeners de limpieza a cada modal
    ['loginModal', 'registerModal'].forEach(modalId => {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            // Limpiar cuando el modal se oculta completamente
            modalElement.addEventListener('hidden.bs.modal', limpiarModales);
        }
    });
});