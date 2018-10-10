import { Component } from '@angular/core';
import * as $ from 'jquery';
import * as d3 from "d3";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  public title: string;
  public descripcion: string;
  public herramientas: string;

  constructor(){
  	this.title= 'RiskPsico';
  	this.descripcion= 'Software para TFM: Analithyc View and BigData';
  	this.herramientas= 'http://www.gideaonline.com/wp-content/uploads/2015/10/logo-mean.png';
  }
}
