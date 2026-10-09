(() => {
  const { config } = App;

  /** Escapa texto para insertarlo en innerHTML. */
  const esc = (valor) => String(valor).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** 45000 → "$45.000" */
  const dinero = (n) => "$" + n.toLocaleString(config.locale);

  /** Lee JSON de localStorage; si falla (modo privado, bloqueado) devuelve el valor por defecto. */
  const leer = (clave, porDefecto) => {
    try { const v = localStorage.getItem(clave); return v ? JSON.parse(v) : porDefecto; } catch (e) { return porDefecto; }
  };
  const guardar = (clave, valor) => {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin persistencia: la app sigue funcionando */ }
  };

  /** Enlace de WhatsApp con el mensaje ya escrito. */
  const whatsapp = (texto) => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(texto)}`;

  const nombreCompleto = (p) => `${p.planta} en maceta ${p.maceta} ${p.color.toLowerCase()}`;

  const fotoHTML = (p, { lazy = true } = {}) =>
    `<img src="img/foto-${esc(p.foto)}.jpg" alt="${esc(nombreCompleto(p))}" width="960" height="1200"${lazy ? ' loading="lazy"' : ""}>`;

  App.utils = { esc, dinero, leer, guardar, whatsapp, nombreCompleto, fotoHTML };
})();
