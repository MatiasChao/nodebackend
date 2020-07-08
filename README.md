# nodebackend

Para crear un usuario de prueba:

POST: http://localhost:4000/api/users
body: {
	"name": "Matias",
	"email": "matias@hotmail.com",
	"password": "12345"
}

// si no encuentra la tabla users en la BD la va a crear.
// la info para la base de datos está en la carpeta raiz del proyecto ./database.js


NOTA: --
 1) La password se guarda hasheada en la base de datos.
 2) Uso token JWT para la sesión

MEJORAS: --
  1) Mejoraria las validaciones
