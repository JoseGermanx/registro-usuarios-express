

const router = require('express').Router();

// crear un usuario
router.post('/crear', (req, res) => res.send("Rutas para crear un usuario"));

// hacer login
router.post('/login', (req, res) => res.send("Rutas para loguear un usuario") )

// obtener un usuario por su id

// obtener listado de todos los usuarios

// actualizar su información


module.exports = router;