
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('../routes/user.routes')


const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1", router );
app.use('*', (req, res) => res.status(404).send("404 - Ruta no encontrada"))

module.exports = app;


