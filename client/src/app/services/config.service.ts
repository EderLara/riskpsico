import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { GLOBAL } from './global';
import { Departamento } from '../models/Departamento';
import { Municipio } from '../models/Municipio';

@Injectable()
export class TestService{
	public url:string;

	// Constructor para incluir la url de la api:
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	// Metodos para registro de prueba:
	register(depto :Departamento ): Observable<any>{
		console.log(depto);
		let params = JSON.stringify(depto);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.get(this.url+'/departamentos/'+depto, {headers: headers});
	}
}