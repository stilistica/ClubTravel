import { getOrders } from "../../api/getOrders";

const ORDERS_PER_PAGE = 5;

/* ======================
   Utils
====================== */
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ru-RU");
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

/* ======================
   Pagination
====================== */
function renderPagination(meta, currentItemsCount, onPageChange) {
  const paginationEl = document.getElementById("ordersPagination");
  if (!paginationEl) return;

  const { page, pageCount, total } = meta.pagination;

  paginationEl.innerHTML = `
    <div class="pagination">
      <span class="pagination__info">
        Показано ${currentItemsCount} из ${total}
      </span>

      <button
        class="pagination__btn"
        ${page === 1 ? "disabled" : ""}
        data-action="prev"
      >
        Назад
      </button>

      <span class="pagination__page">
        Страница ${page} из ${pageCount}
      </span>

      <button
        class="pagination__btn"
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
