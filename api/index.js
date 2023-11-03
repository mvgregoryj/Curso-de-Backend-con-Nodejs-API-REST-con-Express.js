// Importar el módulo express, que es un framework para crear aplicaciones web con Node.js
const express = require('express');

// Importar el módulo cors, que es un middleware para habilitar el intercambio de recursos de origen cruzado (CORS)
const cors = require('cors');

// Importar el módulo routerApi, que contiene las rutas de la aplicación
const routerApi = require('./routes');

// Importar los middlewares para manejar los errores
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

// Crear una instancia de la aplicación express
const app = express();

// Definir el puerto donde se ejecutará la aplicación
const port = process.env.PORT || 3000;

// Usar el middleware express.json para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Definir una lista blanca de los orígenes que pueden acceder a la aplicación
const whitelist = ['http://localhost:5500', 'https://myapp.co'];

// Definir las opciones del middleware cors, que verifica si el origen de la petición está en la lista blanca
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      // Si el origen está en la lista blanca, se llama al callback con el primer argumento nulo y el segundo verdadero
      callback(null, true);
    } else {
      // Si el origen no está en la lista blanca, se llama al callback con un error como primer argumento
      callback(new Error('No permitido'));
    }
  }
}

// Usar el middleware cors con las opciones definidas
app.use(cors(options));

// Definir una ruta GET para la raíz de la aplicación, que envía un mensaje de "Hello World!"
app.get('/api', (req, res) => {
  res.send('Hello World!');
})

// Definir una ruta GET para /nueva-ruta, que envía un mensaje de "Hola, soy una nueva ruta!"
app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta!');
});

// Usar el módulo routerApi para definir otras rutas de la aplicación
routerApi(app);

// Usar los middlewares para manejar los errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar el servidor en el puerto definido y mostrar un mensaje en la consola
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
