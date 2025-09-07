import { Header } from "../components/header.js";
import { Form } from "../components/form.js";
import { Footer } from "../components/footer.js"

(function main() {
  const mount = (sel, factory) =>{
    const anchor = document.querySelector(sel);
    if (anchor) anchor.replaceWith(factory());
  }

  mount("#mount-header", Header);
  mount("#mount-form", Form);
  mount("#mount-footer", Footer);
})();