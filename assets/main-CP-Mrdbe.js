import{a as R,J as I,f as U,r as V,S as N,N as J}from"./vendor-2n-u-6o3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".open-menu"),t=document.querySelector(".mob-menu");!e||!t||(e.addEventListener("click",()=>{t.classList.toggle("is-open")}),t.addEventListener("click",n=>{n.target===t&&t.classList.remove("is-open")}))});const y=R.create({baseURL:"https://thankful-garden-94c969a4ca.strapiapp.com/api",headers:{"Content-Type":"application/json"}});async function Y(e,t){return(await y.post("/auth/local",{identifier:e,password:t})).data}function W(){const e=localStorage.getItem("jwt");return typeof e=="string"&&e.length>0}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("loginForm");if(!e)return;const t=new I("#loginForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),a=e.password.value;try{const r=await Y(s,a);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){t.showErrors({'[name="password"]':r.message})}})});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".header__top-bar-profile-link");e&&(e.href=W()?"/ClubTravel/html/pages/accountPage.html":"/ClubTravel/html/pages/loginPage.html")});async function z({page:e=1,pageSize:t=5}){const n=localStorage.getItem("jwt");if(!n)throw new Error("Нет JWT");return(await y.get("/orders",{headers:{Authorization:`Bearer ${n}`},params:{populate:"user",pagination:{page:e,pageSize:t},sort:"createdAt:desc"}})).data}const G=5;function A(e){if(!e)return"—";const t=new Date(e),n=t.getDate(),s=t.getFullYear(),a=t.toLocaleString("ru-RU",{month:"long"}),r=String(t.getHours()).padStart(2,"0"),c=String(t.getMinutes()).padStart(2,"0");return`${n} ${a} ${s} ${r}:${c}`}function K(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <tr>
      <td>${e.orderNumber}</td>
      <td>${e.totalPrice.toFixed(2)}</td>
      <td>${e.user?.email??"—"}</td>
      <td>
        <span class="order-status ${t}">
          ${e.charter}
        </span>
      </td>
      <td>${A(e.date)}</td>
    </tr>
  `}function Z(e){const t=e.charter==="Оплачено"?"order-status--paid":"order-status--processing";return`
    <div class="account__order-card">
      <div class="account__order-number">Номер заказа<span class="account__number">${e.orderNumber}</span></div>
      <div account__order-total>Сумма<span>${e.totalPrice.toFixed(2)}</span></div>
      <div>Email<span>${e.user?.email??"—"}</span></div>
      <div>
        Статус
        <span class="account__order-status ${t}">
          ${e.charter}
        </span>
      </div>
      <div>Дата<span>${A(e.date)}</span></div>
    </div>
  `}function X(e,t,n){const s=document.getElementById("ordersPagination");if(!s)return;const{page:a,pageCount:r,total:c}=e.pagination;s.innerHTML=`
      <p class="account__pagination-info">
        Показано ${t} из ${c}
      </p>
     <div class="account__pagination-btns-wrapper">
      <button
        class="account__pagination-btn"
        ${a===1?"disabled":""}
        data-action="prev"
      >
        Назад
      </button>

      <div class="account__pagination-page">
      <p class="account__pagination-text">Страница</p>
      <p class="account__pagination-current">${a}</p>
      <p class="account__pagination-text">из ${r}</p>
      </div>

      <button
        class="account__pagination-btn"
        ${a===r?"disabled":""}
        data-action="next"
      >
        Вперёд
      </button>
      </div>
  `,s.onclick=l=>{const i=l.target.dataset.action;i&&(i==="prev"&&a>1&&n(a-1),i==="next"&&a<r&&n(a+1))}}document.addEventListener("DOMContentLoaded",async()=>{const e=document.getElementById("ordersList"),t=document.getElementById("ordersPagination");if(!e||!t)return;let n=1;async function s(a){try{const{data:r,meta:c}=await z({page:a,pageSize:G});if(!r.length){e.innerHTML='<tr><td colspan="5">Заказов нет</td></tr>',t.innerHTML="";return}e.innerHTML=r.map(K).join("");const l=document.getElementById("ordersCards");l&&(l.innerHTML=r.map(Z).join("")),X(c,r.length,i=>{n=i,s(n)})}catch(r){console.error("Ошибка загрузки заказов:",r),e.innerHTML='<tr><td colspan="5">Ошибка загрузки заказов</td></tr>'}}s(n)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".account__btn-exit");e&&e.addEventListener("click",()=>{localStorage.removeItem("jwt"),localStorage.removeItem("user"),window.location.replace("/ClubTravel/html/pages/loginPage.html")})});async function Q(){const{data:e}=await y.get("/tours");return e.data}async function ee(){const{data:e}=await y.get("/hotels?populate=*");return e}const B="/ClubTravel/assets/sprite-xjNdH9vZ.svg",S=document.querySelector(".filter"),o={destination:"",days:null,date:null,guests:{adults:null,children:null},category:[],meals:[],tourPackage:[],departureCity:[],price:{min:null,max:null},regions:[]},te={"filter-destination":"destination","filter-days":"days","filter-date":"date","filter-guests":"guests"};if(window.location.pathname.endsWith("searchPage.html"))if([...new URLSearchParams(window.localStorage.search).keys()].length)ce();else{const t=localStorage.getItem("filtersState");t&&Object.assign(o,JSON.parse(t)),_(o)}else localStorage.removeItem("filtersState");if(S){let e=function(c=null){a.forEach(l=>{l!==c&&l.classList.remove("is-open")})};const t=S.querySelector(".filter__section-form-date__trigger-input"),n=S.querySelector(".filter__section-form-date__trigger"),s=S.querySelector(".filter__section-form-date__trigger-value");if(t||n||s){if(o.date){const l=new Date(o.date),i=l.getDate(),m=l.getFullYear(),p=l.toLocaleString("ru-RU",{month:"long"});s.textContent=`${i} ${p} ${m}`}const c=U(t,{locale:V.Russian,minDate:"today",dateFormat:"Y-m-d",allowInput:!1,onChange(l){if(!l.length)return;const i=l[0],m=i.getDate(),p=i.getFullYear(),h=i.toLocaleString("ru-RU",{month:"long"});s.textContent=`${m} ${h} ${p}`;const g=i.getFullYear(),u=String(i.getMonth()+1).padStart(2,"0"),d=String(i.getDate()).padStart(2,"0");o.date=`${g}-${u}-${d}`,_(o),w()}});n.addEventListener("click",()=>{c.open()})}const a=S.querySelectorAll(".filter__section-form-item-variant:not(.filter__section-form-guests-variant)");a.forEach(c=>{const i=c.closest(".filter__section-form-item").dataset.name,m=te[i],p=c.querySelector(".filter__section-form-item-variant__trigger"),h=c.querySelector(".filter__section-form-item-variant__dropdown"),g=p.querySelector("span");if(!(!h||!p||!g)){if(o[m]&&typeof o[m]=="string"){const u=Array.from(h.querySelectorAll("li")).find(d=>(d.dataset.value??d.getAttribute("value"))===o[m]);u&&(g.textContent=u.textContent)}p.addEventListener("click",u=>{u.stopPropagation(),e(c),c.classList.toggle("is-open")}),h.querySelectorAll("li").forEach(u=>{u.addEventListener("click",()=>{const d=u.dataset.value??u.getAttribute("value")??"";g.textContent=u.textContent,o[m]=d||null,_(o),w(),m==="destination"&&(o.regions=[],b&&b(d)),c.classList.remove("is-open")})})}}),document.addEventListener("click",()=>e());const r=S.querySelector(".filter__section-form-guests-variant");if(r){let c=function(){const d=+p.value||0,v=+h.value||0;if(!d&&!v){m.textContent="Любое к-ство";return}const f=[];d&&f.push(`Взрослых: ${d}`),v&&f.push(`детей: ${v}`),m.textContent=f.join("; "),o.guests.adults=d,o.guests.children=v,_(o),w()};const l=r.querySelector(".filter__section-form-guests-variant__trigger"),i=r.querySelector(".filter__section-form-guests-variant__dropdown"),m=l.querySelector("span"),p=i.querySelector("input[name='filter-adults']"),h=i.querySelector("input[name='filter-children']");if(o.guests.adults||o.guests.children){const d=[];o.guests.adults&&d.push(`Взрослых: ${o.guests.adults}`),o.guests.children&&d.push(`детей: ${o.guests.children}`),m.textContent=d.join("; ")}const g=i.querySelector("li"),u=i.querySelectorAll("li > div");l.addEventListener("click",d=>{d.stopPropagation(),e(),r.classList.toggle("is-open")}),i.addEventListener("click",d=>d.stopPropagation()),g.addEventListener("click",()=>{p.value="",h.value="",m.textContent="Любое к-ство",o.guests.adults=null,o.guests.children=null,_(o),w(),r.classList.remove("is-open")}),p.addEventListener("input",c),h.addEventListener("input",c),u.forEach(d=>{d.addEventListener("click",v=>{v.target.tagName!=="INPUT"&&r.classList.remove("is-open")})})}}const T=document.querySelector(".button-form-search-link");T&&T.addEventListener("click",async e=>{if(e.preventDefault(),w(),!window.location.pathname.endsWith("searchPage.html")){const r="/ClubTravel/";window.location.href=`${r}html/pages/searchPage.html`;return}const s=(await ee()).data,a=ne(s,o);_(o),console.log(a)});function ne(e,t){return e.filter(n=>{if(t.destination&&n.tour?.destination!==t.destination||t.days!==null&&n.tour_option?.days!==Number(t.days))return!1;if(t.date){const a=new Date(t.date),r=new Date(n.tour_option?.startDate),c=new Date(n.tour_option?.endDate);if(a<r||a>c)return!1}return!(t.guests.adults!==null&&n.tour_option?.adults<t.guests.adults||t.guests.children!==null&&n.tour_option?.children<t.guests.children||(t.meals.length||t.tourPackage.length||t.price.min!==null||t.price.max!==null)&&!n.hotel_options?.some(r=>!(t.meals.length&&!t.meals.includes(r.meals)||t.tourPackage.length&&!t.tourPackage.includes(r.tourPackage)||t.price.min!==null&&r.price<t.price.min||t.price.max!==null&&r.price>t.price.max))||t.category.length&&!t.category.includes(n.category)||t.departureCity.length&&!t.departureCity.includes(n.tour_option?.departureCity)||t.regions.length&&!t.regions.includes(n.region))})}const x=document.querySelector(".filter__extended-btn"),E=document.querySelector(".filter__extended-info");if(x&&E){x.addEventListener("click",()=>{x.classList.add("filter__extended-is-hidden"),E.classList.remove("filter__extended-is-hidden"),ae(),re(),se()});const e=E.querySelector(".filter__extended-info-title-close");e&&e.addEventListener("click",()=>{E.classList.add("filter__extended-is-hidden"),x.classList.remove("filter__extended-is-hidden")})}function re(){const e=document.querySelector(".filter-price-list");if(e){let t=function(){const f=d(g),L=d(u);c.style.left=`${f}%`,l.style.left=`${L}%`,r.style.left=`${f}%`,r.style.right=`${100-L}%`,i.textContent=`${g}€`,m.textContent=`${u}€`},n=function(f,L){const P=a.getBoundingClientRect(),M=j=>{let C=(j.clientX-P.left)/P.width*100;C=Math.max(0,Math.min(100,C));const k=v(C);L?g=Math.min(k,u):u=Math.max(k,g),t(),s()},F=()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",F)};document.addEventListener("mousemove",M),document.addEventListener("mouseup",F)},s=function(){g===p&&u===h?(o.price.min=null,o.price.max=null):(o.price.min=g,o.price.max=u),_(o),w()};const a=e.querySelector(".filter-price-slider"),r=e.querySelector(".filter-price-range"),c=e.querySelector(".filter-price-thumb.left"),l=e.querySelector(".filter-price-thumb.right"),i=e.querySelector("#minPrice"),m=e.querySelector("#maxPrice"),p=200,h=3e3;let g=200,u=3e3;o.price.min!==null&&(g=o.price.min),o.price.max!==null&&(u=o.price.max);const d=f=>(f-p)/(h-p)*100,v=f=>Math.round(p+f/100*(h-p));c.addEventListener("mousedown",f=>n(f,!0)),l.addEventListener("mousedown",f=>n(f,!1)),t()}}let b=null;function se(){const e=document.querySelector('[data-extended="regions"]');if(!e)return;const t=e.querySelector(".filter__extended-info-list-column-list"),n=e.querySelector(".filter__extended-info-list-column-hint");let s=[];b=async function(a){if(t.innerHTML="",H(),!a){n.classList.remove("is-hidden"),n.textContent="Выберите сначала направление";return}s.length||(s=await Q());const r=s.find(i=>i.destination===a);n.classList.add("is-hidden");const c=r.regions.map(i=>`
  <li class="filter__extended-info-list-column-list-item" data-value="${i}">
    <svg class="filter__extended-info-list-column-list-item-check">
      <use href="${B}#icon-check-circle"></use>
    </svg>
    ${i}
  </li>
`).join("");t.innerHTML=c;const l=o.regions||[];t.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(i=>{l.includes(i.dataset.value)&&i.classList.add("is-active")})},b(o.destination)}function ae(){document.querySelectorAll(".filter__extended-categoties").forEach(t=>{const n=t.dataset.extended,s=t.querySelector(".filter__extended-info-list-column-list");if(!s)return;const a=o[n]||[];s.querySelectorAll(".filter__extended-info-list-column-list-item").forEach(r=>{a.includes(r.dataset.value)&&r.classList.add("is-active")}),s.addEventListener("click",r=>{const c=r.target.closest(".filter__extended-info-list-column-list-item");if(!c)return;const l=c.dataset.value;if(!l)return;const i=o[n];i.includes(l)?(o[n]=i.filter(m=>m!==l),c.classList.remove("is-active")):(o[n].push(l),c.classList.add("is-active")),_(o),w(),H()})})}const q=document.querySelector(".filter__extended-info-active-filter"),oe=["category","meals","tourPackage","departureCity","regions"],ie={category:"Категория размещения",meals:"Питание",tourPackage:"Состав тура",departureCity:"Вылет из",regions:"Регионы"},D={category:{Budget:"2 звезды",Economy:"3 звезды",Standard:"4 звезды",Comfort:"5 звезд",Apartments:"Апартаменты"},meals:{no_meals:"Без питания",breakfast:"Завтрак",breakfast_dinner:"Затрак и ужин",full_board:"Завтрак, обед, ужин",all_inclusive:"Всё включено",ultra_all_inclusive:"Ультра: всё включено"},tourPackage:{package:"Туристический пакет",flight_only:"Только перелет"},departureCity:{tallinn:"Таллин",riga:"Рига",vilnius:"Вильнюс"},regions:{}};function H(){if(!q)return;q.innerHTML="";const e=oe.map(t=>{const n=o[t];return!Array.isArray(n)||n.length===0?"":(n.map(s=>`<li>${D[t]?.[s]||s}</li>`).join(""),`
        <div class="filter__extended-info-active-filter-item">
          <span class="filter__extended-info-active-filter-item-title">
            ${ie[t]}:
          </span>
          <ul class="filter__extended-info-active-filter-item-values">
            ${n.map(s=>`<li>${D[t]?.[s]||s}</li>`).join("")}
          </ul>
        </div>
      `)}).join("");q.innerHTML=e}function _(e){const t=new URLSearchParams;e.destination&&t.set("destination",e.destination),e.days&&t.set("days",e.days),e.date&&t.set("date",e.date),e.guests.adults!==null&&t.set("adults",e.guests.adults),e.guests.children!==null&&t.set("children",e.guests.children),["category","meals","tourPackage","departureCity","regions"].forEach(s=>{e[s].length&&t.set(s,e[s].join(","))}),e.price.min!==null&&t.set("priceMin",e.price.min),e.price.max!==null&&t.set("priceMax",e.price.max);const n=`${window.location.pathname}?${t.toString()}`;window.history.replaceState({},"",n)}function ce(){const e=new URLSearchParams(window.location.search);o.destination=e.get("destination")||"",o.days=e.get("days"),o.date=e.get("date"),o.guests.adults=e.get("adults")?Number(e.get("adults")):null,o.guests.children=e.get("children")?Number(e.get("children")):null,["category","meals","tourPackage","departureCity","regions"].forEach(t=>{const n=e.get(t);o[t]=n?n.split(","):[]}),o.price.min=e.get("priceMin")?Number(e.get("priceMin")):null,o.price.max=e.get("priceMax")?Number(e.get("priceMax")):null}function w(){localStorage.setItem("filtersState",JSON.stringify(o))}async function O(){const{data:e}=await y.get("/news-homes",{params:{populate:{images:!0},sort:["publishedAt:desc"]}});return e.data}function le(e){const t=document.querySelector(".news-page__slider-wrapper");t&&(t.innerHTML="",e.forEach(n=>{const{title:s,price:a,date:r,images:c}=n,l=c?.url??"",i=document.createElement("div");i.className="news-home__card",i.innerHTML=`
      <div class="news-home__image">
        <img src="${l}" alt="${s}" />

        ${a?`<p class="news-home__price">от <span>${a}</span></p>`:""}

        ${r?`
            <div class="news-home__date-wrapper">
              <svg width="16" height="16">
                <use href="${B}#icon-clock"></use>
              </svg>
              <p>${de(r)}</p>
            </div>
            `:""}
      </div>

      <div class="news-home__content">
        <p class="news-home__title-card">${s}</p>
      </div>
    `,t.appendChild(i)}))}function de(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await O();le(e)});N.use([J]);function ue(){document.querySelectorAll("[data-swiper]").forEach(e=>{if(e.swiper)return;const t=e.closest(".news-home__slider-wrapper");if(!t)return;const n=t.querySelector(".news-home__button-prev"),s=t.querySelector(".news-home__button-next");new N(e,{slidesPerView:1,spaceBetween:16,speed:600,navigation:{prevEl:n,nextEl:s},breakpoints:{768:{slidesPerView:2,spaceBetween:20},1024:{slidesPerView:3,spaceBetween:27}}})})}function me(){const e=document.querySelector(".news-home__slider-wrapper");if(!e)return null;const t=e.querySelector(".news-home__button-prev"),n=e.querySelector(".news-home__button-next");if(!t||!n)return null;const s=document.createElement("div");return s.className="swiper news-home__swiper",s.setAttribute("data-swiper",""),s.innerHTML=`
    <div class="swiper-wrapper"></div>
  `,e.insertBefore(s,n),s.querySelector(".swiper-wrapper")}function pe(e){const t=me();t&&e.forEach(n=>{const{title:s,price:a,date:r,images:c}=n,l=c?.url,i=document.createElement("div");i.className="swiper-slide",i.innerHTML=`
      <div class="news-home__card">
        <div class="news-home__image">
          <img src="${l}" alt="${s}" />

          ${a?`<p class="news-home__price">от <span>${a}</span></p>`:""}

          ${r?`
              <div class="news-home__date-wrapper">
                <svg width="16" height="16">
                  <use href="./img/sprite.svg#icon-clock"></use>
                </svg>
                <p>${ge(r)}</p>
              </div>
              `:""}
        </div>

        <div class="news-home__content">
          <p class="news-home__title-card">${s}</p>
        </div>
      </div>
    `,t.appendChild(i)})}function ge(e){return new Date(e).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}document.addEventListener("DOMContentLoaded",async()=>{const e=await O();pe(e),ue()});async function fe(e,t){return(await y.post("/auth/local/register",{username:e,email:e,password:t})).data}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("registerForm");if(!e)return;const t=new I("#registerForm",{errorFieldCssClass:"is-error",errorLabelCssClass:"login__error",focusInvalidField:!0,lockForm:!0});t.addField('[name="email"]',[{rule:"required",errorMessage:"Введите e-mail"},{rule:"email",errorMessage:"Некорректный e-mail"}]).addField('[name="password"]',[{rule:"required",errorMessage:"Введите пароль"},{rule:"minLength",value:8,errorMessage:"Минимум 8 символов"},{validator:n=>/[A-Za-z]/.test(n)&&/\d/.test(n),errorMessage:"Пароль должен содержать букву и цифру"}]).addField('[name="passwordRepeat"]',[{rule:"required",errorMessage:"Повторите пароль"},{validator:(n,s)=>n===s['[name="password"]'].elem.value,errorMessage:"Пароли не совпадают"}]).onSuccess(async n=>{n.preventDefault();const s=e.email.value.trim(),a=e.password.value;try{const r=await fe(s,a);localStorage.setItem("jwt",r.jwt),window.location.replace("/ClubTravel/html/pages/accountPage.html")}catch(r){const c=r.response?.data?.error?.message||"Ошибка регистрации";t.showErrors({'[name="email"]':c})}})});async function he(e){return(await y.post("/auth/forgot-password",{email:e})).data}const $=document.getElementById("forgotForm");$&&$.addEventListener("submit",async e=>{e.preventDefault();try{await he($.email.value),$.reset(),alert("Письмо отправлено")}catch{alert("Ошибка")}});
