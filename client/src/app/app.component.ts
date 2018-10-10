import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LoginService ]
})
export class AppComponent  implements OnInit, DoCheck{
  public title: string;
  public descripcion: string;
  public herramientas: string;
  public usuario;
  public respuesta;
  public logo;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginservice: LoginService
    )
  {
  	this.title = 'Riskpsico';
  	this.descripcion = 'Instrumento para medir el Riesgo Psicosocial';
  	this.herramientas = 'assets/media/img/mean.png';
    this.logo = 'assets/media/img/Eder.png';
  }
  ngOnInit(){
    this.usuario = this._loginservice.getIdentidad();
    //console.log(this.usuario);
  }
  // Funcion para actualizar la pagina 
  ngDoCheck(){
    //this.respuesta= this._testservice.register;
    this.usuario= this._loginservice.getIdentidad();
   // console.log(this.usuario);
  }
  // Metodo de Cerrar Sesión:
  logout(){
    localStorage.clear();
    this.usuario = null;
    this._router.navigate(['/']);
  }
}
