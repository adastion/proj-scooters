import mixitup from 'mixitup';
import mixitupMultifilter from 'mixitup-multifilter';

mixitup.use(mixitupMultifilter);

const initMixitup = () => {
        const containerEl = document.querySelector('.filter-block');
        mixitup(containerEl, {
                multifilter: {
                        enable: true, // enable the multifilter extension for the mixer
                },
        });
};

export default initMixitup;
