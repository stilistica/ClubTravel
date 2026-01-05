import sprite from "/img/sprite.svg";

import Swiper from "swiper/bundle";
import { Pagination, Keyboard,Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { fetchHotelsBySeason } from "../../api/hotels.js";

const winterHomeContainer = document.querySelector(".winter-homepage-swiper");
const summerHomeContainer = document.querySelector(".summer-homepage-swiper");

if (winterHomeContainer) {
  initSeasonSwiperHome({
    containerSelector: ".winter-homepage-swiper",
    prevBtn: ".winter-homepage-prev",
    nextBtn: ".winter-homepage-next",
    season: "winter",
  });
}
if (summerHomeContainer) {
  initSeasonSwiperHome({
    containerSelector: ".summer-homepage-swiper",
    prevBtn: ".summer-homepage-prev",
    nextBtn: ".summer-homepage-next",
    season: "summer",
  });
}

async function initSeasonSwiperHome({
  containerSelector,
  prevBtn,
  nextBtn,
  season,
}) {
  const wrapper = document.querySelector(
    `${containerSelector} .swiper-wrapper`
  );

  const hotels = await fetchHotelsBySeason(season);

  wrapper.innerHTML = hotels.map((hotel) => renderSlideWSHome(hotel)).join("");

  const swiper = new Swiper(containerSelector, {
    direction: "horizontal",
    keyboard: { enabled: true, onlyInViewport: true },
    modules: [Pagination, Keyboard, Navigation],
    resizeObserver: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    loop: true,
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
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1366: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 23,
      },
      1920: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
  swiper.update();
}

function renderSlideWSHome(hotel) {
  // формування фото
  function getHotelImage(hot) {
    return (
      hot.image?.url ||
      hot.tour_option?.imageTour?.url ||
      hot.tour_option?.imageTour?.formats?.small?.url ||
      hot.tour_option?.imageTour?.formats?.thumbnail?.url
    );
  }

  const destination = hotel.tour?.destination;
  const price = hotel.tour_option?.minPrice;
  const img = getHotelImage(hotel);

  return `
        <div class="winter-summer-home__slider-swiper-slide swiper-slide">
          <div class="winter-summer-home__slider-swiper-slide-image">
            <img src="${img}" alt="${destination}" />
          </div>
          <div class="winter-summer-home__slider-swiper-slide-info">
            <div class="winter-summer-home__slider-swiper-slide-info-text">
              <p class="winter-summer-home__slider-swiper-slide-info-text-dest">
                <svg>
                  <use href="${sprite}#icon-point"></use>
                </svg>
                ${destination}
              </p>
              <p class="winter-summer-home__slider-swiper-slide-info-text-price">от <span>${price}</span>€/чел</p>
            </div>
						<a
						href="{{link
            'html/pages/searchPage.html'}}"
						class="button-org"
						style="--btn-width: 100%; --btn-height: 42px;"
						>Выбрать тур</a>
          </div>
        </div>
	`;
}
