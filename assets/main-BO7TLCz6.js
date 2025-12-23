import{a as p,S as u,N as m}from"./vendor-DaFOyPiE.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",a=>{a.target===t&&t.classList.remove("is-open")}))});const l=p.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function f(e,t){return(await l.post("/auth/local",{identifier:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.email.value.trim(),s=e.password.value;if(!a||!s){alert("Введите email и пароль");return}try{const n=await f(a,s);localStorage.setItem("jwt",n.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(n){const r=n.response?.data?.error?.message||"Неверный email или пароль";alert(r)}})});function g(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=g()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function w({page:e=1,pageSize:t=5}){const a=localStorage.getItem("jwt");if(!a)throw new Error("Нет JWT");return(await l.get("/orders",{headers:{Authorization:`Bearer ${a}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const h=5;function v(e){return e?new Date(e).toLocaleString("ru-RU"):"—"}function y(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${v(e.date)}</td>
    </tr>
  `}function L(e,t,a){const s=document.getElementById("ordersPagination");if(!s)return;const{page:n,pageCount:r,total:o}=e.pagination;s.innerHTML=`
    <div class="pagination">
      <span class="pagination__info">
        Показано ${t} из ${o}
      </span>

      <button
        class="pagination__btn"
        ${n===1?"disabled":""}
        data-action="prev"
      >
        Назад
      </button>

      <span class="pagination__page">
        Страница ${n} из ${r}
      </span>

      <button
        class="pagination__btn"
        ${n===r?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
    </div>
  `,s.onclick=c=>{const i=c.target.dataset.action;i&&(i==="prev"&&n>1&&a(n-1),i==="next"&&n<r&&a(n+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let a=1;async function s(n){try{const{data:r,meta:o}=await w({page:n,pageSize:h});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(y).join(""),L(o,r.length,c=>{a=c,s(a)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}s(a)});async function _(){const{data:e}=await l.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}u.use([m]);function b(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const a=t.querySelector(".news-home__button-prev"),s=t.querySelector(".news-home__button-next");new u(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:a,nextEl:s},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function E(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),a=e.querySelector(".news-home__button-next");if(!t||!a)return null;const s=document.createElement("div");return s.className="swiper news-home__swiper",s.setAttribute("data-swiper",""),s.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(s,a),s.querySelector(".swiper-wrapper")}function S(e){const t=E();t&&e.forEach(a=>{const{title:s,price:n,date:r,images:o}=a,c=o?.url?`http://localhost:1337${o.url}`:"",i=document.createElement("div");i.className="swiper-slide",i.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${c}" alt="${s}" />

          ${n?`<p class="news-home__price">от <span>${n}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${$(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${s}</p>
        </div>
      </div>
    `,t.appendChild(i)})}function $(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await _();S(e),b()});async function P(e,t){return(await l.post("/auth/local/register",{username:e,email:e,password:t})).data}function B(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function D(e){return e.length>=8&&/[A-Za-z]/.test(e)&&/\d/.test(e)}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const a=e.email.value.trim(),s=e.password.value,n=e.passwordRepeat.value;if(!a){alert("Введите email");return}if(!B(a)){alert("Некорректный email");return}if(!s){alert("Введите пароль");return}if(!D(s)){alert("Пароль должен быть минимум 8 символов и содержать букву и цифру");return}if(s!==n){alert("Пароли не совпадают");return}try{const r=await P(a,s);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const o=r.response?.data?.error?.message||"Ошибка регистрации";alert(o)}})});async function M(e){return(await l.post("/auth/forgot-password",{email:e})).data}const d=document.getElementById("forgotForm");d&&d.addEventListener("submit",async e=>{e.preventDefault();try{await M(d.email.value),d.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
