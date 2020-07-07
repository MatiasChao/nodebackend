const User = require("../models/User")
const jwt = require('jsonwebtoken')

exports.crearUsuario = (req, res) => {
    console.log('desde crear usuario')

    // requests lo que el usuario envia
    console.log(req.body)

    try {
        //funciona ok
        //User.create(req.body)

        // tmb funciona ok
        
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        

        console.log("req.body.id")
        console.log(req.body.email)
        console.log("-------")
        
        // crear y firmar el JWT
        // intentar pasarle el id del usuario que genero
        const payload = {
            user: {
                id: req.body.email
            }
        }

        // ver pq no llega esto
        //console.log("process.env.SECRET", process.env.SECRET)

        // firmar le JWT
        jwt.sign(payload, 'palabrasecreta', {
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