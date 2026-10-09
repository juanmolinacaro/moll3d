// Panel lateral del carrito y envío del pedido por WhatsApp.
(() => {
  const { utils, store, config } = App;
  const { esc, dinero, fotoHTML } = utils;
  const panel = document.getElementById("carrito");
  const velo = document.getElementById("velo");
  const items = document.getElementById("carrito-items");
  const pie = document.getElementById("carrito-pie");
  const contador = document.getElementById("contador");
  const botonAbrir = document.getElementById("abrir-carrito");

  const mensajePedido = () =>
    `Hola ${config.marca}, quiero hacer este pedido:\n` +
    store.productos().map((p) => `- ${utils.nombreCompleto(p)}: ${dinero(p.precio)}`).join("\n") +
    `\nTotal: ${dinero(store.total())} (sin envío)`;

  function pintar() {
    contador.textContent = store.cantidad();
    if (!store.cantidad()) {
      items.innerHTML = `<div class="carrito__vacio"><p>Tu carrito está esperando su primera planta. Elige una pieza en la tienda y aparecerá aquí.</p>
        <a class="btn btn--chico" href="#/tienda" data-cerrar-carrito>Ir a la tienda</a></div>`;
      pie.innerHTML = "";
      return;
    }
    items.innerHTML = store.productos().map((p) => `
      <div class="linea-carrito">
        ${fotoHTML(p)}
        <div><strong>${esc(p.planta)}</strong><small>Maceta ${esc(p.maceta)} ${esc(p.color.toLowerCase())}</small>
          <button class="enlace" type="button" data-quitar="${esc(p.id)}">Quitar</button></div>
        <span>${dinero(p.precio)}</span>
      </div>`).join("");
    pie.innerHTML = `
      <div class="carrito__total"><span>Total</span><span>${dinero(store.total())}</span></div>
      <p class="carrito__nota">El envío se calcula cuando confirmemos tu pedido. No cobramos nada antes de hablar contigo.</p>
      <a class="btn btn--ancho" href="${utils.whatsapp(mensajePedido())}" target="_blank" rel="noopener">Enviar pedido por WhatsApp</a>`;
  }

  function abrir() { panel.hidden = false; velo.hidden = false; panel.querySelector(".cerrar").focus(); }
  function cerrar() { panel.hidden = true; velo.hidden = true; botonAbrir.focus(); }

  botonAbrir.addEventListener("click", abrir);
  velo.addEventListener("click", cerrar);
  panel.addEventListener("click", (e) => {
    if (e.target.closest(".cerrar") || e.target.closest("[data-cerrar-carrito]")) cerrar();
    const quitar = e.target.closest("[data-quitar]");
    if (quitar) store.quitar(quitar.dataset.quitar);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) cerrar(); });

  // Botones "Agregar" y "En tu carrito" de cualquier página.
  document.addEventListener("click", (e) => {
    const agregar = e.target.closest("[data-agregar]");
    if (agregar) {
      const p = App.data.porId(agregar.dataset.agregar);
      if (store.agregar(p.id)) App.ui.toast(`Agregado: ${p.planta}`);
    }
    if (e.target.closest("[data-abrir-carrito]")) abrir();
  });

  store.suscribir(pintar);
  App.ui.carrito = { pintar, abrir, cerrar };
})();
