// Formas de los datos (solo documentación JSDoc; este archivo no ejecuta nada).

/**
 * Pieza única a la venta: una maceta Moll3D con su planta de Valles, tal como sale en la foto.
 * @typedef {Object} Producto
 * @property {string} id         Identificador para la URL (#/producto/<id>).
 * @property {"sansevieria"|"haworthia"|"pothos"} grupo  Filtro de la tienda.
 * @property {string} planta     Nombre de la planta.
 * @property {string} maceta     Modelo de maceta (Panal, Puntos, Huellitas, Escamas).
 * @property {string} color      Color de la maceta.
 * @property {string} foto       Número de la foto en img/foto-XX.jpg.
 * @property {number} precio     Precio en pesos colombianos.
 * @property {string} luz        Necesidad de luz.
 * @property {string} riego      Frecuencia de riego.
 */

/**
 * El carrito guarda solo ids: cada pieza es única, así que no hay cantidades.
 * @typedef {string[]} Carrito
 */
