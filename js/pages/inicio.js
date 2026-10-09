// Vista de inicio: etiqueta del héroe y tienda con filtros. Las secciones fijas están en index.html.
(() => {
  const { data, ui, store } = App;
  const rejilla = document.getElementById("rejilla");
  const cuenta = document.getElementById("tienda-cuenta");
  const filtros = document.getElementById("filtros");
  const DESTACADO = "hahnii-dorada-huellitas-negra";
  let filtro = "todas";

  function pintarTienda() {
    const lista = data.productos.filter((p) => filtro === "todas" || p.grupo === filtro);
    cuenta.textContent = lista.length === 1 ? "1 pieza disponible" : `${lista.length} piezas disponibles`;
    rejilla.innerHTML = lista.map(ui.tarjeta).join("");
  }

  filtros.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-filtro]");
    if (!b) return;
    filtro = b.dataset.filtro;
    filtros.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    pintarTienda();
  });

  function montar() {
    const destacado = data.porId(DESTACADO) || data.productos[0];
    document.getElementById("heroe-etiqueta").innerHTML = destacado ? ui.etiqueta(destacado, { comoEnlace: true }) : "";
    pintarTienda();
  }

  store.suscribir(pintarTienda);
  App.pages.inicio = { montar };
})();
