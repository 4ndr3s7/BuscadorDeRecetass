Trabajo Final Programación V (BUSCADOR DE RECETAS)

Este proyecto es una aplicación web desarrollada con **React + Vite** que permite buscar recetas por nombre y mostrar resultados en tiempo real. Utiliza la API pública **TheMealDB** para obtener información de recetas, incluyendo nombre, categoría, área, instrucciones e imagen.

---

Descripción General del Proyecto

El Buscador de Recetas permite al usuario:

- Ingresar un término de búsqueda (ej.: `Chicken`, `Pasta`, `Cake`).
- Visualizar una grilla de resultados con tarjetas que muestran la imagen, nombre, categoría y área de la receta.
- Recibir mensajes informativos si no se encuentran resultados.
- Limpiar la búsqueda para realizar nuevas consultas.
- Visualizar un spinner mientras se realiza la búsqueda.

El proyecto implementa:

- React + Hooks (`useState`)  
- Bootstrap para estilos y diseño responsive  
- Fetch API para consumir datos de TheMealDB  
- Manejo de errores y estados de carga  

---

API Utilizada (TheMealDB)

Nombre: TheMealDB (Versión 1)  
Enlace: https://www.themealdb.com/api.php  

Endpoint utilizado: https://www.themealdb.com/api/json/v1/1/search.php?s={TÉRMINO}

Se usa para obtener las recetas basadas en el término de búsqueda ingresado por el usuario.

---

Instrucciones de Instalación y Ejecución

1. Clonar el repositorio:
  git clone https://github.com/4ndr3s7/BuscadorDeRecetass.git

2. Entrar a la carpeta del proyecto
  cd BuscadorDeRecetass

3. Instalar dependencias
Debes tener Node.js instalado. Ejecuta:
  npm install

4. Ejecutar la aplicación
   npm run dev

El proyecto abrirá automáticamente en la URL que indique Vite (por defecto: http://localhost:5173/).

--- 

Capturas de la aplicación web
