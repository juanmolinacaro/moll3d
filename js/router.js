// Router por hash: funciona igual abriendo index.html con doble clic y en Vercel.
//   #/                  inicio
//   #/tienda, #/valles, #/como-pedir, #/preguntas   inicio + desplazar a esa sección
//   #/producto/<id>     ficha de producto
(() => {
  const inicio = document.getElementById("vista-inicio");
  const producto = document.getElementById("vista-producto");
  const SECCIONES = ["tienda", "valles", "como-pedir", "preguntas"];
  const tituloBase = document.title;

  function ir() {
    const [ruta, param] = location.hash.replace(/^#\/?/, "").split("/");

    if (ruta === "producto" && param) {
      inicio.hidden = true;
      producto.hidden = false;
      App.pages.producto.montar(decodeURIComponent(param));
      window.scrollTo(0, 0);
      return;
    }

    producto.hidden = true;
    inicio.hidden = false;
    document.title = tituloBase;
    if (SECCIONES.includes(ruta)) document.getElementById(ruta).scrollIntoView();
    else window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", ir);
  // Un clic en el enlace de la ruta actual no dispara hashchange: lo forzamos.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); ir(); }
  });

  App.router = { ir };
})();
