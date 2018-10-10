/*
Entidad opciones para almacenar la alternativa de la pregunta
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OptionSchema = Schema({
	tipoPregu: { type: Schema.ObjectId, ref: 'tipoinst'},
	pregunta: { type: Schema.ObjectId, ref: 'instrumento'},
	marca: String, //marca será la letra asignada a la opción, y con esta se valida la respuesta del usuario
	txtOpcion: String,
	valor: Number,
});

module.exports = mongoose.model('Opcion', OptionSchema);