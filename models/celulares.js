var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var celularesSchema =  Schema({
  id:Number,
  Marca:String,
  Modelo:String,
  Año:Number,
  Imagen: String,
});

module.exports = mongoose.model('Celulares', celularesSchema);
