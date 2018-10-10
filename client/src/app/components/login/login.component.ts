import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/users';
import { LoginService } from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	providers: [LoginService]
})
export class LoginComponent implements OnInit{
	public tingreso: string;
	public imagen: string;
	public user: User;
	public identidad;
	public perfil;
	public token;
	public estado: string;
	public tpoliticas: string;

	constructor(
		// Variables Privadas:
		private _route: ActivatedRoute,
		private _router: Router,
		private _loginService: LoginService
		)

	{
		this.imagen = 'assets/media/img/ingreso.png';
		this.tingreso= 'INGRESA';
		this.user = new User("","","","","","","","","","");
		this.tpoliticas = 'Política de privacidad de RiskPsico';
		
	}

	ngOnInit(){
		console.log('Cargando componente de login...');
	}
	// Control de inicio de sesion:
	onSubmit(){
		// Loguear al usuario y capturar sus datos:
		this._loginService.signup(this.user).subscribe(
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
					//console.log(this.estado);
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
		this._loginService.signup(this.user, 'true').subscribe(
			response => {
				
				this.token = response.token;
				//console.log(this.token);
				if (this.token.length <= 0) {
					// Si no obtenemos ningun objeto con los datos del usuario (identidad), marcamos el estado como un error:
					this.estado = 'Error';
				}
				else{
					// Asignar el estado de logueado y persistir los datos:
					//this.estado = 'Logueado';
					//console.log(this.identidad);

					// Persistir el token del usuario, este ya es un string por lo que no es necesario comvertirlo:
					localStorage.setItem('token', this.token);

					// Estadisticas (aún no...):

					// Vamos a traer el tipo de usuario y lo asignamos a la variable perfil:
					this.perfil = this.identidad.tipousua;
					// Redireccionamos a la página del usuario que corresponda:
					switch (this.perfil) {
						case "5ad4fdde8ba8711450b55bce":
							// Cuando el rol que juegue el usuario sea Administrador:
							this._router.navigate(['/admin']);
							break;
						
						default:
							// En caso de que sea Empleado u Otro:
							this._router.navigate(['/usuario']);
							break;
					}
					
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