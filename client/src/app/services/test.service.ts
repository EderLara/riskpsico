import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { GLOBAL } from './global';
import { Respuesta } from '../models/respuesta';

@Injectable()
export class TestService{
	public url:string;

	// Constructor para incluir la url de la api:
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	// Metodos para registro de prueba:
	register(test :Respuesta ): Observable<any>{
		console.log(test);
		let params = JSON.stringify(test);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.post(this.url+'/test/respuesta', params, {headers: headers});
	}
}