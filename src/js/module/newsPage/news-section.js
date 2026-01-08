import { fetchNews } from "../api/newsHome";
import api from "../api/axios";
import sprite from "/img/sprite.svg";

function renderNewsPage(items) {
  const wrapper = document.querySelector(".news-page__slider-wrapper");
  if (!wrapper) return;

  wrapper.innerHTML = "";
  const BASE_URL = api.defaults.baseURL.replace(/\/api$/, "");

  items.forEach((item) => {
    const { title, price, date, images } = item;
    // const imageUrl = images?.url;
    const imageUrl = images?.url ? BASE_URL + images.url : "";

    const card = document.createElement("div");
    card.className = "news-home__card";

    card.innerHTML = `
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
                <use href="${sprite}#icon-clock"></use>
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
    `;

    wrapper.appendChild(card);
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

document.addEventListener("DOMContentLoaded", async () => {
  const news = await fetchNews();
  renderNewsPage(news);
});
