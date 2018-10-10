import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'politicas',
	templateUrl: './politicas.component.html'
})
export class PoliticComponent implements OnInit{
	public titulo: string;

	constructor(){
		/*this.titulo= 'Identificate';*/
	}

	ngOnInit(){
		console.log('Cargando componente de about...');
	}
}