// middleware para verificar si el usuario es admin

const isAdmin = (req, res, next) => {

    if (req.rol !== 'admin') {
        return res.status(403).json({
        msg: 'No tienes permisos para realizar esta acción',
        status: 403
        });
    }
    
    next();
    };

module.exports = {isAdmin};