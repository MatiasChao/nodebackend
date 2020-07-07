const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')


// api/auth
router.get('/',

    [
        check('email', "Agregar un email valido").isEmail(),
        check('password', 'El password debe tener un minimo de 6 caracteres').length({ min: 6 })
    ],
    authController.autenticarUsuario
)

module.exports = router;