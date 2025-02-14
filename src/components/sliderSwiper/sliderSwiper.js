import MySwiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderSwiper = () => {
        const swiper = new MySwiper('.productSlider', {
                spaceBetween: 6,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
        });
        new MySwiper('.productSlider2', {
                modules: [Navigation, Thumbs],
                spaceBetween: 10,
                centeredSlides: true,
                navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                },
                thumbs: {
                        swiper: swiper,
                },
        });
};

export default sliderSwiper;
