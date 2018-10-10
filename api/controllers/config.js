/*
Archivo de parametrizacion de Entidades : Empresa, TipoUsua, TipoDocu, Pais, Departamento y Municipio:
*/
/*
Opcionamos por las novedades del 
lenguaje Javascript:
*/
'use strict'

/*
Importamos los Modelos:
*/
var Empresa = require('../models/empresa');
var Sector = require('../models/sectores');
var Tipousua = require('../models/tipousua');
var Tipodocu = require('../models/tipodocu');
var Municipio = require('../models/municipio');
var Departamento = require('../models/departamento');
var Pais = require('../models/pais');

/* 
------------------------------------------------------- CRUD EMPRESA: ------------------------------------------------------
*/
//Funcion para guardar empresa:
function saveenter(req, res){
	//Recoger Parametros  de peticion:
	var params = req.body;
	//constructor de Nueva Empresa:
	var empresa = new Empresa();
	//Validamos todos los campos obligatorios:
	if (params.idempresa && params.nombempre && params.emailempre && params.direcempre && params.telefempre) {
		empresa.idempresa = params.idempresa;
		empresa.nombempre = params.nombempre;
		empresa.emailempre = params.emailempre;
		empresa.direcempre = params.direcempre;
		empresa.telefempre = params.telefempre;
		empresa.estaempre = 'Activo';
		
		//Validador de empresa Creada:
		Empresa.find({ $or: [
								{idempresa: empresa.idempresa},
								{nombempre: empresa.nombempre}
					]}).exec((err, empresas) =>{
					//Si sucede un error:
					if(err) return res.status(500).send({ message: 'Error al guardar la empresa' });
					//Si la empresa ya existe:
					if (empresas && empresas.lenght >=1) {
						return res.status(200).send({ message: 'La empresa Ya esta Registrada.' });
					}else{
						//Funcion para comprobar el guardado:
						empresa.save((err, enterStored) => {
							//Si ocurre algun error, nos indicará que no se puede guardar el usuario:
								if (err) return res.status(500).send({
									message: 'Error al guardar la empresa'
								});
								//Al salvar el usuario, enseñame el usuario guardado
								if (enterStored) {
									res.status(200).send({
										empresa: enterStored
									})
								//De lo contrario, mostrarme un mensaje de que no se ha registrado el usuario:
								}else{
									res.status(404).send({
										message: 'No se ha registrado la Empresa'
									});
								}
						});
					}
				});
		
	//Si no se han llenado los campos, me arroja el mensaje de campos obligatorios:
	}else{
		res.status(200).send({
			message: 'Llena todos los campos obligatorios'
		});
	}
}

/* Función para llamar los tipos de Usuarios: */
function getSector(req, res){
	Sector.find((err, sectorname)=>{
		if (err) return res.status(500).send({ message: 'Ha ocurrido un error en la base de datos' });
		if (!sectorname) return res.status(404).send({ message: 'No se encontraron respuestas guardadas' }); 

		// Devolver las respuestas:
		return res.status(200).send({
			sector: sectorname
		});
	}); 
}


/*
------------------------------------------------------- CRUD TipoUsuario: ---------------------------------------------------
*/
//Funcion Guardar Tipo de Usuario:
function savetiusua(req, res){
	//Tomar los datos por post desde el formulario:
	var params = req.body;
	//Constructor de Tipo de Usuario:
	var tipousua = new Tipousua();
	//Validador de Tipos de usuarios duplicados:
	Tipousua.findOne({ notiusua: tipousua.notiusua }).exec((err, tipouser)=>{
			if (err) return res.status(500).send({ message: 'Error al intentar guardar el tipo de usauario' });
			if (tipouser>= 1) {
				return res.status(200).send({ message: 'El tipo de usuario que intentas guardar ya existe' });
			}else{
				//Condicion de campos obligatorios:
				if (params.notiusua) {
					tipousua.notiusua = params.notiusua;
					tipousua.save((err, tiusStored) =>{
						if(err) return res.status(500).send({
						message: 'Error al Guardar el Tipo de Usuario'
						});
						//Enseñar el tipo de usuario guardado:
						if (tiusStored) {
							res.status(200).send({
								tipousua: tiusStored
							})
						}
					});
				}else{
					res.status(404).send({
						message: 'Debes llenar el nombre del Tipo de Usuario'
					});
				}
			}
		});
}
/* Función para llamar los tipos de Usuarios: */
function getPerfiles(req, res){
	Tipousua.find((err, perfiles)=>{
		if (err) return res.status(500).send({ message: 'Ha ocurrido un error en la base de datos' });
		if (!perfiles) return res.status(404).send({ message: 'No se encontraron respuestas guardadas' }); 

		// Devolver las respuestas:
		return res.status(200).send({
			perfil: perfiles
		});
	}); 
}

/*
------------------------------------------------------- CRUD TipoDocumento: ---------------------------------------------------
*/
//Funcion Guardar Tipo de Documentos:
function savetidocu(req, res){
	//Tomar los datos por post desde el formulario:
	var params = req.body;
	//Constructor de Tipo de Usuario:
	var tipodocu = new Tipodocu();

	//Validacion de datos duplicados:
	Tipodocu.find({ $or: [
							{idTidocu: tipodocu.idTidocu}, 
							{NombTiDo: tipodocu.NombTiDo}
				]}).exec((err, tipodocs)=>{
				//Si existe un error posible de conexion o de acoplamiento:
				if (err) return res.status(500).send({ message: 'Error al intentar guardar el tipo de documento'});
				//Si ya existe un documento con ese nombre o con ese identificador:
				if (tipodocu && tipodocu.lenght >=1) {
					return res.status(200).send({ message: 'El tipo de documento ya se encuentra registrado'});
				}else{
						//Condicion de campos obligatorios:
						if (params.NombTiDo) {
							tipodocu.idTidocu = params.idTidocu;
							tipodocu.NombTiDo = params.NombTiDo;
							tipodocu.save((err, tidoStored) =>{
								if(err) return res.status(500).send({
								message: 'Error al Guardar el Tipo de Documento '
								});
								//Enseñar el tipo de documento guardado:
								if (tidoStored) {
									res.status(200).send({
										tipodocu: tidoStored
									})
								}
							});
						}else{
							res.status(404).send({
								message: 'Debes llenar el nombre del Tipo de Documento'
							});
						}
				}

			});
}

/* Función para llamar los tipos de documentos: */
function getDocs(req, res){
	Tipodocu.find((err, tipodocs)=>{
		if (err) return res.status(500).send({ message: 'Ha ocurrido un error en la base de datos' });
		if (!tipodocs) return res.status(404).send({ message: 'No se encontraron respuestas guardadas' }); 

		// Devolver las respuestas:
		return res.status(200).send({
			identificador: tipodocs
		});
	}); 
}

/*
------------------------------------------------------- CRUD Municipio: ---------------------------------------------------
*/
function saveMuni(req, res){
	//Tomar los datos del formulario
	var params = req.body;
	//Constructor para salvar municipios
	var municipio = new Municipio();
	//Validacion de duplicados y guardado:
	Municipio.find({ $or: [
						{codimuni: municipio.codimuni},
						{nombmuni: municipio.nombmuni}
		]}).exec((err, municipio)=>{
			//Si existe un error al guardar:
			if (err) return res.status(500).send({ message: 'Error al intentar guardar el municipio'});
			//Si ya existe el municipio:
			if (municipio && municipio.lenght >=1) {
				return res.status(200).send({ message: 'El municipio que intentas guardar ya existe' });
			}else{
				if (params.codimuni && params.nombmuni) {

					municipio.codimuni = params.codimuni;
					municipio.nombmuni = params.nombmuni;

					municipio.save((err, muniStored)=>{
						if (err) return res.status(500).send({message: 'No se puede agregar el municipio'});
						if (muniStored) {
							res.status(200).send({
								municipio: muniStored
							})
						}else{
							res.status(404).send({ message: 'Debes llenar los campos necesarios para agregar el municipio' });
						}
					});

				}else{

				}
			}
		});
}
// Funcion para traer todos los Munbicipios:
function getMuni(req, res){
	var depto = 5;
	// La busqueda se realizará de acuerdo al país del que estemos buscando, si no se envía ningun país, por defecto trae los departamentos de Colombia:
	if (req.params.depto) {
		depto = req.params.depto;
	}

	Municipio.find({ codidepto: depto }, (err, municipios)=>{
		if (err) return res.status(500).send({ message: 'Error en la petición al servidor' });
		if (!municipios) {
			return res.status(404).send({ message: 'No se encontraron Departamentos guardados' });
		}else{
			return res.status(200).send({ Municipios: municipios });
		}
	});
}
/*
------------------------------------------------------- CRUD Departamento: ---------------------------------------------------
*/
function savedepto(err, res){
	var params = req.body;
	var departamento = new Departamento();

	//validador de departamentos dupicados:
	Departamento.find({ $or: [
		{codidepto: departamento.codidepto},
		{nombdepto: departamento.nombdepto}
	]}).exec((err, departamento)=>{
		if (err) return res.status(500).send({ message: 'Se ha presentado un error y no se puede guardar el Departamento' });
		if (departamento && departamento.lenght >=1) {
			return res.status(200).send({ message: 'El Departamento que intentas guardar ya existe' });
		}else{
			if (params.codidepto && params.nombdepto) {
				departamento.codidepto = params.codidepto;
				departamento.nombdepto = params.nombdepto;

				departamento.save((err, deptoStored)=>{
					if (err) return res.status(500).send({ message: 'Error al intentar guardar el departamento' });
					if (deptoStored) {
						res.status(200).send({ 
							departamento: deptoStored
						});
					}else{
						return res.status(404).send({ message: 'debes llenar todos los campos para guardar el Departamento' })
					}
				});
			}
		}
	});
}

// Funcion para traer todos los departamentos:
function getDepto(req, res){
	
	var pais = 57;

	// La busqueda se realizará de acuerdo al país del que estemos buscando, si no se envía ningun país, por defecto trae los departamentos de Colombia:
	if (req.params.pais) {
		pais = req.params.pais;
	}

	Departamento.find({ codipais: pais }, (err, departamentos)=>{
		if (err) return res.status(500).send({ message: 'Error en la petición al servidor' });
		if (!departamentos) {
			return res.status(404).send({ message: 'No se encontraron Departamentos guardados' });
		}else{
			return res.status(200).send({ Departamentos: departamentos });
		}
	});
}
/*
------------------------------------------------------- CRUD Pais: ---------------------------------------------------
*/
function savePais(res, req){
	var params = req.body;
	var pais = new Pais();

	//validador de paises duplicados y almacenaje de pais:
	Pais.find({ $or: [
			{codipais: pais.codipais},
			{nombpais: pais.nombpais}
		]}).exec((err, pais)=>{
			if (err) return res.status(500).send({ message: 'Se ha presentado un error y no se puede guardar el pais.' });
			if (pais && pais.lenght>=1) {
				return res.status(200).send({ message: 'El pais que intentas guardar ya existe' });
			}else{
				if (params.codipais && params.nombpais) {
					pais.codipais = params.codipais;
					pais.nombpais = params.nombpais;
					pais.save((err, paisStored)=>{
						if (err) return res.status(500).send({ message: 'Error al intentar guardar el pais' });
						if (paisStored) {
							res.status(200).send({
								pais: paisStored
							});
						}else{
							return res.status(404).send({ message: 'Debes llenar todos los campos necesarios para guardar el pais' });
						}
					});
				}
			}
		});

}
/*
------------------------------------------------------- Fin de CRUD : ---------------------------------------------------
*/

//Exportar funciones:
module.exports = {
	//Metodos de Empresa:
	saveenter,
	getSector,
	//Metodos de TipoUsua:
	savetiusua,
	getPerfiles,
	//Metodos de TipoDocu:
	savetidocu,
	getDocs,
	//Metodos de Municipio:
	saveMuni,
	getMuni,
	//Metodos de departamento:
	savedepto,
	getDepto,
	//Metodos de pais:
	savePais
}