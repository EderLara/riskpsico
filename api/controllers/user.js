/*
Archivo control de usuario para todas las acciones que demande el usuario dentro del sistema:
*/
/*
Opcionamos por las novedades del 
lenguaje Javascript:
*/
'use strict'

/*
Importaremos los modelos que  vamos a necesitar
Importamos el modelo del usuario, por eso colocamos el nombre de la variable "User" con letra capital:
*/
var User = require('../models/user');
var Empresa = require('../models/empresa');
var TipoUsua = require('../models/tipousua');
var DatoUsua = require('../models/datosusua');
/*
Importamos el modulo bcrypt, para las contraseñas:
*/
var bcrypt = require('bcrypt-nodejs');
/*
Importamos el servicio jwt encargado de los tokens:
*/
var jwt = require('../services/jwt');
/*
Cargamos el mongoose de paginacion:
*/
var mongoosePaginate = require('mongoose-pagination');
/*
Cargamos la libreria file system del nodejs, y cargamos junto con el filesystem, el gestor de rutas:
*/
var fs = require('fs');
var path = require('path');
/*
Crearemos los metodos de prueba para verificar que podemos agregar mas metodos:
Para ello usaremos las rutas que teniamos en app.js (recordemos que estas son de pruebas), 
y creamos nuestra funcion basada en estos metodos:
La primera sera la ruta de la raiz (/) y luego pruebas (/pruebas)
*/
function home(req, res){
	res.status(200).send({
		message: 'Desde aquí tambien ingresamos a la raiz del servidor NodeJS'
	});
}
// Segunda Funcion:
function pruebas(req, res){
	console.log(req.body);
	res.status(200).send({
		message: 'Por acá tambien ingresamos a la ruta pruebas'
	});
}

/*---------------------------------------- CRUD Usuario: ----------------------------------------*/

// Funcion para guardar usuario:
function saveuser(req, res){
	// Recoger los parametros de la peticion desde un formulario:
	var params = req.body;
	// var tipous = req.params.id;
	// Constructor de Nuevo Usuario:
	var usuario = new User();
	// Condicionamos la recepcion de los campos obligatorios:
	if (params.idusuario && params.nombusua && params.emailusua && params.passusua) {
		// Asignamos el valor obtenido por post a las variables:
		usuario.tipousua = params.tipousua; 
		usuario.empresa = params.empresa;
		usuario.idusuario = params.idusuario;
		usuario.nombusua = params.nombusua;
		usuario.apelusua = params.apelusua;
		usuario.image = null;
		usuario.emailusua = params.emailusua;

		// Validador de usuario duplicado:
		User.find({ $or: [
							{emailusua: usuario.emailusua.toLowerCase()}, 
							{idusuario: usuario.idusuario}
					]}).exec((err, users) =>{
						// Si ocurre un error:
						if(err) return res.status(500).send({ message: 'Error al guardar el usuario' });
						// Si encuentra usuarios en la base de datos:
						if(users && users.length >= 1) {
							return res.status(200).send({ message: 'El usuario que intenta guardar ya Existe!!' });
						}else{
							// Encriptamos el password para ello empleamos la encriptacion hash; y procedemos a guardar el usuario 
							bcrypt.hash(params.passusua, null, null, (err, hash) =>{
								usuario.passusua = hash;

								// Despues de encriptar el password, salvamos en la base de datos:
								usuario.save((err, userStored) => {
									// Si ocurre algun error, nos indicará que no se puede guardar el usuario:
									if (err) return res.status(500).send({
										message: 'Error al guardar el usuario'
									});console.log(req.body);
									// Al salvar el usuario, enseñame el usuario guardado
									if (userStored) {
										res.status(200).send({
											user: userStored
										})
									// De lo contrario, mostrarme un mensaje de que no se ha registrado el usuario:
									}else{
										res.status(404).send({
											message: 'No se ha registrado el usuario'
										});
									}
								});
							});
							// Almacenamos la ultima columna o el ultimo registro el documento
							usuario.estausua = 'Activo';
						}
					});
	
		
	}else{
		// Si no se cumple la condición, entonces no solicitará llenar todo el formulario:
		res.status(200).send({
			message: 'Llena los campos necesarios'
		});
	}

}
// Fin del metodo de guardar usuario
// ----------------------------------------------------------- //  
// Inicio de sesion de Usuario:
function loginUser(req, res){
	// Recogemos los datos del formulario:
	var params = req.body;
	var username = params.emailusua;
	var password = params.passusua;

	//  Query para comprobar usuario y contraseña en la base de datos:

	User.findOne({emailusua: username}, (err, user)=>{
		// Si existe algun error:
		if (err) return res.status(500).send({ message: 'Error en la peticion, Revisa la conexion a la base de datos' });
		if (user) {
			// Encriptamos el password y comparamos utilizando el metodo "compare":
			bcrypt.compare(password, user.passusua, (err, check) =>{
				if (check) {
					// check es un parametro para determinar el chequeo es decir, que todo va bien
					// Si check es correcto, devolverempos un token:
					if (params.gettoken) {
						// Generar y Devolver token:, importante crear carpeta services, y dentro el archivo jwt.js
						return res.status(200).send({
							token: jwt.createToken(user)
						});
						// A esta altura crear la carpeta middleware
					}else{
						// Devolvemos datos de usuario:
						return res.status(200).send({ user });
					}
				}else{
					// Si no va bien, retornamos:
					return res.status(404).send({ message: 'El usuario no ha sido identificado' });
				}
			});
		}else{
			return res.status(404).send({ message: 'El usuario no ha sido identificado o no existe!!' });
		}
	}); // Fin de la consulta
}
// Fin de iniciar sesion
// ----------------------------------------------------------- //  
// Inicio de metodo de buscar Un usuario por id de usuario:
function getUser(req, res){
	// Recogemos el id por URL, cuando es por URL utilizamos .params, cuando es por post o get usamos .body
	var userId = req.params.id;

	User.findById(userId, (err, user) =>{
		// validamos si hay algun error de conexion a la bd o de ejecucion:
		if (err) return res.status(500).send({ 
			message: 'Ha habido un error en la conexion o en la busqueda del Usuario'
		});
		if (!user) return res.status(404).send({
			message: 'No se han encontrado conincidencias con el parametro de busqueda'
		});
		// Si encuentra al usuario, nos muestra al usuario:
		return res.status(200).send({ user });
	});
}
// Fin de Buscar un usuario
// ----------------------------------------------------------- //  
// ----------------------------------------------------------- //  
// Inicio de metodo de buscar la poblacion, o todos los usuarios:
function getPoblacion(req, res){
	// Recogemos el id por URL, cuando es por URL utilizamos .params, cuando es por post o get usamos .body

	DatoUsua.find((err, poblacion) =>{
		// validamos si hay algun error de conexion a la bd o de ejecucion:
		if (err) return res.status(500).send({ 
			message: 'Ha habido un error en la conexion o en la busqueda del Usuario'
		});
		if (!poblacion) return res.status(404).send({
			message: 'No se han encontrado conincidencias con el parametro de busqueda'
		});
		// Si encuentra al usuario, nos muestra al usuario:
		return res.status(200).send({ poblacion });
	});
}
// Fin de Buscar un usuario
// ----------------------------------------------------------- //  
// Inicio de metodo listar usuarios:
function getUsers(req, res){
	// usuar del middleware la propiedad sub que es el Id de usuario logueado:
	var idsUserid = req.user.sub;

	// Variable para paginar, por defecto = 1:
	var pagina = 1;

	if (req.params.pagina) {
		pagina = req.params.pagina;
	}
	// Variable para determinar la cantidad de usuarios conectados
	var itemsPerPage = 25;

	// Query de busqueda de usuarios en la BD:
	User.find().sort('_id').paginate(pagina, itemsPerPage, (err, users, total) =>{
		// validamos si hay algun error de conexion a la bd o de ejecucion:
		if (err) return res.status(500).send({ 
			message: 'Ha habido un error en la conexion o en la busqueda del Usuario'
		});
		// Si no obtenemos ningun usuario:
		if (!users) return res.status(404).send({
			message: 'No hay Usuarios Disponibles!.'
		});
		// Respuesta con lista de todos los usuarios:
		return res.status(200).send({
			users,
			total,
			paginas: Math.ceil(total/itemsPerPage)
		});
	});

}
// Fin de listar usuarios
// ----------------------------------------------------------- //  
// Funcion actualizar usuarios:
function updateUser(req, res){
	// Variable de url para recoger el id del usuario a modificar:
	var userId = req.params.id;
	var update = req.body;

	// Borrar la propiedad password:
	delete update.password;

	if (userId != req.user.sub) {
		return res.status(500).send({ message: 'No tienes permiso para actualizar los datos de usuario, debes iniciar sesion' });
	}
	User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) =>{
		// Si ocurre un error inesperado de servicios:
		if(err) return res.status(500).send({message: 'Error en la Peticion, error de servidor' });
		// Si no se encuentran datos del usuario:
		if(!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar al usuario '});

		// Si todo sale bien devuelve al usuario modificado:
		return res.status(200).send({ user: userUpdated });
	});
}
// Fin de Actualizar campos del usuario:
// ----------------------------------------------------------- //  
// Actualizar campo de imagen

function addImage(req, res){
	// Variables de obtencion del dato desde el front:
	var userId = req.params.id;

	// Subir imagen:
	if (req.files) {
		// Ponemos el archivo a subir en una variable, image es el nombre del campo que debe tener el input:
		var filePath = req.files.image.path;
		// Se toman los separadores de la ruta del archivo y se eliminan:
		var fileSplit = filePath.split('\\');
		console.log(fileSplit);
		// Variable con el nombre del archivo, se carga el valor del campo 2 del fileSplit:
		var fileName = fileSplit[2];
		console.log(fileName);
		// Buscamos la extencion para validar que sea una imagen, ya que hasta ahora solo guardamos un archivo sin importar la extension:
		var fileExt = fileName.split('\.');
		console.log(fileExt);
		var extFile = fileExt[1];

		// Solo el usuario dueño de la cuenta puede subir imagenes:
		if (userId != req.user.sub) {
			// Llamamos a la funcion que elimina el archivo de la carpeta uploads:
			removerarchivo(res, filePath, 'No tienes permiso para actualizar los datos de usuario, debes iniciar sesion');
		}
		// Comprobamos que las extenciones son correctas:
		if (extFile == 'png' || extFile == 'jpg' || extFile == 'jpeg' || extFile == 'bmp' || extFile == 'gif') {
			//  Estas seran las extenciones validas que le permitiremos al usuario, para guardar en la base de datos:
			User.findByIdAndUpdate(userId, {image: fileName}, {new: true}, (err, userUpdated) =>{

				// Si ocurre un error inesperado de servicios:
				if(err) return res.status(500).send({message: 'Error en la Peticion, error de servidor' });
				// Si no se encuentran datos del usuario:
				if(!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar al usuario '});

				// Si todo sale bien devuelve al usuario modificado:
				return res.status(200).send({ user: userUpdated });

			});
		}else{
			// Llamamos a la funcion que elimina el archivo de la carpeta uploads:
			removerarchivo(res, filePath, 'Extensión no Válida!');
		}
	}else{
		// retornamos 
		return res.status(200).send({ message: 'No se han enviado ningun archivo' });
	}
}
// Fin de cargar imagen.
// ----------------------------------------------------------- //  

// Funcion auxiliar, o metodo para elimiar archivos de la carpeta uploads/usuarios :
function removerarchivo(res, filePath, message){
	//  El arhivo no es una imagen, por lo que lo vamos a eliminar del directorio, para eso usamos el metodo unlink, y la variable fs:
	fs.unlink(filePath, (err) =>{
		return res.status(200).send({ message: message });
	});
}

// ----------------------------------------------------------- //  

// Funcion para devolver la imagen del usuario:
function getImageFile(req, res){
	// variable del archivo imagen a devolver:
	var imageFile = req.params.imageFile;
	// variable de la ruta de la imagen:
	var pathFile = './uploads/usuarios/'+imageFile;
	// Comprobamos que el arhivo existe: 
	fs.exists(pathFile, (exists) =>{
		if (exists) {
			res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({ message: 'No existe la imagen' });
		}
	});

}
// Fin de mostrar imagen.
// ----------------------------------------------------------- //  
/*------------------------------------ FIN CRUD Usuario: ----------------------------------------*/

/*------------------------------------ INICIO CRUD Datos Usuario: ----------------------------------------*/



/*------------------------------------ FIN CRUD Datos Usuario: ----------------------------------------*/

// Exportamos el json que contiene las funciones del controlador, por cada funcion se debe agregar a este json::
module.exports = {
	home,
	pruebas,
	saveuser,
	loginUser,
	getUser,
	getPoblacion,
	getUsers,
	updateUser,
	addImage,
	getImageFile
}
// agregar la ruta en la carpeta routes

