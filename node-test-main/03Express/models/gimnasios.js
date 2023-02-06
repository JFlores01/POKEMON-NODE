const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gimnasioesSchema = new Schema({
    Nombre: String,
    Ciudad: String,
    Lider: String
})

//Creamos el modelo
const Gimnasios = mongoose.model('gimnasios', gimnasioesSchema, "gimnasios");

module.exports = Gimnasios;
