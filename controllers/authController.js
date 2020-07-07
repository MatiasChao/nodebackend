const User = require("../models/User")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

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
        let user = Film
    } catch (error) {
        console.log(error)
    }

}