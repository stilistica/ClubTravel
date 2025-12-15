document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".open-menu");
  const mobMenu = document.querySelector(".mob-menu");

  if (!burger || !mobMenu) return;

  burger.addEventListener("click", () => {
    mobMenu.classList.toggle("is-open");
  });

  mobMenu.addEventListener("click", (e) => {
    if (e.target === mobMenu) {
      mobMenu.classList.remove("is-open");
    }
  });
});
