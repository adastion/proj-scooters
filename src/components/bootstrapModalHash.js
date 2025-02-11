const bootstrapModalHash = (Modal) => {
    const getModal = () => {
        const modal = document.querySelector('.modal.show');
        return modal ? Modal.getOrCreateInstance(modal) : null;
    };

    document.addEventListener('show.bs.modal', event => {
        window.location.hash = event.target.id;
    });

    document.addEventListener('hide.bs.modal', event => {
        if (window.location.hash === '#' + event.target.id) {
            history.replaceState(null, null, ' ');
        }
    });

    addEventListener("hashchange", () => {
        const openModal = getModal();
        if (openModal && window.location.hash !== "#" + openModal.id) {
            openModal.hide();
        }
    });
};

export default bootstrapModalHash;
