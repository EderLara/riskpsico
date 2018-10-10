import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { GLOBAL } from './global';

@Injectable()
export class EmpresaService{
	public url:string;
	public identidad;
	public token;

	// Constructor para incluir la url de la api:
	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getSector(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'/sectores', {headers: headers });
	}
}