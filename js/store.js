// Estado del carrito: lista de ids de piezas únicas, guardada en localStorage.
(() => {
  const { config, utils, data } = App;
  /** @type {Carrito} */
  let ids = utils.leer(config.claveCarrito, []).filter((id) => data.porId(id));
  const oyentes = new Set();

  const avisar = () => { utils.guardar(config.claveCarrito, ids); oyentes.forEach((fn) => fn()); };

  App.store = {
    productos: () => ids.map(data.porId),
    tiene: (id) => ids.includes(id),
    cantidad: () => ids.length,
    total: () => ids.reduce((suma, id) => suma + data.porId(id).precio, 0),
    /** @returns {boolean} false si la pieza ya estaba en el carrito */
    agregar(id) {
      if (ids.includes(id) || !data.porId(id)) return false;
      ids = [...ids, id]; avisar(); return true;
    },
    quitar(id) { ids = ids.filter((x) => x !== id); avisar(); },
    vaciar() { ids = []; avisar(); },
    suscribir(fn) { oyentes.add(fn); return () => oyentes.delete(fn); }
  };
})();
