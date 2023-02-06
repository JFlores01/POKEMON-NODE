const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrenadoresSchema = new Schema({
    Nombre: String,
    Medallas: String,
    Descripcion: String
})

//Creamos el modelo
const Entrenadores = mongoose.model('entrenadores', entrenadoresSchema, "entrenadores");

module.exports = Entrenadores;
