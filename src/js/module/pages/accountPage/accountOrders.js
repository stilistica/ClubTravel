import { getOrders } from "../../api/getOrders";

const ORDERS_PER_PAGE = 5;

/* ======================
   Utils
====================== */
function formatDate(iso) {
  if (!iso) return "—";

  const date = new Date(iso);

  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleString("ru-RU", {
    month: "long",
  });

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

/* ======================
   Render table row
====================== */
function renderOrderRow(order) {
  const statusClass =
    order.charter === "Оплачено"
      ? "order-status--paid"
      : "order-status--processing";

  return `
    <tr>
      <td>${order.orderNumber}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>${order.user?.email ?? "—"}</td>
      <td>
        <span class="order-status ${statusClass}">
          ${order.charter}
        </span>
      </td>
      <td>${formatDate(order.date)}</td>
    </tr>
  `;
}

function renderOrderCard(order) {
  const statusClass =
    order.charter === "Оплачено"
      ? "order-status--paid"
      : "order-status--processing";

  return `
    <div class="account__order-card">
      <div class="account__order-number">Номер заказа<span class="account__number">${
        order.orderNumber
      }</span></div>
      <div account__order-total>Сумма<span>${order.totalPrice.toFixed(
        2
      )}</span></div>
      <div>Email<span>${order.user?.email ?? "—"}</span></div>
      <div>
        Статус
        <span class="account__order-status ${statusClass}">
          ${order.charter}
        </span>
      </div>
      <div>Дата<span>${formatDate(order.date)}</span></div>
    </div>
  `;
}

/* ======================
   Pagination
====================== */
function renderPagination(meta, currentItemsCount, onPageChange) {
  const paginationEl = document.getElementById("ordersPagination");
  if (!paginationEl) return;

  const { page, pageCount, total } = meta.pagination;

  paginationEl.innerHTML = `
      <p class="account__pagination-info">
        Показано ${currentItemsCount} из ${total}
      </p>
     <div class="account__pagination-btns-wrapper">
      <button
        class="account__pagination-btn"
        ${page === 1 ? "disabled" : ""}
        data-action="prev"
      >
        Назад
      </button>

      <div class="account__pagination-page">
      <p class="account__pagination-text">Страница</p>
      <p class="account__pagination-current">${page}</p>
      <p class="account__pagination-text">из ${pageCount}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${page === pageCount ? "disabled" : ""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `;

  paginationEl.onclick = (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    if (action === "prev" && page > 1) {
      onPageChange(page - 1);
    }

    if (action === "next" && page < pageCount) {
      onPageChange(page + 1);
    }
  };
}

/* ======================
   Init
====================== */
document.addEventListener("DOMContentLoaded", async () => {
  const ordersList = document.getElementById("ordersList");
  const paginationEl = document.getElementById("ordersPagination");

  // если это не страница аккаунта — просто выходим
  if (!ordersList || !paginationEl) return;

  let currentPage = 1;

  async function load(page) {
    try {
      const { data, meta } = await getOrders({
        page,
        pageSize: ORDERS_PER_PAGE,
      });

      if (!data.length) {
        ordersList.innerHTML = `<tr><td colspan="5">Заказов нет</td></tr>`;
        paginationEl.innerHTML = "";
        return;
      }

      ordersList.innerHTML = data.map(renderOrderRow).join("");
      const ordersCards = document.getElementById("ordersCards");
      if (ordersCards) {
        ordersCards.innerHTML = data.map(renderOrderCard).join("");
      }

      renderPagination(meta, data.length, (newPage) => {
        currentPage = newPage;
        load(currentPage);
      });
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
      ordersList.innerHTML = `<tr><td colspan="5">Ошибка загрузки заказов</td></tr>`;
    }
  }

  load(currentPage);
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector(".account__btn-exit");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("jwt");

    localStorage.removeItem("user");

    window.location.replace("/ClubTravel/html/pages/loginPage.html");
  });
});
