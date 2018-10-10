import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	providers: [ UserService ]
})
export class LoginComponent implements OnInit{
	public tingreso: string;
	public imagen: string;
	public user: User;
	public identidad;
	public token;
	public estado: string;

	constructor(
		// Variables Privadas:
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
		)

	{

		this.tingreso= 'Identificate';
		this.imagen= 'assets/img/eder.png';
		this.user = new User("","","","","","","","","","");
		
	}

	ngOnInit(){
		console.log('Cargando componente de login...');
	}
	// Control de inicio de sesion:
	onSubmit(){
		// console.log(this.user);
		// Loguear al usuario y capturar sus datos:
		this._userService.signup(this.user).subscribe(
			response => {
				
				this.identidad = response.user;
				// console.log(response.user);
				if (!this.identidad || !this.identidad._id) {
					// Si no obtenemos ningun objeto con los datos del usuario (identidad), marcamos el estado como un error:
					this.estado = 'Error';
				}
				else{
					// Asignar el estado de logueado y persistir los datos:
					this.estado = 'Logueado';
					// console.log(this.identidad);
					console.log(this.estado);
					// Persistir el token del usuario, y conseguir estadisticas. LocalStorage es una funcion de Angular para almacenar los datos en forma de texto:
					localStorage.setItem('identidad', JSON.stringify(this.identidad));

					// Conseguir el Token:
					this.getToken();
				}
			},
			error => {
				var errorMsg =<any>error;
				console.log(errorMsg);

				if (errorMsg != null) {
					// Si no existe ningun error asignar valores de éxito:
					this.estado = 'Error';
				}
			}
			);	
	}
	getToken(){
		// Capturar el token del usuario
		this._userService.signup(this.user, 'true').subscribe(
			response => {
				
				this.token = response.token;
				//console.log(this.token);
				if (this.token.length <= 0) {
					// Si no obtenemos ningun objeto con los datos del usuario (identidad), marcamos el estado como un error:
					this.estado = 'Error';
				}
				else{
					// Asignar el estado de logueado y persistir los datos:
					this.estado = 'Logueado';
					console.log(this.estado);

					// Persistir el token del usuario, este ya es un string por lo que no es necesario comvertirlo:
					localStorage.setItem('token', this.token);

					// Estadisticas:

					// Redireccionamos al admin:
					this._router.navigate(['/admin']);
				}
			},
			error => {
				var errorMsg =<any>error;
				console.log(errorMsg);

				if (errorMsg != null) {
					// Si no existe ningun error asignar valores de éxito:
					this.estado = 'Error';
				}
			}
			);	
	}
}