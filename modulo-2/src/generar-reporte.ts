import type { EstadoMatricula } from "./domain/types/estado-matricula.js";

export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      return `Matrícula activa con ${estado.asignaturas.length} asignatura(s) inscrita(s).`;
    case "SUSPENDIDA":
      return `Matrícula suspendida. Motivo: ${estado.motivo}`;
    case "FINALIZADA":
      return `Matrícula finalizada. Nota media: ${estado.notaMedia.toFixed(2)}`;
  }
}
