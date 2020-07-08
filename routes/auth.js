const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')


// api/auth
router.post('/',
    [
       check('email', "Agregar un email valido").isEmail(),
       check('password', 'El password debe tener un minimo de 6 caracteres').not().isEmpty()
    ],
    authController.autenticarUsuario
)

module.exports = router;