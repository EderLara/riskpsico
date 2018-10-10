/*
Opcionamos por las novedades del 
lenguaje Javascript:
*/
'use strict'
/*
Creamos las variables para el uso de los 
diferentes frameworks:
*/
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/*Secciones: */
/* Cargar Rutas: */
//Cargamos la ruta del usuario:
var userroutes = require('./routes/user');
var instroutes = require('./routes/instrumentos');

/*Cargar Middlewares:*/
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

/*cors -cabeceras-:*/
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

/*Rutas:*/
//Reescribimos la url para que cargue desde /api así: http://localhost:3800/api/home
app.use('/api', userroutes);
app.use('/api', instroutes);

//Exportaciones:

module.exports = app;