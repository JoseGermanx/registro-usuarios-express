const { crearUser, loginUser, getUserById, updateUserById, updateStatusUserById } = require('../controllers/user.controller');
const { validarJWT } = require('../middlewares/auth');


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

// ruta protegida

router.get('/user-data', validarJWT, (req, res) => {
  res.json({
    msg: 'Ruta protegida, Welcome!',
    user: req.name
  })
})

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Sesión cerrada" });
  });
  




module.exports = router;