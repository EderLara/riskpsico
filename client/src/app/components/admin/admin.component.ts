import {Component, OnInit} from '@angular/core';
import { LoginService } from '../../services/user.service';
import { Respuesta } from '../../models/respuesta';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit{
	public title: string;
	public logo: string;
	public usuario;

	constructor(
		private _loginservice: LoginService,
		private _route: ActivatedRoute,
		private _router: Router,
	){
		this.title= 'Modulo de Administración';
		this.logo = 'assets/media/img/Eder.png';
	}

	ngOnInit(){
		console.log('Cargando componente de Administrador...');
		this.usuario = this._loginservice.getIdentidad();
	}
}