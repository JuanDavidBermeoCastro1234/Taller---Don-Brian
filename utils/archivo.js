// utils/archivo.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RUTA = path.join(__dirname, '../data/tareas.json');

export async function leerTareas() {
  try {
    const data = await fs.readFile(RUTA, 'utf-8');
    return _.uniqBy(JSON.parse(data), 'descripcion');
  } catch {
    return [];
  }
}

export async function guardarTareas(tareas) {
  await fs.writeFile(RUTA, JSON.stringify(tareas, null, 2));
}
