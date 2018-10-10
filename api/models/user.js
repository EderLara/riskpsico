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
3. Creamos la coleccion de usuarios con las
	propiedades de la entidad Usuarios
*/
var UserSchema = Schema({
	tipousua: { type: Schema.ObjectId, ref: 'tipousua' },
	empresa: { type: Schema.ObjectId, ref: 'empresa' },
	idusuario: String,
	nombusua: String,
	apelusua: String,
	image: String,
	emailusua: String,
	passusua: String,
	estausua: String
});
/*
4. Exportamos el modelo para que lo podamos
	usar en un objeto:
*/
module.exports = mongoose.model('Usuario', UserSchema);
