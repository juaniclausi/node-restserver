require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./control'));


mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Base de datos Online".green);
    })
    .catch(() => {
        console.log("Error conexion base de datos".red);

    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando Puerto: ".green, process.env.PORT);
});