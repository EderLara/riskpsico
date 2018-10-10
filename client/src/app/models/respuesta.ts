export class Respuesta{
	constructor(
		public _id: string,
		public numero: number,
		public empresa: string,
		public fecha: number,
		public semestre: string,
		public genero: string,
		public nacimiento: string,
		public estrato: string,
		public estacivil: string,
		public trabaja: string,
		public pedagogia: string,
		public calidad : string,
		public servicios : string,
		public percepcion: string,
		public estaestudiante: string
		){
		this.empresa = '5b2f31e49a126a2394938c10';
		this.fecha = Date.now();
	}
}
