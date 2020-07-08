//const User = require("../models/User")
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcrypt')
const { User } = require('../database')
require('dotenv').config();

exports.crearUsuario = async (req, res) => {

    // requests lo que el usuario envia
    console.log(req.body)

    //const { email, password } = req.body

    try {
        //funciona ok
        //User.create(req.body)

        //console.log("UNO: " , req.body.password)

        req.body.password = await bcryptjs.hash(req.body.password, 10)
        //console.log("DOS: " , req.body.password)

        //const user = await User.create(req.body)
        //res.json(user)

        
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        
        
        // Crear y firmar el JWT
        // intentar pasarle el id del usuario que genero
        const payload = {
            user: {
                id: req.body.email,
                name: req.body.name
            }
        }

        // firmar le JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error

            // mensaje de confirmacion
            res.send({ token })
        })

    } catch (error) {
        console.log("Error: ", error)
        res.status(400).send('Hubo un error')
    }


    // ESTO GUARDA BN
    /*
    User.create({
        name: 'Matias Chao',
        email:  'matiaschao22@hotmial.com',
        password: '12345'
    })
    */
}

exports.getUser = async (req, res) => {
    console.log('desde getUser', req.user.id)

    try {
        
        const user = await User.findOne({ 
                                where: { email: req.user.id }, 
                                attributes: ['id', 'name', 'email']  
                            })
        console.log("todo ok", user)
        //res.send(user)
        res.json({user})

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Hubo un error' })
    }
}