const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewer/auth')

// Crear usuario -> api/users
router.post('/',
    userController.crearUsuario
)

// Obtener usuario autenticado -> api/users
router.get('/',
    auth,
    userController.getUser    
)

module.exports = router;