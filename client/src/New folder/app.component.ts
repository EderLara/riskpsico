import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent {
  public title: string;
  public descripcion: string;
  public herramientas: string;
  public logo: string;
  public usuario;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
    ){
  	this.title = 'RiskPsico';
    this.logo = 'assets/media/img/Eder.png'
  	this.descripcion = 'Software para TFM: Analithyc View and BigData';
  	this.herramientas = 'assets/media/img/mean.png';
  }
  ngOnInit(){
    this.usuario = this._userService.getIdentidad();
    //console.log(this.usuario);
  }
  // Funcion para actualizar la pagina 
  ngDoCheck(){
    //this.respuesta= this._testservice.register;
    this.usuario= this._userService.getIdentidad();
   // console.log(this.usuario);
  }
  // Metodo de Cerrar Sesión:
  logout(){
    localStorage.clear();
    this.usuario = null;
    this._router.navigate(['/']);
  }
}


