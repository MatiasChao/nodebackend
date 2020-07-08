const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// crear el servidor
const app = express()

// puerto de la app
const PORT = 4000

require('./database')

// habilitar express.json
app.use(express.json({ extended: true }))

app.use(cors())

// body parse , capaz no es necesario.. probar sacarlo
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

//arrancar la app
app.listen(PORT, () => {
    console.log(`el servidor esta funcionadno en el puerto ${PORT}`)
})