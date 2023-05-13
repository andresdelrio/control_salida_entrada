require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const db = require('./src/config/database');
const estudiantesRoutes = require('./src/routes/estudiantes');

db.sync()
  .then(() => {
    console.log("Las tablas han sido creadas");
    app.use(express.json());  // Para poder parsear JSON en el cuerpo de las solicitudes
    app.use('/estudiantes', estudiantesRoutes);
    app.use(express.static('public'));

    app.listen(port, () => {
      console.log(`La aplicación está corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
