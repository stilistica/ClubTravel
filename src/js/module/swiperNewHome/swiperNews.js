import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

Swiper.use([Navigation]);

document.querySelectorAll("[data-swiper]").forEach((slider) => {
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
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 27,
      },
    },
  });
});
