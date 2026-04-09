const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  subName: String,
  descripcion: String,
  imagen: String,
  dieta: String,
  longitud: String,
  altura: String,
  conservacion: Number,
  metodo: String,
  material: String,
  era: String,
  estado: String
});

module.exports = mongoose.model('Animal', animalSchema);