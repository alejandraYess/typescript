export function calcularMedia(datos: number[]): number | null {
  if (datos.length === 0) {
    return null;
  }
  const suma = datos.reduce((acc, n) => acc + n, 0);
  return suma / datos.length;
}

export function calcularMediana(datos: number[]): number | null {
  if (datos.length === 0) {
    return null;
  }
  const ordenados = [...datos].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);
  if (ordenados.length % 2 === 1) {
    const central = ordenados[mitad];
    return central ?? null;
  }
  const izquierda = ordenados[mitad - 1];
  const derecha = ordenados[mitad];
  if (izquierda === undefined || derecha === undefined) {
    return null;
  }
  return (izquierda + derecha) / 2;
}

export function filtrarAtipicos(datos: number[], limite: number): number[] {
  const media = calcularMedia(datos);
  if (media === null) {
    return [];
  }
  return datos.filter((valor) => Math.abs(valor - media) <= limite);
}
