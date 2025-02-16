import mixitup from 'mixitup';
import mixitupMultifilter from 'mixitup-multifilter';

mixitup.use(mixitupMultifilter);

const initMixitup = () => {
        let mixer = mixitup('.filter-block', {
                multifilter: {
                        enable: true, // enable the multifilter extension for the mixer
                },
        });
};

export default initMixitup;
