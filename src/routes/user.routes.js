const { crearUser, loginUser, getUserById, updateUserById, updateStatusUserById } = require('../controllers/user.controller');


const router = require('express').Router();

// crear un usuario
router.post('/crear', crearUser);

// hacer login
router.post('/login', loginUser)

// obtener un usuario por su id
router.get('/getbyid/:iduser', getUserById)

// actualizar el status del usuario
router.put('/update-status/:iduser', updateStatusUserById)

// actualizar datos del usuario

router.put('/update/:iduser', updateUserById)

// obtener listado de todos los usuarios




module.exports = router;