import{a as x,f as C,r as M,S as $,N as T}from"./vendor-CYiRW1wK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",o=>{o.target===t&&t.classList.remove("is-open")}))});const L=x.create({baseURL:"http://localhost:1337/api",headers:{"Content-Type":"application/json"}});async function I(e,t){return(await L.post("/auth/local",{identifier:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const o=e.email.value.trim(),s=e.password.value;if(!o||!s){alert("Введите email и пароль");return}try{const n=await I(o,s);localStorage.setItem("jwt",n.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(n){const r=n.response?.data?.error?.message||"Неверный email или пароль";alert(r)}})});function D(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=D()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function B({page:e=1,pageSize:t=5}){const o=localStorage.getItem("jwt");if(!o)throw new Error("Нет JWT");return(await L.get("/orders",{headers:{Authorization:`Bearer ${o}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const O=5;function k(e){return e?new Date(e).toLocaleString("ru-RU"):"—"}function N(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${k(e.date)}</td>
    </tr>
  `}function A(e,t,o){const s=document.getElementById("ordersPagination");if(!s)return;const{page:n,pageCount:r,total:i}=e.pagination;s.innerHTML=`
    <div class="pagination">
      <span class="pagination__info">
        Показано ${t} из ${i}
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
  `,s.onclick=c=>{const a=c.target.dataset.action;a&&(a==="prev"&&n>1&&o(n-1),a==="next"&&n<r&&o(n+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let o=1;async function s(n){try{const{data:r,meta:i}=await B({page:n,pageSize:O});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(N).join(""),A(i,r.length,c=>{o=c,s(o)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}s(o)});const _=document.querySelector(".filter");if(_){let e=function(c=null){r.forEach(a=>{a!==c&&a.classList.remove("is-open")})};const t=_.querySelector(".filter__section-form-date__trigger-input"),o=_.querySelector(".filter__section-form-date__trigger"),s=_.querySelector(".filter__section-form-date__trigger-value"),n=C(t,{locale:M.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(c){if(!c.length)return;const a=c[0],l=a.getDate(),u=a.getFullYear(),d=a.toLocaleString("ru-RU",{month:"long"});s.textContent=`${l} ${d} ${u}`}});o.addEventListener("click",()=>{n.open()});const r=_.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");r.forEach(c=>{const a=c.querySelector(".filter__section-form-item-variant__trigger"),l=c.querySelector(".filter__section-form-item-variant__dropdown"),u=a.querySelector("span"),d=c.querySelector("input[type='hidden']");!l||!a||!u||!d||(a.addEventListener("click",p=>{p.stopPropagation(),e(c),c.classList.toggle("is-open")}),l.querySelectorAll("li").forEach(p=>{p.addEventListener("click",()=>{const h=p.dataset.value??p.getAttribute("value")??"";u.textContent=p.textContent,d.value=h,c.classList.remove("is-open")})}))}),document.addEventListener("click",()=>e());const i=_.querySelector(".filter__section-form-guests-variant");if(i){let c=function(){const f=+p.value||0,g=+h.value||0;if(!f&&!g){u.textContent="Любое к-ство",d.value="";return}const y=[];f&&y.push(`Взрослых: ${f}`),g&&y.push(`детей: ${g}`),u.textContent=y.join("; "),d.value=JSON.stringify({adults:f,children:g})};const a=i.querySelector(".filter__section-form-guests-variant__trigger"),l=i.querySelector(".filter__section-form-guests-variant__dropdown"),u=a.querySelector("span"),d=i.querySelector("input[name='filter-guests']"),p=l.querySelector("input[name='filter-adults']"),h=l.querySelector("input[name='filter-children']"),m=l.querySelector("li"),w=l.querySelectorAll("li > div");a.addEventListener("click",f=>{f.stopPropagation(),e(),i.classList.toggle("is-open")}),l.addEventListener("click",f=>f.stopPropagation()),m.addEventListener("click",()=>{p.value="",h.value="",u.textContent="Любое к-ство",d.value="",i.classList.remove("is-open")}),p.addEventListener("input",c),h.addEventListener("input",c),w.forEach(f=>{f.addEventListener("click",g=>{g.target.tagName!=="INPUT"&&i.classList.remove("is-open")})})}}const q=document.querySelector(".button-form-search-link");q&&q.addEventListener("click",e=>{if(e.preventDefault(),!window.location.pathname.endsWith("searchPage.html")){const o="/ClubTravel/";window.location.href=`${o}html/pages/searchPage.html`}});const v=document.querySelector(".filter-price-list");if(v){let e=function(){const m=p(u),w=p(d);n.style.left=`${m}%`,r.style.left=`${w}%`,s.style.left=`${m}%`,s.style.right=`${100-w}%`,i.textContent=`${u}€`,c.textContent=`${d}€`},t=function(m,w){const f=o.getBoundingClientRect(),g=P=>{let E=(P.clientX-f.left)/f.width*100;E=Math.max(0,Math.min(100,E));const b=h(E);w?u=Math.min(b,d):d=Math.max(b,u),e()},y=()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",y)};document.addEventListener("mousemove",g),document.addEventListener("mouseup",y)};const o=v.querySelector(".filter-price-slider"),s=v.querySelector(".filter-price-range"),n=v.querySelector(".filter-price-thumb.left"),r=v.querySelector(".filter-price-thumb.right"),i=v.querySelector("#minPrice"),c=v.querySelector("#maxPrice"),a=200,l=3e3;let u=200,d=3e3;const p=m=>(m-a)/(l-a)*100,h=m=>Math.round(a+m/100*(l-a));n.addEventListener("mousedown",m=>t(m,!0)),r.addEventListener("mousedown",m=>t(m,!1)),e()}async function R(){const{data:e}=await L.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}$.use([T]);function j(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const o=t.querySelector(".news-home__button-prev"),s=t.querySelector(".news-home__button-next");new $(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:o,nextEl:s},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function H(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),o=e.querySelector(".news-home__button-next");if(!t||!o)return null;const s=document.createElement("div");return s.className="swiper news-home__swiper",s.setAttribute("data-swiper",""),s.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(s,o),s.querySelector(".swiper-wrapper")}function U(e){const t=H();t&&e.forEach(o=>{const{title:s,price:n,date:r,images:i}=o,c=i?.url?`http://localhost:1337${i.url}`:"",a=document.createElement("div");a.className="swiper-slide",a.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${c}" alt="${s}" />

          ${n?`<p class="news-home__price">от <span>${n}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${F(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${s}</p>
        </div>
      </div>
    `,t.appendChild(a)})}function F(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await R();U(e),j()});async function V(e,t){return(await L.post("/auth/local/register",{username:e,email:e,password:t})).data}function z(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function W(e){return e.length>=8&&/[A-Za-z]/.test(e)&&/\d/.test(e)}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");e&&e.addEventListener("submit",async t=>{t.preventDefault();const o=e.email.value.trim(),s=e.password.value,n=e.passwordRepeat.value;if(!o){alert("Введите email");return}if(!z(o)){alert("Некорректный email");return}if(!s){alert("Введите пароль");return}if(!W(s)){alert("Пароль должен быть минимум 8 символов и содержать букву и цифру");return}if(s!==n){alert("Пароли не совпадают");return}try{const r=await V(o,s);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const i=r.response?.data?.error?.message||"Ошибка регистрации";alert(i)}})});async function G(e){return(await L.post("/auth/forgot-password",{email:e})).data}const S=document.getElementById("forgotForm");S&&S.addEventListener("submit",async e=>{e.preventDefault();try{await G(S.email.value),S.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
