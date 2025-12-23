function createNewsHomeSwiper() {
  const sliderWrapper = document.querySelector(".news-home__slider-wrapper");
  if (!sliderWrapper) return null;

  const prevBtn = sliderWrapper.querySelector(".news-home__button-prev");
  const nextBtn = sliderWrapper.querySelector(".news-home__button-next");

  if (!prevBtn || !nextBtn) return null;

  const swiper = document.createElement("div");
  swiper.className = "swiper news-home__swiper";
  swiper.setAttribute("data-swiper", "");

  swiper.innerHTML = `
    <div class="swiper-wrapper"></div>
  `;

  sliderWrapper.insertBefore(swiper, nextBtn);

  return swiper.querySelector(".swiper-wrapper");
}

function renderNewsHome(items) {
  const wrapper = createNewsHomeSwiper();
  if (!wrapper) return;

  items.forEach((item) => {
    const { title, price, date, images } = item;

    const imageUrl = images?.url ? `http://localhost:1337${images.url}` : "";

    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${imageUrl}" alt="${title}" />

          ${
            price
              ? `<p class="news-home__price">от <span>${price}</span></p>`
              : ""
          }

          ${
            date
              ? `
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${formatDate(date)}</p>
              </div>
              `
              : ""
          }
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${title}</p>
        </div>
      </div>
    `;

    wrapper.appendChild(slide);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

import { fetchNews } from "../../api/newsHome";
import { initSwipers } from "../../swiperNewHome/swiperNews";

document.addEventListener("DOMContentLoaded", async () => {
  const news = await fetchNews();

  renderNewsHome(news);

  initSwipers();
});
