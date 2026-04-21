export interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}

const DEMORA_MS = 150;

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function construirRespuesta<T>(endpoint: string): RespuestaAPI<T> {
  if (endpoint.includes("/error")) {
    return {
      codigoEstado: 500,
      exito: false,
      datos: {} as T,
      errores: ["Error simulado: recurso no disponible."],
    };
  }

  if (endpoint.includes("/estudiantes")) {
    return {
      codigoEstado: 200,
      exito: true,
      datos: {
        id: "EST-001",
        nombreCompleto: "Ana Pérez",
        email: "ana.perez@uni.edu",
        carrera: "Ingeniería Informática",
      } as T,
    };
  }

  if (endpoint.includes("/asignaturas")) {
    return {
      codigoEstado: 200,
      exito: true,
      datos: {
        id: "ASG-042",
        nombre: "Bases de datos",
        creditos: 6,
        codigo: "INF201",
      } as T,
    };
  }

  return {
    codigoEstado: 404,
    exito: false,
    datos: {} as T,
    errores: [`Sin datos simulados para la ruta: ${endpoint}`],
  };
}

export async function obtenerRecurso<T>(
  endpoint: string,
): Promise<RespuestaAPI<T>> {
  await esperar(DEMORA_MS);
  return construirRespuesta<T>(endpoint);
}
