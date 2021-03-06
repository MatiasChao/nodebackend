const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = function(req, res, next) {

    // leer el token del header
    const token = req.header('x-auth-token')

    // revisar si no hay token
    if(!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no valido' })
    }

    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET)

        req.user = cifrado.user
        next()
    } catch (error) { 
        res.status(401).json({ msg: 'Token no valido o tal vez expiró' })
    }
}