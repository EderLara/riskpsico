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
3. Creamos la coleccion de tipos de usuario con las
	propiedades de la entidad tipousua
*/
var TipoUsuaSchema = Schema({
	notiusua: String
});
/*
4. Exportamos el modelo para que lo podamos
	usar en un objeto:
*/
module.exports = mongoose.model('TipoUsua', TipoUsuaSchema);
