import inquirer from 'inquirer';
import { agregarTarea, listarTareasFiltradas, editarTarea, eliminarTarea } from './controllers/tareascontroller.js';

async function mostrarMenu() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: '1. Agregar tarea', value: 'agregar' },
        { name: '2. Listar tareas', value: 'listar' },
        { name: '3. Editar tarea (marcar completada)', value: 'editar' },
        { name: '4. Eliminar tarea', value: 'eliminar' },
        { name: '5. Salir', value: 'salir' }
      ]
    }
  ]);

  return opcion;
}

async function ejecutar() {
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case 'agregar':
        await agregarTarea();
        break;
      case 'listar':
        await listarTareasFiltradas();
        break;
      case 'editar':
        await editarTarea();
        break;
      case 'eliminar':
        await eliminarTarea();
        break;
      case 'salir':
        console.log('👋 Saliendo del gestor de tareas...');
        salir = true;
        break;
    }

    if (!salir) {
      await inquirer.prompt([
        {
          type: 'input',
          name: 'continuar',
          message: '\nPresiona ENTER para continuar...'
        }
      ]);
      console.clear();
    }
  }
}

ejecutar();
