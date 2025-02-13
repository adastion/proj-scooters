import './quiz.scss';

import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
Swiper.use([Navigation, Pagination, EffectFade]);

let _config = {
        selector: '#quiz',
};

const quiz = (config = {}) => {
        _config = { ..._config, ...config };
        /*
         * TODO: make quiz component works with many containers
         * const quizContainer = document.querySelectorAll(_config.selector)
         * Right now problem with navigation buttons, they work outside the container
         */
        const quizContainer = document.querySelector(_config.selector);

        if (quizContainer) {
                const swiper = new Swiper(quizContainer, {
                        autoHeight: true,
                        effect: 'fade',
                        fadeEffect: { crossFade: true },
                        swipeHandler: '.quiz-buttons',
                        navigation: {
                                nextEl: '.quiz-button-next',
                                prevEl: '.quiz-button-prev',
                        },
                        pagination: {
                                el: '.swiper-pagination',
                                type: 'progressbar',
                        },
                });

                const inputsNextSlide = quizContainer.querySelectorAll('.quiz__input--next');
                inputsNextSlide.forEach((input) => {
                        input.addEventListener('change', () => {
                                swiper.slideNext();
                        });
                });
        }
};

export default quiz;
