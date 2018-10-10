/*
Archivo user.js de la carpeta routes
*/
'use strict'
/*
Preparar el archivo, con express y el controlador:
*/
var express = require('express');
var UserController = require('../controllers/user');
var ConfigController = require('../controllers/config');
//Cargamos el metodo de express, llamado Router, para los metodos get y post:
var api = express.Router();

//Cargar multiparty:
var multipart = require('connect-multiparty');
//Cargar middleware:
var md_auth = require('../middlewares/autenticacion');
//Middleware para subir archivos:
var md_upload = multipart({ uploadDir: './uploads/usuarios'});
/*
Definimos las rutas home y pruebas, 
Crearemos una ruta para las tablas "Padres"
y la pondremos en una ruta que llamaremos parametros, 
aqui pondremos todas las rutas que tenga el controlador:
*/
//Rutas para ensayar:
api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
//Rutas CRUD de usuarios:
api.post('/registro', UserController.saveuser);
api.post('/ingreso', UserController.loginUser);
api.get('/usuario/:id', md_auth.ensureAuth, UserController.getUser);
api.get('/poblacion', UserController.getPoblacion);
api.get('/usuarios/:page?', md_auth.ensureAuth, UserController.getUsers);
api.put('/actualizar/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/usuario/perfil/:id', [md_auth.ensureAuth, md_upload], UserController.addImage);
api.get('/usuario/imagen/:imageFile', UserController.getImageFile);
/*
api.post('/parametros', UserController.savedocs);
*/
//Rutas de parametros de Configuracion:
api.post('/parametros/empresa', ConfigController.saveenter);
api.get('/sectores', ConfigController.getSector);
api.post('/parametros/tipousuario', ConfigController.savetiusua);
api.get('/perfiles', ConfigController.getPerfiles);
api.post('/parametros/tipodocumento', ConfigController.savetidocu);
api.get('/tipodocs', ConfigController.getDocs);
api.post('/parametros/municipios', ConfigController.saveMuni);
api.get('/municipios/:depto?', ConfigController.getMuni);
api.post('/parametros/departamento', ConfigController.savedepto);
api.get('/departamentos/:id?', ConfigController.getDepto);
api.post('/parametros/pais', ConfigController.savePais);

/*        Exportamos la ruta:       */
module.exports = api;