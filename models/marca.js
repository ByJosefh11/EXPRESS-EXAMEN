const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const marcaSchema = new Schema ({

    id: String,
    nombre: String,
    origen: String,
    estilo: String,
    descripcion: String

})

const Marca = mongoose.model('Marca', marcaSchema, "marca");

module.exports = Marca;

