import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit{
	public title: string;
	public logo: string;

	constructor(){
		this.title= 'Modulo de Administración';
		this.logo = 'assets/media/img/Eder.png';
	}

	ngOnInit(){
		console.log('Cargando componente de Administrador...');
	}
}