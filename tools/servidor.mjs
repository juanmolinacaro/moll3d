// Servidor estático mínimo para vista previa: node servidor.mjs <carpeta> <puerto>
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const [raiz, puerto = 5500] = process.argv.slice(2);
const tipos = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".jpg": "image/jpeg", ".json": "application/json", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let archivo = path.join(raiz, ruta === "/" ? "index.html" : ruta);
  if (!archivo.startsWith(path.resolve(raiz))) { res.writeHead(403).end(); return; }
  fs.readFile(archivo, (err, data) => {
    if (err) { res.writeHead(404).end("404"); return; }
    res.writeHead(200, { "Content-Type": tipos[path.extname(archivo)] || "application/octet-stream", "Cache-Control": "no-store" }).end(data);
  });
}).listen(puerto, () => console.log("listo en", puerto));
