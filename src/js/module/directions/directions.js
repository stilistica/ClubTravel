import { getTours } from "../api/getTours";
import sprite from "/img/sprite.svg";

function mapTours(apiData) {
  return apiData.data.map((tour) => {
    const options = tour.tour_options || [];

    const minPrice = options.length
      ? Math.min(...options.map((o) => o.minPrice))
      : null;

    const imageOption = options.find((o) => o.imageTour?.url);

    return {
      id: tour.id,
      destination: tour.destination,
      region: tour.regions?.[0] ?? "",
      priceFrom: minPrice,
      image: imageOption ? imageOption.imageTour.url : "/img/no-image.webp",
      optionsCount: options.length,
      dates: options.map((o) => ({
        start: o.startDate,
        end: o.endDate,
      })),
    };
  });
}
const checkboxes = document.querySelectorAll(
  ".directions__filters input[type='checkbox']"
);

let currentDestination = null;

async function loadTours() {
  try {
    const rawData = await getTours({
      destination: currentDestination,
      page: 1,
      pageSize: 6,
    });

    const tours = mapTours(rawData);
    renderTours(tours);
  } catch (e) {
    console.error("Ошибка загрузки туров", e);
  }
}

// обработка чекбоксов
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // делаем активным только один
    checkboxes.forEach((cb) => (cb.checked = false));
    checkbox.checked = true;

    currentDestination =
      checkbox.value === "Все страны" ? null : checkbox.value;

    loadTours();
  });
});

function formatDate(date) {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function renderTours(tours) {
  const container = document.querySelector(".directions__wrapper");
  if (!container) return;

  container.innerHTML = tours
    .map(
      (t) => `
    <article class="directions__tour-card">

      <img width="273" height="160" src="${t.image}" alt="${
        t.region || t.destination
      }">

      <div class="directions__tour-card-body">

        <div class="directions__tour-card-head">
          <p class="directions__tour-card-region">${t.region}</p>
          <p class="directions__tour-card-price">
            от <span>${t.priceFrom?.toFixed(2).replace(".", ",")}€</span>/ чел
          </p>
        </div>

        <div class="directions__tour-card-sub">
          <p>${t.destination}</p>
          <p>${t.optionsCount} предложений</p>
        </div>

        <div class="directions__tour-card-dates">
        <div class="directions__tour-card-dates-list">
          ${t.dates
            .slice(0, 2)
            .map(
              (d) => `
            <p class="directions__tour-card-date">
              ${formatDate(d.start)} – ${formatDate(d.end)}
            </p>
              
          `
            )
            .join("")}
            </div>
            <svg width="24" height="24">
                <use href="${sprite}#icon-calendar"></use>
            </svg>
        </div>
        <div class="directions__btn-wrapper">
        <a href="/ClubTravel/html/pages/hotelPage.html?id=${
          t.id
        }"  class="directions__tour-card-btn">
          ВЫБРАТЬ ТУР
        </a>
        </div>
      </div>
    </article>
  `
    )
    .join("");
}
loadTours();
