// middleware para validar JWT

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validarJWT = async (req, res, next) => {
    const token = req.cookies.token; // Obtener token desde la cookie
    
    if (!token) {
        return res.status(401).json({
        msg: "No hay token en la peticion",
        status: 401,
        });
    }
    
    try {
        const { idUser, name, lastName, email } = jwt.verify(
        token,
        process.env.SECRETORPRIVATEKEY
        );

        const userAdmin = await User.findById(idUser);
   
       
        req.idUser = idUser;
        req.name = name;
        req.lastName = lastName;
        req.email = email;
        req.rol = userAdmin.rol;
    
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
        msg: "Token no valido",
        status: 401,
        });
    }
    };

module.exports = {
    validarJWT,
};