'use strict'

// Modelos necesarios:
var Empresa = require('../models/empresa');
var Tipousua = require('../models/tipousua');
var User = require('../models/user');
var Instrumento = require('../models/instrumento');
var Respuesta = require('../models/respuesta');
var Dimension = require('../models/dimension');
var Dominio = require('../models/dominio');

// librerias necesarias:
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

// Tests: 
function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Por acá tambien ingresamos a la ruta pruebas'
	});
}

/*---------------------------------------- CRUD Respuestas: ----------------------------------------*/
// ----------------------------------------------------------- //  
// Metodo de agregar respuestas:
function saveAnswer(req, res){
	var params = req.body;
	var answer = new Respuesta();

	if (params.responde && params.usuario) {
		answer.usuario = params.usuario;
		answer.tipousua = params.tipousua;
		answer.empresa = params.empresa;
		answer.pregunta = params.pregunta;
		answer.responde = params.responde;
		
		// Validador de preguntas duplicadas:
		answer.save((err, answerStored)=>{
			if (err) return res.status(500).send({ message: 'Error al guardar la respuesta' });
			if (answerStored){
				return res.status(200).send({ answer: answerStored })
			}else{
				res.status(404).send({ message: 'No se ha registrado la respuesta' });
			}
		});
	}else{
		return res.status(404).send({ message: 'Debes enviar una respuesta' });
	}
}
// Fin de guardar respuesta
// ----------------------------------------------------------- //  
// Metodo para calcular porcentajes por dimension:

function getValues(req, res){

	// Pasamos por get, el valor de la empresa:
	var empresar = req.params.empresar;
	// Capturamos las variables obtenidas en cada paso:

	if (!empresar) return res.status(404).send({ message: 'No se ha seleccionado una empresa' });

	// Paso 1, capturar los identificadores de las dimensiones y de los dominios:
	Dominio.find({}, (err, dominios)=>{
		if (err) return res.status(404).send({ message: 'Ha ocurrido un error en la base de datos' });
		if (!dominios) {
			return res.status(404).send({ message: 'No se han configurado Dominios o no Existen' });
		}else{
			idDominio = dominios
		} 
	});
	Dimension.find({}, (err, dimensiones)=>{
		if (err) return res.status(404).send({ message: 'Ha ocurrido un error en la base de datos' });
		if (!dimensiones) {
			return res.status(404).send({ message: 'No se han configurado Dimensiones o no Existen' });
		}else{
			return res.status(200).send({
				idDimension: dimensiones
			});
		}
	});

	// Paso 2 sumar todos los valores de las respuestas de acuerdo con los diferentes dominios 
	Respuesta.find({})

}



// Fin de metodos calculos
// ----------------------------------------------------------- //  
// Metodo de buscar respuestas por usuario y empresa:

function getAnswers(req, res){
	var params = req.body;
	var idUsua = req.params.id;
	var tipousuar = req.params.tipousuar;
	var empresar = req.params.empresar;

	if (!idUsua) return res.status(404).send({ message: 'Debes iniciar sesión para ver los resultados' });

	Respuesta.find({ usuario: idUsua, tipousua: tipousuar, empresa: empresar}, (err, respuestas)=>{
		if (err) return res.status(404).send({ message: 'Ha ocurrido un error en la base de datos' });
		if (!respuestas) return res.status(500).send({ message: 'No se encontraron respuestas guardadas' }); 

		// Devolver las respuestas:
		return res.status(200).send({
			Respuestas: respuestas
		});
	}); 
}

// Fin de buscar respuesta
// ----------------------------------------------------------- //  
// Metodo de buscar respuestas por empresa:

function getResultados(req, res){
	var params = req.body;
	var empresar = req.params.empresar;

	if (!empresar)  return res.status(404).send({ message: 'Debes seleccionar una empresa para ver sus resltados' });
	// Consulta a la base de datos:
	Respuesta.find({empresa: empresar}, (err, resultados)=>{
		if (err) return res.status(500).send({ message: 'Error de conexion al servidor' });
		if (!resultados) return res.status(404).send({ message: 'No hay respuestas para mostrar' });
		// las respuestas por empresa:
		return res.status(200).send({
			Resultados: resultados
		});
	});
}

function getInformes(req, res){
	var dimensionv = req.params.dimension;
	var respondeuser = req.params.usuario;
	var empresar = req.params.empresar;
/*
	Respuesta.find({
		$and [
			{usuario:respondeuser},{ dimension: dimensionv },{empresa: empresar}
		}]
		}).exec((err, respuestas)=>{
			if (err) return res.status(500).send({ message: 'Error de conexion al servidor' });
			if (!respuestas) {
				return res.status(404).send({ message: 'No hay respuestas para mostrar' });
			}else{
				return res.status(200).send({
					Resultados: respuestas
				});
			}
		});
		*/
}

// Fin de buscar respuestas
// ----------------------------------------------------------- //  

// Exportamos el json que contiene las funciones del controlador, por cada funcion se debe agregar a este json::
module.exports = {
	pruebas,
	saveAnswer,
	getAnswers,
	getResultados,
	getInformes
}