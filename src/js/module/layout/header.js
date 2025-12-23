import { isLoggedIn } from './../pages/auth/login';

document.addEventListener("DOMContentLoaded", () => {
  const profileLink = document.querySelector(".header__top-bar-profile-link");
  if (!profileLink) return;

  profileLink.href = isLoggedIn()
    ? "/ClubTravel/html/pages/accountPage.html"
    : "/ClubTravel/html/pages/loginPage.html";
});
