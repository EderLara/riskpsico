/*
Entidad respuestas para almacenar 
*/
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = Schema({
	usuario: { type: Schema.ObjectId, ref: 'user'},
	tipousua: { type: Schema.ObjectId, ref: 'tipousua' },
	empresa: { type: Schema.ObjectId, ref: 'empresa' },
	pregunta: { type: Schema.ObjectId, ref: 'instrumento'},
	dominio: { type: Schema.ObjectId, ref: 'dominio'},
	dimension: { type: Schema.ObjectId, ref: 'dimension'},
	responde: Number,
	fechaans: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Respuesta', AnswerSchema);