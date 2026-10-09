// Uso: node process.mjs <carpetaFotos> <carpetaSalida> <carpetaRecortes> [indices...]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { removeBackground } from "@imgly/background-removal-node";

import { pathToFileURL, fileURLToPath } from "node:url";
const MODEL_PATH = pathToFileURL(path.join(path.dirname(fileURLToPath(import.meta.url)), "node_modules/@imgly/background-removal-node/dist/")).href;
const [srcDir, outDir, cutDir, ...only] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(cutDir, { recursive: true });
const files = fs.readdirSync(srcDir).filter(f => /\.jpe?g$/i.test(f)).sort();

const W = 960, H = 1200, TABLE = 800;

// Vetas de madera: líneas finas onduladas con opacidad variable (semilla fija, mismo fondo en todas).
function grainLines() {
  let seed = 11, s = "";
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let y = TABLE + 6; y < H; y += 2 + rnd() * 5) {
    const amp = 1 + rnd() * 3, ph = rnd() * 6, op = (0.04 + rnd() * 0.12).toFixed(3), sw = (0.6 + rnd() * 1.6).toFixed(2);
    let d = `M0 ${y.toFixed(1)}`;
    for (let x = 0; x <= W; x += 40) d += ` L${x} ${(y + amp * Math.sin(x / 140 + ph)).toFixed(1)}`;
    s += `<path d="${d}" stroke="${rnd() > 0.3 ? "#5A3519" : "#E8C9A0"}" stroke-opacity="${op}" stroke-width="${sw}" fill="none"/>`;
  }
  return s;
}

// Fondo: pared cálida con luz de ventana y superficie de mesa de noche en madera.
const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F2EADF"/><stop offset="1" stop-color="#E3D5C2"/>
    </linearGradient>
    <radialGradient id="light" cx="0.28" cy="0.22" r="0.75">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.55"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#C49A6C"/><stop offset="1" stop-color="#9C714A"/>
    </linearGradient>
    <linearGradient id="woodLight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.18"/><stop offset="0.6" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.09" numOctaves="3" seed="4"/>
      <feColorMatrix values="0 0 0 0 0.32  0 0 0 0 0.19  0 0 0 0 0.09  0 0 0 0.55 -0.12"/>
    </filter>
    <filter id="soft"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="${W}" height="${TABLE}" fill="url(#wall)"/>
  <rect width="${W}" height="${TABLE}" fill="url(#light)"/>
  <polygon points="560,0 900,0 760,${TABLE} 420,${TABLE}" fill="#FFFFFF" opacity="0.12" filter="url(#soft)"/>
  <rect y="${TABLE}" width="${W}" height="${H - TABLE}" fill="url(#wood)"/>
  ${grainLines()}
  <rect y="${TABLE}" width="${W}" height="${H - TABLE}" fill="url(#woodLight)"/>
  <rect y="${TABLE}" width="${W}" height="3" fill="#E2C49D" opacity="0.8"/>
  <rect y="${TABLE + 3}" width="${W}" height="10" fill="#000000" opacity="0.06"/>
</svg>`);

const shadowSvg = (cx, by, w) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <filter id="b1"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="b2"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <ellipse cx="${cx + w * 0.1}" cy="${by + 6}" rx="${w * 0.7}" ry="${w * 0.12}" fill="#3A2412" opacity="0.42" filter="url(#b1)"/>
  <ellipse cx="${cx}" cy="${by}" rx="${w * 0.54}" ry="${w * 0.05}" fill="#2A1A0C" opacity="0.55" filter="url(#b2)"/>
</svg>`);

for (let i = 0; i < files.length; i++) {
  if (only.length && !only.includes(String(i))) continue;
  const name = String(i).padStart(2, "0");
  const input = fs.readFileSync(path.join(srcDir, files[i]));
  const blob = await removeBackground(new Blob([input], { type: "image/jpeg" }), { publicPath: MODEL_PATH, model: "medium", output: { format: "image/png" } });
  const cut = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(path.join(cutDir, `${name}.png`), cut);

  // Limpiar el borde (quita restos semitransparentes del fondo) y recortar al sujeto,
  // ignorando filas y columnas con solo unos pocos píxeles sueltos.
  const raw = await sharp(cut).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: rw, height: rh } = raw.info, px = raw.data;
  for (let k = 3; k < px.length; k += 4) px[k] = Math.max(0, Math.min(255, (px[k] - 70) * 1.45));
  const rowCount = new Array(rh).fill(0), colCount = new Array(rw).fill(0);
  for (let y = 0; y < rh; y++) for (let x = 0; x < rw; x++) if (px[(y * rw + x) * 4 + 3] > 128) { rowCount[y]++; colCount[x]++; }
  const minRow = Math.max(6, rw * 0.02), minCol = 4;
  const y0 = rowCount.findIndex(c => c >= minCol), y1 = rh - 1 - [...rowCount].reverse().findIndex(c => c >= minRow);
  const x0 = colCount.findIndex(c => c >= minCol), x1 = rw - 1 - [...colCount].reverse().findIndex(c => c >= minCol);
  const tw = x1 - x0 + 1, th = y1 - y0 + 1;
  const clean = await sharp(px, { raw: { width: rw, height: rh, channels: 4 } }).extract({ left: x0, top: y0, width: tw, height: th }).png().toBuffer();
  const scale = Math.min((H * 0.66) / th, (W * 0.78) / tw);
  const sw = Math.round(tw * scale), sh = Math.round(th * scale);
  const subject = await sharp(clean)
    .resize(sw, sh, { kernel: "lanczos3" })
    .modulate({ brightness: 1.04, saturation: 1.1 })
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 2.2 })
    .png().toBuffer();

  // Ancho de la base: filas inferiores con píxeles opacos.
  const { data: a, info } = await sharp(subject).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, maxX = 0;
  for (let y = info.height - 12; y < info.height; y++) for (let x = 0; x < info.width; x++) if (a[y * info.width + x] > 128) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); }
  const baseW = maxX > minX ? maxX - minX : sw * 0.5;

  const bottom = TABLE + 210, left = Math.round((W - sw) / 2), top = bottom - sh;
  const cx = left + (minX + maxX) / 2;
  await sharp(background)
    .composite([
      { input: shadowSvg(cx, bottom, baseW), top: 0, left: 0 },
      { input: subject, top, left }
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, `foto-${name}.jpg`));
  console.log(`${name} ok  ${files[i]}`);
}
