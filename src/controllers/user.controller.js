const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// gestionar la creacion de un usuario

const crearUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  if (!name || !lastName || !email || !password) {
    return res.status(404).json({
      msg: "Todos los campos son requeridos",
      status: 404,
    });
  }
  try {

    const salt = bcrypt.genSaltSync();

    await User.create({
        name: name,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, salt)
      });
      
  res.status(201).json({
    msg: "Usuario creado correctamente",
    status: 201,
  });
  } catch (error){
    console.log(error)
    res.status(500).json({
      msg: "Error al crear el usuario",
      status: 500,
    });
  }

};

// gestionar el login de un usuario

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email, !password) {
        return res.status(404).json({
            msg: "Todos los campos son requeridos",
            status: 404,
        });
    }

    try {
        const findUser = await User.findOne({email: email});
        if(!findUser) {
            return res.status(404).json({
                msg: `Usuario con email ${email} no encontrado`,
                status: 404,
            });
        }

        if(findUser.status !== "active") {
            return res.status(404).json({
                msg: `Usuario con email ${email} no está activo en el sistema`,
                status: 404,
            });
        }

        //verificar contraseña
        
        const passVerify = bcrypt.compareSync(password, findUser.password);

        if(!passVerify) {
            return res.status(404).json({
                msg: `Contraseña incorrecta`,
                status: 404,
            });
        }

        res.status(200).json({
            msg: `Usuario con email ${email} logueado correctamente`,
            status: 200,
            data: {
                name: findUser.name,
                lastName: findUser.lastName,
                email: findUser.email
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al loguear el usuario",
            status: 500,
        });
        
    }


}











module.exports = {
  crearUser,
  loginUser
};
