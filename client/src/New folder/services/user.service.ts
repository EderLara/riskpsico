import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { User } from '../models/users';

@Injectable()
export class UserService {
	public url:string;
	public identidad;
	public token;

	// Constructor para incluir la url de la api:
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	// Funcion para pasar los datos del form al back-end
	signup(usuario, gettoken = null ): Observable<any>{
		// Comprobamos que exista un token valido: 
		if (gettoken != null) {
			// Recogemos el parametro tokken del inicio de sesión.
			usuario.gettoken = gettoken;
		}
		let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'ingreso', params, {headers: headers});
	}
	// Funcion para obtener los datos del usuario Logueado:
	getIdentidad(){
		// Variable para traer los datos del usuario y convertirlos a JSON:
		let identidad = JSON.parse(localStorage.getItem('identidad'));
		// Validacion de la identidad del usuario:
		if (identidad != undefined) {
			// Si la variable identidad tiene datos de tipo string parseados a JSON se la pasamos a this.identidad:
			this.identidad = identidad;
			console.log(this.identidad);
		}else{
			this.identidad = null;
		}
		
		// devolvemos el valor de identidad:
		return this.identidad;
		
	}
	// Funcion para obtener el token de identidad:
	getToken(){
		// Variable para traer el token del inicio de sesion:
		let token = localStorage.getItem('token');
		// Validacion del token:
		if (token != undefined) {
			// Si el token es diferente a indefinido le pasamos el valor obtenido a this.token 
			this.token = token;
			console.log(this.token);
		}else{
			this.token = null;
		}
		// Devolvemos el valor de token:

		return this.token;
		
	}
}