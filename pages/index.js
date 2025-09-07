import { Header } from "../components/header.js";
import { Form } from "../components/form.js";
import { Footer } from "../components/footer.js";

const SPACE_ID = "wxwtibtv7gpf";
const ENV = "master";
const TOKEN = "BH9N4Y9bCuqMlFBJX_ir-dFJaK2vHRCJrCxoAi1OBJw";

const UrlPres =
  `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries` +
  `?access_token=${TOKEN}&content_type=presentacion&include=1`;

const UrlHero =
  `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries` +
  `?access_token=${TOKEN}&content_type=hero&include=1`;

async function getSobreMi() {
  const res = await fetch(UrlPres);
  const data = await res.json();
  const item = data.items[0];

  renderSobreMi(item, data.includes);
}

async function getHero() {
  const res = await fetch(UrlHero);
  const data = await res.json();
  const item = data.items[0];
  renderHero(item);
}

function renderSobreMi(item, includes) {
  document.querySelector('[data-cms = "presentacion.titulo"]').textContent =
    item.fields.titulo || "";
  document.querySelector('[data-cms="presentacion.descripcion"]').textContent =
    item.fields.descripcion || "";

  const imgEl = document.querySelector('[data-cms-img="presentacion.foto"]');
  const imgId = item.fields.foto?.sys?.id;
  const asset = includes?.Asset?.find((a) => a.sys.id === imgId);
  const url = asset?.fields?.file?.url;
  if (imgEl && url) {
    imgEl.src = url.startsWith("http") ? url : `https:${url}`;
  }
}

function renderHero(item) {
  const el = document.querySelector('[data-cms="hero.nombre"]');
  if (el) {
    el.textContent = item.fields.nombre || "";
  }
}

(function main() {
  const mount = (sel, factory) => {
    const anchor = document.querySelector(sel);
    if (anchor) anchor.replaceWith(factory());
  };

  mount("#mount-header", Header);
  mount("#mount-form", Form);
  mount("#mount-footer", Footer);

  getSobreMi();
  getHero();
})();
