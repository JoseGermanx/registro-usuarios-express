const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../services/generar-jwt");

// gestionar la creacion de un usuario

const crearUser = async (req, res) => {
  const { name, lastName, email, password, rol } = req.body;

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
      password: bcrypt.hashSync(password, salt),
      rol: rol
    });

    res.status(201).json({
      msg: "Usuario creado correctamente",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al crear el usuario",
      status: 500,
    });
  }
};

// gestionar el login de un usuario

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(404).json({
      msg: "Todos los campos son requeridos",
      status: 404,
    });
  }

  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({
        msg: `Usuario con email ${email} no encontrado`,
        status: 404,
      });
    }

    if (findUser.status !== "active") {
      return res.status(404).json({
        msg: `Usuario con email ${email} no está activo en el sistema`,
        status: 404,
      });
    }

    //verificar contraseña

    const passVerify = bcrypt.compareSync(password, findUser.password);

    if (!passVerify) {
      return res.status(404).json({
        msg: `Contraseña incorrecta`,
        status: 404,
      });
    }

    const token = await generarJWT(findUser._id, findUser.name, findUser.lastName, findUser.email);

    res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "strict",
      maxAge: 3600000, // 1 hora
    })
    .json({
      msg: `Usuario con email ${email} logueado correctamente`,
      status: 200,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al loguear el usuario",
      status: 500,
    });
  }
};

const getUserById = async (req, res) => {
  const { iduser } = req.params;

  if (!iduser) {
    return res.status(404).json({
      msg: "Id de usuario es requerido",
      status: 404,
    });
  }

  if (iduser.length !== 24) {
    return res.status(404).json({
      msg: "Id de usuario no válido",
      status: 404,
    });
  }

  try {
    const user = await User.findOne({ _id: iduser });

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
        status: 404,
      });
    }

    res.status(200).json({
      msg: "Usuario encontrado exitosamente",
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al buscar el usuario",
      status: 500,
    });
  }
};

const updateStatusUserById = async (req, res) => {
  const { iduser } = req.params;

  if (!iduser) {
    return res.status(404).json({
      msg: "Id de usuario es requerido",
      status: 404,
    });
  }

  if (iduser.length !== 24) {
    return res.status(404).json({
      msg: "Id de usuario no válido",
      status: 404,
    });
  }

  try {
    const changes = {
      status: "inactive",
    };

    const user = await User.findByIdAndUpdate(iduser, changes);

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
        status: 404,
      });
    }

    res.status(200).json({
      msg: "Usuario actualizado exitosamente",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al buscar el usuario",
      status: 500,
    });
  }
};

// crear controlador y ruta para actualizar datos del un usuario
// recibir por params el id del usuario
// recibir por body los nuevos datos
// utilizar el metodode mongoose findByIdAndUpdate o findOneAndUpdate o updateOne

const updateUserById = async (req, res) => {
   const { iduser } = req.params;
   const { name, lastName, email } = req.body;

  if (!iduser) {
    return res.status(404).json({
      msg: "Id de usuario es requerido",
      status: 404,
    });
  }

  if (iduser.length !== 24) {
    return res.status(404).json({
      msg: "Id de usuario no válido",
      status: 404,
    });
  }

  const userChanges = {
    name: name,
    lastName: lastName,
    email: email
  }

  await User.findByIdAndUpdate(iduser, userChanges);
  res.status(200).json({
    msg: "Usuario actualizado correctamente",
    status: 200
  })
}

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Sesión cerrada" });
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      msg: "Listado de usuarios",
      data: users,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al buscar los usuarios",
      status: 500,
    });
  }
}

module.exports = {
  crearUser,
  loginUser,
  getUserById,
  updateStatusUserById,
  updateUserById,
  logout,
  getAllUsers
};
