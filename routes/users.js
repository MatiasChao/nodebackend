const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Crear usuario
// api/usuarios
router.post('/',
    userController.crearUsuario
)




module.exports = router;