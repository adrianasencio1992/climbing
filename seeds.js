//Aquí le estamos diciendo donde tenemos los escaladores, que estan en data.
// SEEDS. JS solo vale para tener informacion en la base de datos antes de cargar la informacion buena, en app.js solo es para ver que la base de datos funciona y recibe la informacion. Por eso luego en app.js tenemos otra base de datos creada. AL final del proyecto se puede borrar este fichero si se quiere.

const climbers = require('./data'); //Requiriendo lo que hay en el fichero data.js
const Climber = require('./models/Climber.model'); //modelo
const mongoose = require('mongoose'); //Paquete para conectarme a la base de datos
const DB_NAME = 'climbers-app'; //nombre de la base de datos que se va a crear.

mongoose.connect(`mongodb://localhost/${DB_NAME}`) //Nos conectamos a la base de datos y nos devuelve una promesa.
    .then(() => { // Aquí estamos 100% seguros que estamos conectados a la base de datos.
        console.log('Connected to database');
        //Cojemos el modelo escalador
        Climber.insertMany(climbers) //Insertar varios
            .then(climbers => {
                console.log(`${climbers.length} inserted`) //Cuantos escaladores tenemos en total.
            })
    })

.catch(error => console.error(error));