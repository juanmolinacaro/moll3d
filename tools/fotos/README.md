# Procesar fotos nuevas

Quita el fondo de las fotos del celular y las pone sobre una mesa de madera con pared cálida (960×1200).
Esta carpeta no se publica en Vercel (ver `.vercelignore`).

```bash
cd moll3d/tools/fotos
npm install @imgly/background-removal-node@1.4.5 sharp@0.33.5
node procesar.mjs "C:/Users/juanm/Pictures/imagenes moll3d" ../../img ./recortes 23 24
```

Los números al final son los índices de las fotos (orden alfabético) a procesar; sin números procesa todas.
Revisa cada resultado: en macetas blancas contra el cielo el recorte a veces borra parte de la maceta.
`extra/` guarda fotos ya procesadas que no están en la tienda.
