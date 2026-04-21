import type { Asignatura, Estudiante } from "./domain/types/entidades.js";
import type { EstadoMatricula } from "./domain/types/estado-matricula.js";
import { generarReporte } from "./generar-reporte.js";
import { obtenerRecurso } from "./services/api-client.js";

const asignaturaEjemplo: Asignatura = {
  id: "ASG-001",
  nombre: "Programación I",
  creditos: 6,
  codigo: "INF101",
};

const activa: EstadoMatricula = {
  tipo: "ACTIVA",
  asignaturas: [asignaturaEjemplo],
};

const suspendida: EstadoMatricula = {
  tipo: "SUSPENDIDA",
  motivo: "Falta de documentación académica.",
};

const finalizada: EstadoMatricula = {
  tipo: "FINALIZADA",
  notaMedia: 8.25,
};

console.log(generarReporte(activa));
console.log(generarReporte(suspendida));
console.log(generarReporte(finalizada));

async function demoApi(): Promise<void> {
  const estudiante = await obtenerRecurso<Estudiante>("/api/estudiantes/EST-001");
  console.log("API estudiante:", estudiante);

  const asignaturaApi = await obtenerRecurso<Asignatura>("/api/asignaturas/ASG-042");
  console.log("API asignatura:", asignaturaApi);

  const fallo = await obtenerRecurso<Estudiante>("/api/error");
  console.log("API error:", fallo);
}

void demoApi();
