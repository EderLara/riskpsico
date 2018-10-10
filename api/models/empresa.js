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
3. Creamos la coleccion de empresa con las
	propiedades de la entidad empresa
*/
var EmpresaSchema = Schema({
	idempresa: String,
	nombempre: String,
	emailempre: String,
	direcempre: String,
	cantempre: Number,
	sectoempre: { type: Schema.ObjectId, ref: 'sectores'},
	paisempre: { type: Schema.ObjectId, ref: 'pais'},
	deptoempre: { type: Schema.ObjectId, ref: 'departamento'},
	muniempre: { type: Schema.ObjectId, ref: 'municipio'},
	telefempre: String,
	estaempr: String
});
/*
4. Exportamos el modelo para que lo podamos
	usar en un objeto:
*/
module.exports = mongoose.model('Empresa', EmpresaSchema);
