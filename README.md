# 🛠️ Sistema de Gestión de Tareas por Consola - Versión Pro (Con Don Brian de Jefe)

> ✨ "¡Quiero persistencia, orden y control! Y ya que estás... ¡usa Lodash!"  
> — **Don Brian**, con su termo de café intacto

---

## 📌 Descripción

Este proyecto es una aplicación de consola interactiva desarrollada en **Node.js** que permite gestionar tareas de forma eficiente y profesional.  
Fue creada para cumplir con las estrictas (y bastante intensas) demandas de Don Brian, quien exigía:

- Persistencia real en archivos
- Uso práctico y potente de **Lodash**
- Una interfaz limpia con validaciones y navegación clara usando **Inquirer**
- Y, sobre todo, ¡una organización de código de verdad!

---

## 🎯 Objetivos del Taller

- Refactorizar un sistema básico en memoria
- Aplicar buenas prácticas de modularización
- Implementar persistencia de datos en archivos `.json`
- Integrar Lodash para procesamiento inteligente de datos
- Usar `inquirer` para una interfaz interactiva por consola

---

## 📁 Estructura del Proyecto

📦 proyecto-tareas/
├── main.js
├── data/
│ └── tareas.json
├── models/
│ └── Tarea.js
├── controllers/
│ └── tareasController.js
├── utils/
│ └── archivo.js
├── helpers/
│ └── menu.js
└── package.json

yaml
Copiar
Editar

---

## 🚀 Funcionalidades Principales

✅ Crear una nueva tarea  
✅ Listar tareas (todas, completadas o pendientes)  
✅ Marcar tareas como completadas  
✅ Eliminar tareas  
✅ Confirmaciones y validaciones  
✅ Persistencia automática en archivos `.json`  
✅ Uso de colores y textos claros (con chalk opcional)

---

## 🧠 Integración con Lodash

Lodash fue utilizado para potenciar la lógica de negocio:

- `_.orderBy()` – Ordenar tareas por estado y fecha
- `_.uniqBy()` – Eliminar tareas duplicadas
- `_.groupBy()` – Agrupar tareas por estado
- `_.isEmpty()` – Validar que no se creen tareas vacías

---

## 🖥️ Cómo ejecutar el proyecto

1. **Clona el repositorio**

```bash

Instala las dependencias
npm install

Ejecuta la aplicación
node main.js

🧰 Dependencias
inquirer
lodash
chalk (opcional)

✅ Validaciones y Experiencia de Usuario
Tareas vacías no se permiten

Confirmación antes de eliminar

Textos de estado con colores y claridad

Menú intuitivo paso a paso

📌 Conclusión
Este proyecto fue refactorizado para cumplir con estándares reales de desarrollo, llevando una simple lista de tareas en consola a un sistema robusto, modular, persistente y dinámico, apto incluso para los exigentes ojos de Don Brian.

💡 Autor(es)
Este proyecto fue realizado con fines académicos como parte del taller de refactorización y persistencia con Node.js y Lodash.

Juan David Bermeo Castro
Santiago Pedraza
