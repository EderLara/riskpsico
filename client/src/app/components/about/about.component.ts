import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'about',
	templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit{
	public title: string;
	public logo: string;

	constructor(){
		/*this.title= 'Identificate';*/
		this.logo= '/assets/media/img/Eder.png';
	}

	ngOnInit(){
		console.log('Cargando componente de about...');
	}
}