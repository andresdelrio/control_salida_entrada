const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');


const Estudiante = require('../models/Estudiante');

const upload = multer({ dest: 'tmp/csv/' });
const router = express.Router();

router.get('/cargamasiva', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/cargamasiva.html'));
  });

  router.post('/cargamasiva', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No se envió ningún archivo.');
    }
  
    let stream = fs.createReadStream(req.file.path);
    let csvStream = fastcsv.parse()
      .on('data', async (data) => {
        let estudiante = {
          documento: data[0],
          nombre: data[1],
          grupo: data[2],
          estado: 'Dentro'
        };
        await Estudiante.create(estudiante);
      });
  
    stream.pipe(csvStream);
    res.send('Carga masiva de estudiantes completada.');
  });
  

router.post('/registro', async (req, res) => {
    const { documento } = req.body;

    const estudiante = await Estudiante.findByPk(documento);
    if (!estudiante) {
        return res.status(404).json({error: 'Estudiante no encontrado.'});
    }

    estudiante.estado = estudiante.estado === 'Dentro' ? 'Fuera' : 'Dentro';
    await estudiante.save();

    // Devolvemos la información del estudiante como un objeto JSON.
    res.json({
        documento: estudiante.documento,
        nombre: estudiante.nombre,
        grupo: estudiante.grupo,
    });
});

router.get('/fuera', async (req, res) => {
  const estudiantesFuera = await Estudiante.findAll({
    where: {
      estado: 'Fuera'
    }
  });

  res.json(estudiantesFuera);
});



module.exports = router;
