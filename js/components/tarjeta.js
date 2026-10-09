(() => {
  const { esc, dinero, fotoHTML } = App.utils;
  const enlace = (p) => `#/producto/${encodeURIComponent(p.id)}`;

  /** Tarjeta de la tienda: foto cuadrada, precio, nombre, maceta y botón. */
  App.ui.tarjeta = (p) => `
    <article class="tarjeta">
      <a class="tarjeta__foto" href="${enlace(p)}" tabindex="-1" aria-hidden="true">${fotoHTML(p)}<span class="insignia">Foto real</span></a>
      <div class="tarjeta__cuerpo">
        <span class="tarjeta__precio">${dinero(p.precio)}</span>
        <h3><a href="${enlace(p)}">${esc(p.planta)}</a></h3>
        <p class="tarjeta__maceta">Maceta ${esc(p.maceta)} ${esc(p.color.toLowerCase())}</p>
        ${App.ui.botonAgregar(p, "btn--chico btn--ancho")}
      </div>
    </article>`;

  /** Botón que cambia a "En tu carrito" si la pieza ya está agregada. */
  App.ui.botonAgregar = (p, clase = "") => App.store.tiene(p.id)
    ? `<button class="btn btn--borde ${clase}" type="button" data-abrir-carrito>En tu carrito</button>`
    : `<button class="btn ${clase}" type="button" data-agregar="${esc(p.id)}">Agregar al carrito</button>`;
})();
