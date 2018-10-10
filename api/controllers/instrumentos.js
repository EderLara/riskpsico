/*
Archivo para cargar instrumentos de preguntas, 
Creado por: Eder Lara Trujillo
Creado el: 2018-04-30
Modificado: 0000-00-00
*/

'use strict'

/* Modelos a usar: */
var User = require('../models/user');
var Empresa = require('../models/empresa');
var TipoUsua = require('../models/tipousua');
var TipoInst = require('../models/tipoinst');
var Instrumento = require('../models/instrumento');
var Opciones = require('../models/opcion');


/* Cargamos las librerias Necesarias: */

// var path = require('path');
// var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

// Funcion de pruebas :
function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Por acá ingresamos a la ruta pruebas de instrumentos.'
	});
}

/*---------------------------------------- CRUD Instrumentos: ----------------------------------------*/

//Funcion para agregar pregunta al cuestionario:

function addPregunta(req, res){
	// Recoger los datos del formulario:
	var params = req.body;
	// Constructor de nuevo instrumento:
	var question = new Instrumento();

	if (params.tipoinst && params.pregunta) {
		// Obligamos a que el valor de tipo de pregunta sea seleccionado.
		question.tipoinst = params.tipoinst;
		question.pregunta = params.pregunta;
		question.descripcion = params.descripcion;
		// Validacion de duplicados en preguntaas:
		Instrumento.find({
						$or: [
								{pregunta: question.pregunta},
								{descripcion: question.descripcion}
						]}).exec((err, pregunta)=>{
							if (err) return res.status(500).send({message: 'Error de peticion, Revisar conexión al servidor'});
							if (pregunta && pregunta.lenght >=1){
								return res.status(200).send({message: 'La pregunta que intentas guardar ya existe.'});
							}else{
									//Funcion de guardado
									question.save((err, questionStored)=>{
										if (err) return res.status(500).send({message: 'No se puede agregar esta pregunta. error'});
										console.log(err);
										if (questionStored) {
											res.status(200).send({
												pregunta:questionStored
											})
										}
									});
								}
						});
		}else{
				res.status(404).send({message: 'Se deben llenar todos los Campos Obligatorios'});
				console.log(req.body);
			}
}
// Fin de agregar pregunta al cuestionario.
// ----------------------------------------------------------- //
// Funcion para cargar una pregunta:

function getAsk(req, res){
	var params = req.body;
	var asking = req.params.pregunta;

	if (!asking) return res.status(404).send({ message: 'No has cargado una pregunta' });

	// Query de busqueda:
	/*
		Esta consulta tenia algo muy sencillo estilo select * from, ahora se ha modificado para que muestre solo la pregunta y la descripcion:
	*/
	Instrumento.find({_id: asking},{"pregunta":1, "descripcion":1, "_id":0}, (err, pregunta)=>{
		if (err) return res.status(500).send({ message: 'Error al cargar la pregunta' });
		if (!pregunta) return res.status(404).send({ message: 'No hay pregunta para mostrar' });

		return res.status(200).send({
			Pregunta: pregunta
		});
	});	
}

// Fin de buscar pregunta.
// ----------------------------------------------------------- //
/*---------------------------------------- CRUD Opciones: ----------------------------------------*/
function addOption(req, res){
	var params = req.body;
	var option = new Opciones();

	if (params.pregunta && params.txtOpcion) {
		option.tipoPregu = params.tipoPregu;
		option.pregunta = params.pregunta;
		option.marca = params.marca;
		option.txtOpcion = params.txtOpcion;
		option.valor = params.valor;

		Opciones.find({ $or: [
								{ marca: option.marca },
								{ txtOpcion: option.txtOpcion }
							 ]}).exec((err, opciones)=>{
							     if (err) return res.status(500).send({ message: 'Error al guargar la opción.' });
							     if (opciones && opciones.lenght >=1) {
							     	res.status(200).send({ message: 'La opcion que intentas guardar ya existe!.' });
							     }else{
							     	option.save((err, optionStored)=>{
							     		if (err) return res.status(500).send({ message: 'Error, no se puede guardar la opción.' });
							     		if (optionStored) {
							     			res.status(200).send({
							     				option: optionStored
							     			})
							     		}
							     	});
							     }
		});

	}else{
		res.status(200).send({ message: 'Debes cargar una opción.' });
	}
}

// Fin de guardar Opcion.
// ----------------------------------------------------------- //
// Funcion de mostar opciones por pregunta:

function getOptions(req, res){
	var params = req.body;
	var preguntar = req.params.preguntar;

	if (!preguntar)	
		return res.status(404).send({ message: 'No se ha cargado ninguna pregunta' });
	// Utilizo este control solo para revisar que si funciona mi parametro de pregunta.
	// return res.status(200).send({Pregunta: preguntar });
	
	Opciones.find({pregunta: preguntar}, (err, listaOpcion)=>{
		if (err) return res.status(500).send({ message: 'Error en la consulta' });
		if (!listaOpcion) return res.status(404).send({ message: 'Pregunta sin opciones de respuesta' });

		return res.status(200).send({
			message: 'Estas son las opciones a la pregunta: ',
			lista: listaOpcion
		});
	});

}
// Fin de mostrar opciones por pregunta
// ----------------------------------------------------------- //


/*---------------------------------------- CRUD TipoInstrumentos: ----------------------------------------*/

function saveTipoIns(req, res){
	var params = req.body;
	var categoria = new TipoInst();

	if (params.nombTipoQuest && params.Descripcion) {
		categoria.nombTipoQuest = params.nombTipoQuest;
		categoria.Descripcion = params.Descripcion;
		// Validacion de duplicados:
		TipoInst.find({ $or: [
						{nombTipoQuest: categoria.nombTipoQuest},
						{Descripcion: categoria.Descripcion}
			]}).exec((err, catepregunta)=>{
				if (err) return res.status(500).send({message: 'Error al intentar guardar el Tipo de Pregunta'});
				// Si el valor esta duplicado:
				if (catepregunta && catepregunta.lenght >=1) {
					return res.status(200).send({message: 'El tipo de pregunta que intentas guardar ya existe'});
				}else{
						categoria.save((err, CatInsStored)=>{
							if (err) return res.status(500).send({message: 'Error al guardar el Tipo de Pregunta'});
							console.log(req.body);
							if (CatInsStored) {
								res.status(200).send({
									tipoinst: CatInsStored
								})
							}
						});
				}
			});

	}else{
		res.status(404).send({message: 'Se deben llenar todos los campos necesarios'});
		console.log('se deben llenar los campos ');
	}
}

/* Fin de funciones, exportamos las funciones a utilizar en la ruta: */
module.exports ={
  pruebas,
  saveTipoIns,
  addPregunta,
  getAsk,
  addOption,
  getOptions
} 