# Práctica 4 — Módulo 2

# Modelo de datos y decisiones de diseño (TypeScript)

## 1. Entidades principales: Estudiante y Asignatura


**Estudiante** con `id` en **solo lectura** (`readonly`), más `nombreCompleto`, `email` y `carrera`. El `readonly` en el id, porque en un sistema real ese identificador no debería mutar por accidente si pasas el objeto por varias funciones. Si se equivoca alguien, TypeScript lo para en compilación.

**Asignatura** con `readonly id`, `nombre`, `creditos` y `codigo`. Sirve para listar en qué asignaturas está inscrito un alumno cuando la matrícula está **ACTIVA**.

---

## 2. Estado de matrícula (unión discriminada)

Un solo objeto con todo opcional (`motivo?`, `notaMedia?`…) permite estados imposibles. Por eso hay **tres interfaces** y un solo tipo unión:

- **MatriculaActiva**: `tipo: "ACTIVA"` + `asignaturas` (`readonly Asignatura[]`).
- **MatriculaSuspendida**: `tipo: "SUSPENDIDA"` + `motivo` (string).
- **MatriculaFinalizada**: `tipo: "FINALIZADA"` + `notaMedia` (number).

El discriminante es **`tipo`**. En `generarReporte` hago `switch (estado.tipo)` y en cada `case` TypeScript ya conoce los campos de esa variante.

---

## 3. `interface` vs `type`

- **`interface`**: Estudiante, Asignatura y cada variante de matrícula (forma de objeto fija).
- **`type`**: solo **`EstadoMatricula`**, porque es una **unión** (`|`) de las tres interfaces, no una sola forma mezclada.

**`interface`** lo uso para objetos con forma clara (entidades y cada estado). Para **`EstadoMatricula`** preferí un **`type`** con unión porque en cada momento solo aplica una variante. Si lo hubiera metido todo en una sola interface con campos opcionales, se podrían mezclar cosas que en la práctica no deberían ir juntas.

---

## 4. `RespuestaAPI<T>` y `obtenerRecurso<T>`

**`RespuestaAPI<T>`** en `api-client.ts`: `codigoEstado`, `exito`, `datos` (payload tipado como `T`), `errores?`.

**`obtenerRecurso<T>`** devuelve **`Promise<RespuestaAPI<T>>`**, no `Promise<T>` suelto: primero miro `exito` y `codigoEstado`, luego uso `datos`.

El **genérico `T`** es el tipo del **payload** (`datos`). Misma forma de respuesta para todas las rutas (`codigoEstado`, `exito`, …), pero si llamo `obtenerRecurso<Estudiante>` el compilador trata `datos` como **Estudiante**; si llamo `obtenerRecurso<Asignatura>`, como **Asignatura**. Sin `T` tendría que adivinar o usar `any`.

La espera de red está **simulada** con `setTimeout` + `Promise`. Según el `endpoint` (`/estudiantes`, `/asignaturas`, `/error`) devuelvo un ejemplo distinto; al llamar pongo el genérico, p. ej. `obtenerRecurso<Estudiante>(...)`.

---

## 5. `generarReporte`

Entrada: **`EstadoMatricula`**. Salida: **string**. El `switch` va por `estado.tipo`; en **ACTIVA** uso `asignaturas.length`, en **SUSPENDIDA** el `motivo`, en **FINALIZADA** `notaMedia`. En el Módulo 3 toca añadir **`never`** en el `default` del switch.

