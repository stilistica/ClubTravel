import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

Swiper.use([Navigation]);

export function initSwipers() {
  document.querySelectorAll("[data-swiper]").forEach((slider) => {
    if (slider.swiper) return;

    const wrapper = slider.closest(".news-home__slider-wrapper");
    if (!wrapper) return;

    const prevBtn = wrapper.querySelector(".news-home__button-prev");
    const nextBtn = wrapper.querySelector(".news-home__button-next");

    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 600,

      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        620: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 23,
        },
        1366: {
          slidesPerView: 3,
          spaceBetween: 27,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
        1920: {
          slidesPerView: 4,
          spaceBetween: 31,
        },
      },
    });
  });
}
