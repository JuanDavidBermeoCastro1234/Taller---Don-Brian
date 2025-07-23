const fs = require ("fs/promises")
const path = require ("path")

const ruta = path.join(__dirname,"data","data.json");

// 2. **Agregar persistencia con archivos**

//     Usa el módulo `fs` para que las tareas se guarden 
// en un archivo `.json` y persistan 
//     entre ejecuciones del programa. Cada operación 
// (crear, listar, eliminar, completar) 
//     debe afectar este archivo.

async function crear(tareas) {
    try {
        await fs.writeFile(ruta, JSON.stringify([tareas],null,4))
        //esto le dice que guarde un array tareas lo vuelva json, null que no hay funcion especial y 4 las identaciones 
        console.log("tarea creada") 
    } catch (error) {
        console.log("Error: ", error )
    }
}

// crear({
//     id: 66666,
//     nombre: "Brian",
//     email: "brian@yahoo.com"
// });

//esto es pa leer 
async function leer() {
    try {
        await fs.readFile(ruta);
        
    } catch (error) {
        
    }
    
}