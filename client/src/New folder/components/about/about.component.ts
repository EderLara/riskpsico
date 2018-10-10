import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'about',
	templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit{
	public title: string;

	constructor(){
		/*this.title= 'Identificate';*/
	}

	ngOnInit(){
		console.log('Cargando componente de about...');
	}
}