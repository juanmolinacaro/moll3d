// Piezas únicas a la venta. Para añadir una: sube su foto a img/foto-XX.jpg y añade una línea aquí.
// Para quitar una vendida: borra su línea. Los precios son de ejemplo hasta tener los reales.

/** @type {Producto[]} */
App.data.productos = [
  { id: "hahnii-dorada-huellitas-negra", grupo: "sansevieria", planta: "Sansevieria Hahnii dorada", maceta: "Huellitas", color: "Negra",  foto: "07", precio: 45000, luz: "Media", riego: "Cada 2 a 3 semanas" },
  { id: "hahnii-verde-panal-blanca",     grupo: "sansevieria", planta: "Sansevieria Hahnii verde",  maceta: "Panal",     color: "Blanca", foto: "19", precio: 45000, luz: "Baja a media", riego: "Cada 2 a 3 semanas" },
  { id: "pothos-panal-negra",            grupo: "pothos",      planta: "Pothos",                    maceta: "Panal",     color: "Negra",  foto: "20", precio: 45000, luz: "Indirecta", riego: "Semanal" },
  { id: "hahnii-dorada-panal-blanca",    grupo: "sansevieria", planta: "Sansevieria Hahnii dorada", maceta: "Panal",     color: "Blanca", foto: "06", precio: 45000, luz: "Media", riego: "Cada 2 a 3 semanas" },
  { id: "hahnii-dorada-puntos-negra",    grupo: "sansevieria", planta: "Sansevieria Hahnii dorada", maceta: "Puntos",    color: "Negra",  foto: "08", precio: 45000, luz: "Media", riego: "Cada 2 a 3 semanas" },
  { id: "haworthia-puntos-blanca",       grupo: "haworthia",   planta: "Haworthia",                 maceta: "Puntos",    color: "Blanca", foto: "21", precio: 42000, luz: "Alta indirecta", riego: "Cada 2 semanas" },
  { id: "trifasciata-huellitas-blanca",  grupo: "sansevieria", planta: "Sansevieria trifasciata",   maceta: "Huellitas", color: "Blanca", foto: "10", precio: 42000, luz: "Baja a alta", riego: "Cada 2 a 3 semanas" },
  { id: "trifasciata-puntos-blanca",     grupo: "sansevieria", planta: "Sansevieria trifasciata",   maceta: "Puntos",    color: "Blanca", foto: "14", precio: 42000, luz: "Baja a alta", riego: "Cada 2 a 3 semanas" },
  { id: "trifasciata-panal-blanca",      grupo: "sansevieria", planta: "Sansevieria trifasciata",   maceta: "Panal",     color: "Blanca", foto: "16", precio: 42000, luz: "Baja a alta", riego: "Cada 2 a 3 semanas" },
  { id: "haworthia-cebra-escamas-blanca", grupo: "haworthia",  planta: "Haworthia cebra",           maceta: "Escamas",   color: "Blanca", foto: "12", precio: 39000, luz: "Alta indirecta", riego: "Cada 2 semanas" }
];

App.data.porId = (id) => App.data.productos.find((p) => p.id === id);
