/*
Archivo de servicios jwt, para tokens
Crearemos un metodo para crear tokens:

Como siempre utilizamos las novedades de javascript:
*/
'use strict'

//Variables para utilizar los metodos de jwt y moment:
var jwt = require('jwt-simple');
var moment = require('moment');
//variable secreta:
var secret = 'clave_secreta_riskpsico_tfm';
//Utilizamos el metodo createToken, que traerá los datos del usuario:

exports.createToken = function(user){
	//Variable con los datos del usuario
	var payload = {
		//Atributos de la entidad usuario:
		sub: user._id,
		tipousua: user.tipousua,
		empresa: user.empresa,
		idusuario: user.idusuario,
		nombusua: user.nombusua,
		apelusua: user.apelusua,
		emailusua: user.emailusua,
		passusua: user.passusua,
		estausua: user.estausua,
		//Fechas de creacion y expiracion del moment:
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};
	//Devolvemos codificado el token:
	return jwt.encode(payload, secret)
}
//Este token se devuelve al control del login del user.