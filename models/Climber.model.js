//Creamos el modelo de escalador. Solo habra un modelo por esquema.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creamos el Esquema.
const ClimberSchema = new Schema({
    name: { type: String, required: true }, //Requerido es obligatorio.
    age: { type: Number, min: 0, max: 120, required: true }, // minimo 0, max 120 años
    description: { type: String, maxlength: 1000, required: true }, //Maximo 1000 caracteres
    city: { type: String, required: true }
});

//El modelo se crea aquí:
const Climber = mongoose.model('Climber', ClimberSchema); //Primer parametro es el nombre del modelo, y el segundo el nombre del esquema.

//Aquí exportamos el modelo:
module.exports = Climber;

//Nuestra coleccion en la base de datos se llamara, climbers.