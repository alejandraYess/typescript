export interface Estudiante {
  readonly id: string;
  nombreCompleto: string;
  email: string;
  carrera: string;
}

export interface Asignatura {
  readonly id: string;
  nombre: string;
  creditos: number;
  codigo: string;
}
