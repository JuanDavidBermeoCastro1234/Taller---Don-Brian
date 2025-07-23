const fs = require('fs/promises');
const inquirer = require('inquirer');
const path = require('path');

const RUTA = path.join(__dirname, '../data/tareas.json'); // asegúrate de que existe este archivo

// Leer tareas desde el archivo JSON
async function leerTareas() {
  try {
    const data = await fs.readFile(RUTA, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return []; // si el archivo está vacío o no existe
  }
}

// Guardar tareas en el archivo JSON
async function guardarTareas(tareas) {
  await fs.writeFile(RUTA, JSON.stringify(tareas, null, 2));
}

// Agregar tarea
async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  const tareas = await leerTareas();

  const nueva = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false
  };

  tareas.push(nueva);
  await guardarTareas(tareas);
  console.log('✅ Tarea agregada.');
}

// Listar tareas
async function listarTareasFiltradas() {
  const tareas = await leerTareas();
  if (tareas.length === 0) return console.log('📭 No hay tareas registradas.');

  const { filtro } = await inquirer.prompt([
    {
      type: 'list',
      name: 'filtro',
      message: '¿Qué tareas quieres ver?',
      choices: [
        { name: '📋 Todas', value: 'todas' },
        { name: '✅ Completadas', value: 'completadas' },
        { name: '❌ Pendientes', value: 'pendientes' }
      ]
    }
  ]);

  const filtradas = tareas.filter(t =>
    filtro === 'todas' ? true :
    filtro === 'completadas' ? t.completada :
    !t.completada
  );

  if (filtradas.length === 0) {
    return console.log(`⚠️ No hay tareas ${filtro}.`);
  }

  console.log(`\n📋 Tareas (${filtro}):`);
  filtradas.forEach((t, i) => {
    const estado = t.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${t.descripcion}`);
  });
}


// Editar tarea
async function editarTarea() {
  const tareas = await leerTareas();
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para marcar como completada:',
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion} (${t.completada ? '✅' : '❌'})`,
        value: i
      }))
    }
  ]);

  tareas[indice].completada = true;
  await guardarTareas(tareas);
  console.log('✅ Tarea marcada como completada.');
}

// Eliminar tarea
async function eliminarTarea() {
  const tareas = await leerTareas();
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: `${t.descripcion}`,
        value: i
      }))
    }
  ]);

  tareas.splice(indice, 1);
  await guardarTareas(tareas);
  console.log('🗑️ Tarea eliminada.');
}

// Exportar todo
module.exports = {
  agregarTarea,
  listarTareasFiltradas,
  editarTarea,
  eliminarTarea
};


