//const User = require("../models/User")
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { User } = require('../database')
require('dotenv').config();

exports.crearUsuario = async (req, res) => {
    try {
        const newHash = await bcryptjs.hash(req.body.password, 10)

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: newHash
        })
        
        // Crear y firmar el JWT
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

            res.send({ token })
        })

    } catch (error) {
        console.log("Error: ", error)
        res.status(400).send('Hubo un error')
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ 
                                where: { email: req.user.id }, 
                                attributes: ['id', 'name', 'email']  
                            })
        res.json({user})
    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error' })
    }
}