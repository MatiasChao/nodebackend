const express = require('express')

// crear el servidor
const app = express()

// puerto de la app
const PORT = 4000

// habilitar express.json
app.use(express.json({ extended: true }))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

//arrancar la app
app.listen(PORT, () => {
    console.log(`el servidor esta funcionadno en el puerto ${PORT}`)
})