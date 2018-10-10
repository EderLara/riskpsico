import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empresa } from '../../models/empresa';


@Component({
	selector: 'register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{
	public title: string;
	public empresa: Empresa;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = 'Registra tu Empresa...!';
		this.empresa = new Empresa("","","","","","","","","","","En Evaluación");
	}

	ngOnInit(){
		console.log('Cargando componente de register...');
	}
	
}