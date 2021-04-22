const express = require("express");
const Climber = require("../models/Climber.model");
const router = express.Router();

//Devolvemos un views con todos los escaladores.
//LLamamos al modelo de Climber, y buscar los escaladores
router.get("/", (req, res) => {
    Climber.find({})
        .then((climbers) => {
            res.render("climbers-list", { climbers }); //Renderizado de esa lista de escaladores, primer parametro es la lista  y el segundo la informacion que le queramos pasar
        })
        .catch((error) => console.error(error));
});
//Esta ruta debe ir antes porque /create es fijo, y el /:id es variable.
//Crear al usuario
router.get("/create", (req, res) => {
    //Pintar climber-create.hbs
    res.render("climber-create");
});

//Query parametros - Parametros de Busqueda
router.get('/search', (req, res) => {
    res.render('climbers-list')
})

//Editar el usuario
router.get('/:id/edit', (req, res) => {
    const { id } = req.params; //En esta contante llega la informacion que es la peticion.
    Climber.findOne({ _id: id }) //Buscamos un escalador por el id
        .then(climber => {
            res.render('climber-edit', { climber }) //Modificamos los datos.
        })
        .catch((error) => console.error(error));
})

router.post('/:id/edit', (req, res) => {
    const { name, age, description, city } = req.body; //Recibimos los los datos del formulario
    const { id } = req.params; //Cojemos el id de la propia ruta.

    Climber.findOneAndUpdate({ _id: id }, { name, age, description, city }) //Primer parametros es el id y luego los parametros a modificar.
        .then(() => {
            res.redirect(`/climbers/${id}`); //Luego redirigeme a /climbers.
        })
        .catch((error) => console.error(error));
})

//Borrar usuario.
router.post('/:id/delete', (req, res) => {
    const { id } = req.params; //Cojemos el id de la propia ruta.

    Climber.findOneAndDelete({ _id: id }) //Primer parametros es el id
        .then(() => {
            res.redirect("/climbers"); //Luego redirigeme a /climbers.
        })
        .catch(error => console.error(error));
})

router.get("/:id", (req, res) => {
    //:id es un parametro de busqueda.
    const { id } = req.params; //En esta contante llega la informacion que es la peticion. {id}- es object destructuring
    Climber.findOne({ _id: id }) //Buscamos un escalador
        .then((climber) => {
            res.render("climber-details", { climber }); //Renderizado de esa lista de escaladores, primer parametro es la lista  y el segundo la informacion que le queramos pasar
        })
        .catch((error) => console.error(error));
})

//Aquí llega req.body(objeto dentro de la petición). Es la información que llega del formulario de crear un usuario.
router.post("/create", (req, res) => { //Recoje los datos del formulario
    const { name, age, description, city } = req.body; //Estas son las keys que hemos puesto en climber-create.
    Climber.create({ name, age, description, city }) //Creamos un nuevo usuario en el modelo escalador.
        .then(() => {
            res.redirect("/climbers") //Nos redirecciona a /climbers con el usuario ya creado
        })
        .catch(error => {
            res.render('climbers-create', { error }) //Si la validacion del usuario no es correcta daria el error que tenemos puesto en crear el usuario.
        })
})

module.exports = router;