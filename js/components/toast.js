(() => {
  let temporizador;
  App.ui.toast = (mensaje) => {
    const el = document.getElementById("toast");
    el.textContent = mensaje;
    el.hidden = false;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => { el.hidden = true; }, 2600);
  };
})();
