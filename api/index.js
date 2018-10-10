/*
Agregamos la instruccion strict para acceder 
a las nuevas funciones de javascript:
*/
'use strict'
/*
Conexion a la base de datos:
1. 	Creamos un objeto con los 
	parametros de la libreria mongoose:
*/
var mongoose = require('mongoose');
/*
Agregamos app.js y el puerto de escucha:
*/
var app = require('./app');
var port = 3800;
/*
Conexion a la base de datos:
2.Para conectarnos a mongo debemos utilizar
un metodo de promesas:
*/
mongoose.Promise = global.Promise;
/*
Conexion a la base de datos:
3. Conectamos con el servidor:
*/
mongoose.connect('mongodb://localhost:27017/riskpsico')
.then(() => {
	console.log("Bienvenido, la conexion a la base de datos ha sido establecida");
	//Creación del servidor:
	app.listen(port,() => {
		console.log("Servidor corriendo en: http://localhost:3800");
	})
})
.catch(err =>console.log(err));
