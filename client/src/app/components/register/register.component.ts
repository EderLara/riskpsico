import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { Sectores } from '../../models/sectores';
import { EmpresaService } from '../../services/empresa.service';
import { NgbCarouselConfig  } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	providers: [NgbCarouselConfig, EmpresaService]
})
export class RegisterComponent implements OnInit{
	public title: string;
	public empresa: Empresa;
	public images: string;
	public sectores: Sectores;
	public estasect: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _empresaService: EmpresaService
	){
		this.title = 'Registra tu Empresa...!';
		this.empresa = new Empresa("","","","","","","","","","","","En Evaluación");
		this.images = 'assets/media/img/slide/1.png';
		this.getSector();

	}

	ngOnInit(){
		console.log('Cargando componente de register...');
	}
	getSector(){
		this._empresaService.getSector().subscribe(
			response=>{
				if (!response.sector) {
					// Si al hacer la consulta no obtenemos nada, asignamos el valor de EstaInforme:
					this.estasect = 'error al obtener los datos';
					console.log(this.estasect);
				}else{
					this.estasect = 'Ok';
					console.log(response);
					// Asignamos los resultados obtenidos a la variable:
					this.sectores = response.sector;
					
				}
			},
			error=>{
				var errorMsj = <any>error;
				console.log(errorMsj);
				// Validar si el mensaje es diferente de null
				if (errorMsj != null) {
					// code...
					this.estasect = 'error en la peticion, no se han obtenido datos';
					console.log(this.estasect);
				}
			}
		)
	}
	
}