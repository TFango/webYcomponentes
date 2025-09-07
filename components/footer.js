export function Footer() {
  const el = document.createElement("footer");

  el.className = "footer";
  el.innerHTML = `<div class="footer__content">
          <img src="./assets/img/logopag.png" alt="" class="logo" />

          <div class="footer__nav">
            <a href="./index.html" class="footer__link"
              ><img
                class="footer__logo"
                src="./assets/img/home.svg"
                alt=""
              />Home</a
            >
            <a href="./servicios.html" class="footer__link"
              ><img
                class="footer__logo"
                src="./assets/img/user.svg"
                alt=""
              />Servicios</a
            >
            <a href="./contacto.html" class="footer__link"
              ><img
                class="footer__logo"
                src="./assets/img/phone.svg"
                alt=""
              />Contacto</a
            >
          </div>
          <div class="footer__links">
            <a href=""><img src="./assets/img/linkedin.svg" alt="" /></a>
            <a href=""><img src="./assets/img/github.svg" alt="" /></a>
            <a href=""><img src="./assets/img/twitter.svg" alt="" /></a>
          </div>

          <p class="footer__copy">
            © 2025 Mi sitio web. Todos los derechos reservados.
          </p>
        </div>`;

  return el;
}
