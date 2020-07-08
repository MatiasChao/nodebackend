//const User = require("../models/User")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { User } = require('../database')
const bcryptjs = require('bcryptjs')

exports.autenticarUsuario = async (req, res) => {

    // revisamos si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // revisar user registrado
        let user = await User.findOne({ where: { email: req.body.email }  })

        if(!user) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // no esta validando el bcrypt ! 
        const correctPass = await bcryptjs.compare(req.body.password, user.password)

        if(!correctPass) {
           return res.status(400).json({ msg: 'Password Incorrecto'})
        }

        //si todo es correcto creamos el JWT
        const payload = {
            user: {
                id: req.body.email
            }
        }

        // firmar le JWT
        jwt.sign(payload, 'palabrasecreta', {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error

            // mensaje de confirmacion
            res.send({ token })
        })
    } catch (error) {
        res.status(400).json({ msg: 'Algo falló al obtener el usuario'})
    }

}