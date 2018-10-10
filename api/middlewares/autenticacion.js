/*
Middleware para la auntenticacion del usuario:
*/
'use strict'

//Variables para utilizar los metodos de jwt y moment:
var jwt = require('jwt-simple');
var moment = require('moment');
//Variable secreta para token:
var secret = 'clave_secreta_riskpsico_tfm';
//Funcion con parametros de requisicion, respuesta y continuacion:
exports.ensureAuth =function(req, res, next){
	if (!req.headers.authorization) {
		return res.status(403).send({
			message: 'La peticion no tiene la cabecera de autenticación'
		});
	}
	//Cabecera sin comillas simples o dobles, para eso usamos el metodo replace
	var token = req.headers.authorization.replace(/['"]+/g, '');    
	//Usamos try - catch para el manejo de errores en la decodificacion:
	try{
		//decodificamos el payload:
		var payload = jwt.decode(token, secret);
		//Validamos la fecha de caducidad:
		if (payload.exp <= moment().unix()) {
			return res.status(401).send({
				message: 'El token ha expirado'
			});
		}
	}catch(ex){
		return res.status(404).send({
			message: 'El token no es valido'
		});
	}
	
	req.user = payload;

	next();
}