// controllers/tareasController.js
import inquirer from 'inquirer';
import _ from 'lodash';
import { leerTareas, guardarTareas } from '../utils/archivo.js'; // ✅ Importación correcta

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción de la tarea:',
      validate: (input) => !_.isEmpty(input.trim()) || '⚠️ La descripción no puede estar vacía.'
    }
  ]);

  const tareas = await leerTareas();

  const nueva = {
    id: Date.now(), // También podrías usar _.uniqueId('tarea_') o nanoid
    descripcion: descripcion.trim(),
    completada: false
  };

  tareas.push(nueva);
  await guardarTareas(_.uniqBy(tareas, 'descripcion')); // Evita duplicados por descripción
  console.log('✅ Tarea agregada.');
}

export async function listarTareasFiltradas() {
  const tareas = await leerTareas();
  if (_.isEmpty(tareas)) return console.log('📭 No hay tareas registradas.');

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

  const filtradas = _.orderBy(
    tareas.filter(t =>
      filtro === 'todas' ? true :
      filtro === 'completadas' ? t.completada :
      !t.completada
    ),
    ['descripcion'], ['asc']
  );

  console.log(`\n📋 Tareas (${filtro}):`);
  filtradas.forEach((t, i) => {
    const estado = t.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${t.descripcion}`);
  });
}

export async function editarTarea() {
  const tareas = await leerTareas();
  if (_.isEmpty(tareas)) return console.log('⚠️ No hay tareas para marcar.');

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

export async function eliminarTarea() {
  const tareas = await leerTareas();
  if (_.isEmpty(tareas)) return console.log('⚠️ No hay tareas para eliminar.');

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

  const { confirmar } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmar',
      message: `¿Estás seguro de eliminar la tarea "${tareas[indice].descripcion}"?`,
      default: false
    }
  ]);

  if (confirmar) {
    tareas.splice(indice, 1);
    await guardarTareas(tareas);
    console.log('🗑️ Tarea eliminada.');
  } else {
    console.log('🚫 Eliminación cancelada.');
  }
}
