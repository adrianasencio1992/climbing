// Esta será nuestra aplicación
// Direccionamiento de express.
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose') //Paquete para conectarme a la base de datos
const app = express() // Creamos la instancia de express
const DB_NAME = 'climbers-app' // Nombre de la base de datos
const bodyParser = require('body-parser'); //Constante del paquete de body-parser

mongoose.connect(`mongodb://localhost/${DB_NAME}`) //Nos conectamos a la base de datos y nos devuelve una promesa.
    .then(() => {
        console.log('Connected to database')
    })

//Middleware y setup config Middlewares es un concepto muy importante al desarrollar sobre Node.js, la plataforma para utilizar a javascript en el lado del servidor.
app.set('views', __dirname + '/views') //Donde estan los views estan en la carpeta views
app.set('view engine', 'hbs'); // Motor de renderizado, motor de templates va a ser Handelbars
hbs.registerPartials(__dirname + '/views/partials'); //Donde estan los partials, tenemos que requerir hbs, lo hacemos en la linia 4.
app.use(express.static('public')); // En que carpeta estan los estaticos, en este caso en el public, son estaticos me refiero a css, imagenes...
app.use(bodyParser.urlencoded({ //Traduce la informacion y Nos permite utilizar la informacion del formulario y devolverla en un objeto.
    extended: true // sirve para que acepte mas datos no solo strings, si no lo pones todo te vendria como un string
}))

//Importar el router.
const index = require('./routes/index'); //importamos el router.
const climbers = require('./routes/climbers');
app.use('/', index); //Usa este router, si las url empiezan por /, entra en index.js y a ver si encuentras alguna ruta que coincida, entonces si la encuentra la renderiza, renderiza el index hbs, pero esta ruta se enceuntra en index.js (no liarse con esto).
app.use('/climbers', climbers);





//Rutas:
// app.get("/", (req, res) => {
//     res.render('index'); //Renderizara la ruta index, si escribes / puedes poner cualquier nombre, pero sera tu pagina principal.
// })

//Ponemos a la aplicación a escuchar en el puerto 3000
app.listen(3000, () => console.log(`Listening on port 3000. http://localhost:3000`))