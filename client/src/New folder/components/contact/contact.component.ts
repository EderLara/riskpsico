import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'contact',
	templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit{
	public title: string;

	constructor(){
		/*this.title= 'Identificate';*/
	}

	ngOnInit(){
		console.log('Cargando componente de contact...');
	}
}