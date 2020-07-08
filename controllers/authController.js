//const User = require("../models/User")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { User } = require('../database')
const bcrypt = require('bcrypt')
const bcryptjs = require('bcryptjs')

exports.autenticarUsuario = async (req, res) => {

    // revisamos si hay errores
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer el email y password
    const { email, password } = req.body

    try {
        // revisar user registrado
        let user = await User.findOne({ where: { email: req.body.email }  })

        if(!user) {
            console.log("no existe el user")
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        // revisar el password
        const correctPass = await bcryptjs.compare(password, user.password)

        console.log("correctPass: ", correctPass)
        if(!correctPass) {
           // return res.status(400).json({ msg: 'Password Incorrecto'})
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


        console.log("EXISTE EL USUARIO: ", user.password)
        const iguales = await bcrypt.compareSync(req.body.password, user.password)
        console.log("Iguales -> ", req.body.password)
        console.log("Iguales -> ", user.password)
        // no esta validando el bcrypt ! 
        if(iguales) {
            console.log("Login correcto")
        } else {
            console.log("Login incorrecto")
        }
    } catch (error) {
        console.log(error)
    }

}