import 'glightbox/dist/css/glightbox.min.css';
import GLightbox from 'glightbox';

const lightbox = () => {
    const lightbox = GLightbox();

    lightbox.on('open', () => {
        window.location.hash = "lightbox";
    });

    lightbox.on('close', () => {
        if (window.location.hash === "#lightbox") {
            history.replaceState(null, null, ' ');
        }
    });

    addEventListener("hashchange", () => {
        if (window.location.hash !== "#lightbox") {
            lightbox.close();
        }
    });
}
export default lightbox;