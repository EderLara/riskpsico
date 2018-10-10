import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/user.service';
import { DatoService } from '../../services/datousua.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TipoDocu } from '../../models/tipodocu';

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	providers: [ DatoService ]
})
export class UserComponent implements OnInit{
	public usuario;
	public tipodoc;
	public usuarioimg: string;
	public msjdocs: string;

	constructor(
		private _loginservice: LoginService,
		private _datoservice: DatoService,
		private _route: ActivatedRoute,
		private _router: Router
		){
		this.usuarioimg = 'assets/media/img/usuario.png';
		
	}

	ngOnInit(){
		console.log('Cargando componente de Usuario...');
		this.usuario = this._loginservice.getIdentidad();
		this.getDocs();
	}
	// Funcion para traer los tipos de Documentos: 
	getDocs(){
		this._datoservice.getTipoDocu().subscribe(
			response=>{
				if (!response.tipodocs) {
					// Si no obtenemos respuesta o tenemos un error:
					this.msjdocs = 'Error al tratar de obtener los tipos de documentos';
					console.log(this.msjdocs);
				}else{
					this.msjdocs = 'Listamos los usuarios en un arreglo'
					// Asignamos los resultados obtenidos a la variable:
					this.tipodoc = response.tipodocs;
					console.log(this.tipodoc);

				}
			},
			error=>{
				var errorMsj = <any>error;
				console.log(errorMsj);
				// Validar si el mensaje es diferente de null
				if (errorMsj != null) {
					// code...
					this.msjdocs = 'error en la peticion, no se han obtenido datos';
					console.log(this.msjdocs);
				}
			});
	}
}