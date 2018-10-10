/*
Opcionamos por las novedades del 
lenguaje Javascript:
*/
'use strict'

/*
1. Cargamos el modulo de mongoose.
*/
var mongoose = require('mongoose');
/*
2. Usaremos los metodos de mongoose, en 
	este caso usaremos el metodo de schema
	para nuestro schema de base de datos:
*/
var Schema = mongoose.Schema;
/*
3. Creamos la coleccion de datos del usuario con las
	propiedades de la entidad DatoUsua
*/
var DatoSchema = Schema({
	usuario: { type: Schema.ObjectId, ref: 'usuario' },
	tipodocu: { type: Schema.ObjectId, ref: 'tipodocu' },
	pais: { type: Schema.ObjectId, ref: 'pais' },
	deptowork: { type: Schema.ObjectId, ref: 'departamento' },
	muniwork: { type: Schema.ObjectId, ref: 'municipio' },
	direccion: String,
	telefono: String,
	genero: String,
	yearnace: String,
	estacivil: String,
	nivelacad: String,
	estrasocial: String,
	profesion: String,
	persocargo: Number,
	tiempocontra: String,
	cargousua: String,
	tipocargo: String,
	tiempocargo: String,
	areawork: String,
	tipocontrato: String,
	horaswork: Number,
	tiposalario: String
});
/*
4. Exportamos el modelo para que lo podamos
	usar en un objeto:
*/
module.exports = mongoose.model('DatoUsua', DatoSchema);
