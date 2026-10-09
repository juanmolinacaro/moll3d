// Vista de inicio: tienda con filtros. Las secciones fijas están en index.html.
(() => {
  const { data, ui, store } = App;
  const rejilla = document.getElementById("rejilla");
  const cuenta = document.getElementById("tienda-cuenta");
  const filtros = document.getElementById("filtros");
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

  const montar = pintarTienda;

  store.suscribir(pintarTienda);
  App.pages.inicio = { montar };
})();
