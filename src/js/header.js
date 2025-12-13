import Handlebars from "handlebars/dist/handlebars.js";
import headerPartial from "../pages/layout/header.hbs?raw";
import { headerData } from "./headerData.js";

Handlebars.registerPartial("header", headerPartial);

window.addEventListener("DOMContentLoaded", () => {
  const html = document.body.innerHTML;
  const template = Handlebars.compile(html);
  const rendered = template({ headerData });
  document.body.innerHTML = rendered;
});
