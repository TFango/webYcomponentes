export function Header() {
  const el = document.createElement("header");

  el.className = "header";
  el.innerHTML = `
      <div class="header__content">
        <img src="./assets/img/logopag.png" alt="" class="logo" />

        <div class="header__deskop">
          <nav class="header__deskop-nav">
            <ul class="header__deskop-list">
              <li><a href="./portfolio.html">Portfolio</a></li>
              <li><a href="./servicios.html">Servicios</a></li>
              <li><a href="./contacto.html">Contacto</a></li>
            </ul>
          </nav>
        </div>

        <button class="header__abre-ventana"></button>

        <div class="header__ventana">
          <button class="header__cerrar-ventana"></button>
          <nav class="header__nav">
            <ul class="header__list">
              <li><a href="">Portfolio</a></li>
              <li><a href="">Servicios</a></li>
              <li><a href="">Contacto</a></li>
            </ul>
          </nav>
        </div>
      </div>
`;

  const btnAbrir = el.querySelector(".header__abre-ventana");
  const ventana = el.querySelector(".header__ventana");
  const btnCerrar = el.querySelector(".header__cerrar-ventana");

  btnAbrir.addEventListener("click", () => {
    ventana.style.display = "inherit";
  });

  btnCerrar.addEventListener("click", () => {
    ventana.style.display = "";
  });


  return el;
}
