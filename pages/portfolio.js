import { Header } from "../components/header.js";
import { Form } from "../components/form.js";
import { Footer } from "../components/footer.js";

const SPACE_ID = "wxwtibtv7gpf";
const ENV = "master";
const TOKEN = "BH9N4Y9bCuqMlFBJX_ir-dFJaK2vHRCJrCxoAi1OBJw";

const URL =
  `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries` +
  `?access_token=${TOKEN}&content_type=trabajo&include=1&order=fields.orden,sys.createdAt`;

function addWorkCard({ titulo, descripcion, imagen }) {
  const template = document.querySelector("#work-card-template");
  const container = document.querySelector("#work-grid");

  template.content.querySelector(".card__title").textContent = titulo || "";
  template.content.querySelector(".card__desc").textContent = descripcion || "";
  template.content.querySelector(".card__img").src = imagen || "";

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getTrabajo() {
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const assetMap = new Map(data.includes.Asset.map((a) => [a.sys.id, a]));

      return data.items.map((item) => {
        const f = item.fields;
        const imgId = f.fotoTrabajo?.sys?.id;
        const fileUrl = assetMap.get(imgId)?.fields?.file?.url || "";
        console.log(imgId);
        console.log("fileUrl:", fileUrl);

        return {
          titulo: f.titulo,
          descripcion: f.descripcion,
          imagen: fileUrl
            ? fileUrl.startsWith("http")
              ? fileUrl
              : `https:${fileUrl}`
            : "",
        };
      });
    });
}

(function main() {
  const mount = (sel, factory) => {
    const anchor = document.querySelector(sel);
    if (anchor) anchor.replaceWith(factory());
  };

  mount("#mount-header", Header);
  mount("#mount-form", Form);
  mount("#mount-footer", Footer);

  getTrabajo().then((list) => list.forEach(addWorkCard));
})();
