/* Cargamos las nuevas caracteristicas de javascript: */
'use strict'
/*
1. Cargamos el modulo de mongoose.
*/
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
/*
Creamos una conexion para la paginacion de autoincremento:
*/
var connection = mongoose.createConnection('mongodb://localhost:27017/riskpsico');
autoIncrement.initialize(connection);
/*
2. Usaremos los metodos de mongoose, en 
	este caso usaremos el metodo de schema
	para nuestro schema de base de datos:
*/
var Schema = mongoose.Schema;
/*
3. Creamos la coleccion de usuarios con las
	propiedades de la entidad Usuarios
*/
var QuestionShema = Schema({
	tipoinst: { type: Schema.ObjectId, ref: 'tipoinst' }, 
	idpregunta: { type: Number, ref: 'NumePregunta' },
	dimension: { type: Schema.ObjectId, ref: 'dimension' }, 
	pregunta: String,
	descripcion: String
});
/*
Desde aquí controlaremos el autoincremento de la id de la pregunta;
*/
QuestionShema.plugin(autoIncrement.plugin, {
    model: 'Instrumento',
    field: 'idpregunta',
    startAt: 1,
    incrementBy: 1
});
/*
4. Exportamos el modelo para que lo podamos
	usar en un objeto:
*/
module.exports = mongoose.model('Instrumento', QuestionShema);


