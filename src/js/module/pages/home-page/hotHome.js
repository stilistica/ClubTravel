import sprite from "/img/sprite.svg";

import Swiper from "swiper/bundle";
import { Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchHotHotels } from "../../api/hotels.js";

const containerHotPageSwiper = document.querySelector(
  ".hothome__slider-swiper .swiper-wrapper"
);

if (containerHotPageSwiper) {
  const hotels = await fetchHotHotels();

  // форматування дати
  function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // отримання мінімальної ціни
  function getMinHotelPrice(options = []) {
    if (!options.length) return null;

    return Math.min(...options.map((opt) => opt.price));
  }

  // отримання фото
  function getHotelImage(image) {
    if (!image) return "/img/hot/image-one.webp";

    return (
      image.formats?.small?.url ||
      image.formats?.thumbnail?.url ||
      image.url ||
      "/img/hot/image-one.webp"
    );
  }

  // рендер категорій
  function renderCategoryStars(category) {
    // окремо для апартаментів
    if (category === "Apartments") {
      return `
      <p class="filter__extended-info-list-column-list-item-app">
        <svg>
          <use href="${sprite}#icon-house"></use>
        </svg>
        Апартаменты
      </p>
    `;
    }
    const map = {
      Budget: 2,
      Economy: 3,
      Standard: 4,
      Comfort: 5,
    };
    const stars = map[category];
    if (!stars) return "";
    return `
    <div class="filter__extended-info-list-column-list-item-stars">
      ${Array.from({ length: stars })
        .map(
          () => `
          <svg class="filter__extended-info-list-column-list-item-stars-star">
            <use href="${sprite}#icon-star"></use>
          </svg>
          `
        )
        .join("")}
    </div>
  `;
  }

  const slides = hotels
    .map((hotel) => {
      const name = hotel.nameHotel;
      const region = hotel.region;
      const destination = hotel.tour?.destination;
      const date = formatDate(hotel.tour_option?.startDate);
      const oldPrice = getMinHotelPrice(hotel.hotel_options);
      const newPrice = Math.round(oldPrice - oldPrice * (30 / 100));
      const category = renderCategoryStars(hotel.category);
      const img = getHotelImage(hotel.image);

      return `
        <div class="hothome__slider-swiper-item swiper-slide">
          <div class="hothome__slider-swiper-item-one">
            <img src="${img}" alt="${name}" />
            <div class="hothome__slider-swiper-item-one-list">
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-date"
            >
              <svg>
                <use href="${sprite}#icon-clock"></use>
              </svg>
              <p>${date}</p>
            </div>
            <div
              class="hothome__slider-swiper-item-one-list-item hothome__slider-swiper-item-one-list-place"
            >
              <svg>
                <use href="${sprite}#icon-point"></use>
              </svg>
              <p>${destination}, ${region}</p>
            </div>
            </div>
          </div>
          <div class="hothome__slider-swiper-item-two">
            <div class="hothome__slider-swiper-item-two-info">
              <p class="hothome__slider-swiper-item-two-info-name">${name}</p>
              <div class="hothome__slider-swiper-item-two-info-categories">${category}</div>
            </div>
            <div class="hothome__slider-swiper-item-two-price">
              <p class="hothome__slider-swiper-item-two-price-new"><span>${newPrice}</span>€/чел</p>
              <span class="hothome__slider-swiper-item-two-price-old">${oldPrice}€/чел</span>
            </div>
            <div class="hothome__slider-swiper-item-two-flag">
              <div>
              <svg>
                <use href="${sprite}#icon-flag"></use>
              </svg>
							<p>-30%</p>
              </div>
            </div>
          </div>
        </div>
				`;
    })
    .join("");
  containerHotPageSwiper.innerHTML = slides;

  const swiperHotHome = new Swiper(`.hothome__slider-swiper`, {
    direction: "horizontal",
    keyboard: { enabled: true, onlyInViewport: true },
    modules: [Pagination, Keyboard],
    resizeObserver: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: `.hothome__slider-buttons-next`,
      prevEl: `.hothome__slider-buttons-prev`,
    },
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 23,
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: 26,
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
  swiperHotHome.update();
}
