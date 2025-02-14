import MySwiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderSwiper = () => {
        const sliders = document.querySelectorAll('.swiper-main-card');

        sliders.forEach((slider) => {
                const minSliders = slider.querySelectorAll('.swiper');

                const swiper = new MySwiper(minSliders[1], {
                        spaceBetween: 6,
                        slidesPerView: 4,
                        freeMode: true,
                        watchSlidesProgress: true,
                });
                new MySwiper(minSliders[0], {
                        modules: [Navigation, Thumbs],
                        spaceBetween: 10,
                        centeredSlides: true,
                        navigation: {
                                nextEl: slider.querySelector('.swiper-button-next'),
                                prevEl: slider.querySelector('.swiper-button-prev'),
                        },
                        thumbs: {
                                swiper: swiper,
                        },
                });
        });
};

export default sliderSwiper;
