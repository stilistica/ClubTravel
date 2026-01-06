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

function renderHotelCard(hotel) {
  const img = getHotelImage(hotel.image);
  const name = hotel.nameHotel;
  const destination = hotel.tour?.destination;
  const region = hotel.region;
  const category = renderCategoryStars(hotel.category);
	
}
