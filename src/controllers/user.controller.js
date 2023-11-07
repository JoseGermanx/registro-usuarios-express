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

module.exports = {
  crearUser,
};
