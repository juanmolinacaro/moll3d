// Ficha de una pieza: #/producto/<id>
(() => {
  const { data, ui, utils, store } = App;
  const { esc } = utils;
  const vista = document.getElementById("vista-producto");
  let actual = null;

  function pintar() {
    const p = actual && data.porId(actual);
    if (!p) {
      vista.innerHTML = `<div class="wrap seccion intro"><h1>Esta pieza ya no está disponible</h1>
        <p>Puede que ya se haya vendido. Mira las piezas que quedan en la tienda.</p>
        <a class="btn" href="#/tienda" style="justify-self:start">Ver la tienda</a></div>`;
      return;
    }
    const pregunta = `Hola ${App.config.marca}, me interesa la ${utils.nombreCompleto(p)}. ¿Sigue disponible?`;
    const otras = data.productos.filter((x) => x.id !== p.id).slice(0, 4);
    vista.innerHTML = `
      <div class="wrap">
        <a class="enlace ficha__volver" href="#/tienda">Volver a la tienda</a>
        <div class="ficha__cuerpo">
          ${utils.fotoHTML(p, { lazy: false })}
          <div class="ficha__info">
            <h1>${esc(p.planta)}</h1>
            <p class="suave">Maceta ${esc(p.maceta)} ${esc(p.color.toLowerCase())}, impresa en 3D por Moll3D, con planta de ${esc(App.config.vivero)}. Es una pieza única: recibes exactamente la de la foto.</p>
            <p class="ficha__precio">${utils.dinero(p.precio)}</p>
            <dl class="ficha__cuidados">
              <dt>Luz</dt><dd>${esc(p.luz)}</dd>
              <dt>Riego</dt><dd>${esc(p.riego)}</dd>
              <dt>Maceta</dt><dd>PLA con drenaje y plato</dd>
            </dl>
            <div class="ficha__acciones">
              ${ui.botonAgregar(p)}
              <a class="btn btn--borde" href="${utils.whatsapp(pregunta)}" target="_blank" rel="noopener">Preguntar por WhatsApp</a>
            </div>
          </div>
        </div>
        <div class="ficha__otras">
          <h2>Otras piezas</h2>
          <div class="rejilla">${otras.map(ui.tarjeta).join("")}</div>
        </div>
      </div>`;
    document.title = `${p.planta} en maceta ${p.maceta} | ${App.config.marca}`;
  }

  function montar(id) { actual = id; pintar(); }

  store.suscribir(() => { if (!vista.hidden) pintar(); });
  App.pages.producto = { montar };
})();
