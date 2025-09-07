export function Form() {
  const el = document.createElement("section");

  el.className = "escribeme";
  el.id = "contacto";
  el.innerHTML = `
        <div class="escribeme__content">
          <h2 class="escribeme__title">Escribeme</h2>

          <form class="form" action="#" method="post">
            <!-- NOMBRE -->
            <div class="form__group">
              <label class="form__label" for="nombre">Nombre</label>
              <input class="form__input" name="nombre" type="text" placeholder="Tu nombre" required/>
            </div>

            <!-- Email -->
            <div class="form__group">
              <label class="form__label form__label-email" for="email">Email</label>
              <input
                class="form__input"
                name="email"
                type="email"
                placeholder="tu@mail.com"
                required
              />
            </div>

            <!-- Mensaje-->
            <div class="form__group">
              <label class="form__label" for="mensaje">Mensaje</label>
              <textarea class="form__textarea" name="mensaje"></textarea>
            </div>

            <button class="form__button" type="submit">
              Enviar
              <img class="form__logo" src="./assets/img/logoForm.svg" alt="" />
            </button>
          </form>
        </div>`;

  const formEl = el.querySelector(".form"); //Busca el elemento y lo guarda

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(formEl); //Forma comoda para ver lo que el usuario puso

    const nombre = formData.get("nombre");
    const email = formData.get("email");
    const mensaje = formData.get("mensaje");

    const data = {
      to: "jimenezfacundo128@gmail.com",
      message: `
            Nombre: ${nombre},
            Email: ${email},
            Mensaje: ${mensaje}
            `,
    };

    fetch("https://apx.school/api/utils/email-to-student", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Respuesta del server:", res);
        alert("¡Mensaje enviado!");
        formEl.reset();
      })
      .catch((err) => {
        console.log("Error enviando el mensaje:", err);
        alert("Hubo un problema al enviar el mensaje");
      });
  });

  return el;
}
