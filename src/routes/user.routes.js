const { crearUser, loginUser, getUserById, updateUserById } = require('../controllers/user.controller');


const router = require('express').Router();

// crear un usuario
router.post('/crear', crearUser);

// hacer login
router.post('/login', loginUser)

// obtener un usuario por su id
router.get('/getbyid/:iduser', getUserById)

// actualizar su información
router.put('/update/:iduser', updateUserById)

// obtener listado de todos los usuarios




module.exports = router;