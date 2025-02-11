/*
 * External dependencies
 */
// When dropping the lite-youtube-embed, don't forget to remove the path to the appropriate files in webpack.config.js to the PurgeCSSPlugin plugin
import 'lite-youtube-embed/';
import 'lite-youtube-embed/src/lite-yt-embed.css';

// Bootstrap all modules
//import 'bootstrap/dist/js/bootstrap.bundle.min';

// Or import just what we need
//import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
//import 'bootstrap/js/dist/dropdown';
import bootstrapModal from 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/offcanvas';
//import 'bootstrap/js/dist/popover';
//import 'bootstrap/js/dist/scrollspy';
//import 'bootstrap/js/dist/tab';
//import 'bootstrap/js/dist/toast';
//import 'bootstrap/js/dist/tooltip';

/*
 * Internal dependencies
 */

import '../index.html'; // Hack for recompile webpack when html changes (requires null-loader)
import './styles/style.scss';

import form from './components/form';
import LightCountdown from "./components/lightCountdown/lightCountdown";
import lightbox from './components/lightbox';
import bootstrapModalHash from './components/bootstrapModalHash';

document.addEventListener('DOMContentLoaded', () => {
    form();
    lightbox();
    new LightCountdown()?.play();
    bootstrapModalHash(bootstrapModal);
});
