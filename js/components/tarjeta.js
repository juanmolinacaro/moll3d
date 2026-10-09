(() => {
  const { esc, dinero, fotoHTML } = App.utils;
  const enlace = (p) => `#/producto/${encodeURIComponent(p.id)}`;

  /** Tarjeta de la tienda: foto, nombre, maceta, precio y botón. */
  App.ui.tarjeta = (p) => `
    <article class="tarjeta">
      <a class="tarjeta__foto" href="${enlace(p)}" tabindex="-1" aria-hidden="true">${fotoHTML(p)}</a>
      <div class="tarjeta__fila">
        <h3><a href="${enlace(p)}">${esc(p.planta)}</a></h3>
        <span class="tarjeta__precio">${dinero(p.precio)}</span>
      </div>
      <p class="tarjeta__maceta">Maceta ${esc(p.maceta)} ${esc(p.color.toLowerCase())}</p>
      ${App.ui.botonAgregar(p, "btn--chico")}
    </article>`;

  /** Botón que cambia a "En tu carrito" si la pieza ya está agregada. */
  App.ui.botonAgregar = (p, clase = "") => App.store.tiene(p.id)
    ? `<button class="btn btn--borde ${clase}" type="button" data-abrir-carrito>En tu carrito</button>`
    : `<button class="btn ${clase}" type="button" data-agregar="${esc(p.id)}">Agregar al carrito</button>`;

  /** Etiqueta de vivero: el elemento visual de la marca. */
  App.ui.etiqueta = (p, { comoEnlace = false } = {}) => {
    const tag = comoEnlace ? "a" : "div";
    const href = comoEnlace ? ` href="${enlace(p)}"` : "";
    return `<${tag} class="etiqueta"${href}>
      <span class="etiqueta__nombre">${esc(p.planta)}</span>
      <span class="etiqueta__maceta">Maceta ${esc(p.maceta)} ${esc(p.color.toLowerCase())}</span>
      <span class="etiqueta__precio">${dinero(p.precio)}</span>
      <span class="etiqueta__maceta">Pieza única</span>
    </${tag}>`;
  };
})();
