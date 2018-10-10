/*
Archivo instrumentos.js de la carpeta routes
*/
'use strict'
/*
Preparar el archivo, con la libreria express y el controlador:
*/
var express = require('express');
var QuestionController = require('../controllers/instrumentos');
var AnswerController = require('../controllers/respuesta');

//Cargamos el metodo de express, llamado Router, para los metodos get y post:
var api = express.Router();

//Cargar multiparty para el manejo de archivos:
var multipart = require('connect-multiparty');

//Cargar middleware de autenticacion:
var md_auth = require('../middlewares/autenticacion');
//Middleware para subir archivos:
var md_upload = multipart({ uploadDir: './uploads/usuarios'});

/*Rutas de instrumentos: */
api.post('/instrumentos/pruebas', QuestionController.pruebas);
api.post('/instrumentos/categorias', QuestionController.saveTipoIns);
api.post('/instrumentos/cuestionario', QuestionController.addPregunta);
api.get('/instrumentos/responder/:pregunta?', QuestionController.getAsk);
api.post('/instrumentos/opciones', QuestionController.addOption);

/*Rutas de Respuestas: */
api.get('/instrumentos/respuestas/:preguntar?', QuestionController.getOptions);
api.post('/instrumentos/respuestas/test', AnswerController.pruebas);
api.post('/instrumentos/respuestas', AnswerController.saveAnswer);
api.get('/instrumentos/respuestas/:id?/:empresar?/:tipousuar?', AnswerController.getAnswers);
api.get('/instrumentos/resultados/:empresar?', AnswerController.getResultados);
api.get('/instrumentos/respuestas/:id?/:empresar?/:tipousuar?', AnswerController.getAnswers);

/*Exportamos la ruta a enlazar: */
module.exports = api;