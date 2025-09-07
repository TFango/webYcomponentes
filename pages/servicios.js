import { Header } from "../components/header.js";
import { Form } from "../components/form.js";
import { Footer } from "../components/footer.js";

const SPACE_ID = "wxwtibtv7gpf";
const ENV = "master";
const TOKEN = "BH9N4Y9bCuqMlFBJX_ir-dFJaK2vHRCJrCxoAi1OBJw";

const URL =
  `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries` +
  `?access_token=${TOKEN}&content_type=servicio&include=1&order=fields.orden,sys.createdAt`;

function addServiceCard({ titulo, descripcion, imagen }) {
  const template = document.querySelector("#service-card-template");
  const container = document.querySelector("#services-grid");

  template.content.querySelector(".card__title").textContent = titulo || "";
  template.content.querySelector(".card__desc").textContent = descripcion || "";
  template.content.querySelector(".card__img").src = imagen || "";

  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getServicios() {
  return fetch(URL)
    .then((res) => res.json()) //Tranforma los datos de la API a json
    .then((data) => {
      //Trabajamos con el objeto

      const assetMap = new Map(data.includes.Asset.map((a) => [a.sys.id, a]));
      //La imagen estan en los asset. Cada asset tiene un sys con el id de la imagen

      return data.items.map((item) => {
        const f = item.fields; //Traer los compos de servicio
        const imgId = f.imagen?.sys?.id; //Se saca el id de la imagen referenciada
        const fileUrl = assetMap.get(imgId)?.fields?.file?.url || ""; //Trae la url cruda de la imagen
        return {
          titulo: f.titulo,
          descripcion: f.descripcion,
          imagen: fileUrl
            ? fileUrl.startsWith("http")
              ? fileUrl
              : `https:${fileUrl}`
            : "",
          //Si fileURl empieza con http lo deja asi, sino lo agrega
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

  getServicios().then((list) => list.forEach(addServiceCard));
})();
