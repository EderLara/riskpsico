import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import 'rxjs-compat/add/operator/map';
import { GLOBAL } from './global';
import { TipoDocu } from '../models/tipodocu';

@Injectable()
export class DatoService{
	public url:string;

	// Constructor para incluir la url de la api:
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	// Metodos para registro de prueba:
	/*
	register(test :Respuesta ): Observable<any>{
		console.log(test);
		let params = JSON.stringify(test);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.post(this.url+'/test/respuesta', params, {headers: headers});
	}
	*/
	getTipoDocu():Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'/tipodocs', {headers: headers });//.map(res=> res.json());
		//console.log(this._http.get(this.url+'/tipodocs', {headers: headers }));
	}
}