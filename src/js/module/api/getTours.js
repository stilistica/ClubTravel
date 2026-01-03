import api from "./axios";

export async function getTours({
  destination,
  season,
  hotOffer,
  page = 1,
  pageSize = 6,
} = {}) {
  const params = {
    "populate[tour_options][populate]": "imageTour",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    sort: "id:asc",
  };

  // фильтр по направлению
  if (destination && destination !== "Все страны") {
    params["filters[destination][$eq]"] = destination;
  }

  // фильтр по сезону
  if (season) {
    params["populate[tour_options][filters][season][$eq]"] = season;
  }

  // фильтр hot offer
  if (hotOffer) {
    params["populate[tour_options][filters][hotOffer][$eq]"] = true;
  }

  const { data } = await api.get("/tours", { params });
  return data;
}
