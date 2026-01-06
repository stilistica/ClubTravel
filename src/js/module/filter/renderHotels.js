import { getHotelImage, renderCategoryStars } from "../pages/home-page/hotHome";

export function renderHotelsList(hotels) {
  const list = document.querySelector(".result-filter__list");
  if (!list) return;

  list.innerHTML = "";

  if (!hotels.length) {
    list.innerHTML = `
		<li class="result-filter__list-empty">
		По выбранным фильтрам ничего не найдено
		</li>
		`;
    return;
  }

  list.innerHTML = hotels.map((hotel) => renderHotelCard(hotel)).join("");
}

function getHotelMeals(options = []) {
  if (!options.length) return "-";

  const mealsMap = {
    no_meals: "Без питания",
    breakfast: "Завтрак",
    breakfast_dinner: "Завтрак и ужин",
    full_board: "Завтрак, обед, ужин",
    all_inclusive: "Всё включено",
    ultra_all_inclusive: "Ультра: всё включено",
  };

  const option = options.reduce((min, current) => {
    return current.price < min.price ? current : min;
  }, options[0]);

  return mealsMap[option.meals] || "-";
}

function renderHotelCard(hotel) {
  const img = getHotelImage(hotel.image);
  const name = hotel.nameHotel;
  const destination = hotel.tour?.destination;
  const region = hotel.region;
  const category = renderCategoryStars(hotel.category);
  const meals = getHotelMeals(hotel.hotel_options);
  const days = hotel.tour_option?.days;
  const cate = hotel.category;
  const description = hotel.description;
  const minPrice = hotel.tour_option?.minPrice;

  return `
  `;
}
