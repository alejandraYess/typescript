import {
  calcularMedia,
  calcularMediana,
  filtrarAtipicos,
} from "./math-utils.js";

const muestra = [2, 4, 6, 8, 100, 10, 12];

console.log("Datos:", muestra);
console.log("Media:", calcularMedia(muestra));
console.log("Mediana:", calcularMediana(muestra));

const limite = 15;
console.log(`Sin atípicos (|x - media| <= ${limite}):`, filtrarAtipicos(muestra, limite));

console.log("Media array vacío:", calcularMedia([]));
console.log("Mediana array vacío:", calcularMediana([]));
console.log("Filtrar vacío:", filtrarAtipicos([], 5));
