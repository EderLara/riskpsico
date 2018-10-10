export class Opcion{
	constructor(
		public _id: string,
		public tipoPregu: string,
		public pregunta: string,
		public marca: string, //marca será la letra asignada a la opción, y con esta se valida la respuesta del usuario
		public txtOpcion: string,
		public valor: string,
	){}
}