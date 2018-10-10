export class User{
	constructor(
		public _id: string,
		public tipousua: string,
		public empresa: string,
		public idusuario: string,
		public nombusua: string,
		public apelusua: string,
		public image: string,
		public emailusua: string,
		public passusua: string,
		public estausua: string
		){
		this.empresa = '5b2f31e49a126a2394938c10';
		this.tipousua = 'Estudiante';
	}
}