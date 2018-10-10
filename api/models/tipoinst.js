'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tipoinstShema = Schema({
	nombTipoQuest: String,
	Descripcion: String 
});

module.exports = mongoose.model('TipoInst', tipoinstShema);