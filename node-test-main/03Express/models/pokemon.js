const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    Nombre: String,
    Tipo: String,
    Descripcion: String
})

//Creamos el modelo
const Pokemon = mongoose.model('pokemon', pokemonSchema, "pokemon");

module.exports = Pokemon;
