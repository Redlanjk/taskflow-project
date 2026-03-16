En este documento haremos una comparativa entre dos inteligencias artificiales, **ChatGPT** y **Claude**.

La comparación tendra varios puntos: 

1-Pediremos a las IAs que nos expliquen tres conceptos técnicos y compararemos la claridad, profundidad y ejemplos de cada explicación.

2-Escribiremos 3 funciones JavaScript con errores intencionales y pediremos a ambos que detecten y expliquen el bug.

3-Describiremos en lenguaje natural 3 funciones distintas y pediremos que generen su implementación, a lo que seguirá un análisis de calidad del código generado.




1.-Tras decirles, "Explícame resumidamente los conceptos: closures, event loop y DOM.", esto es lo que ambas respondieron.



-**ChatGPT:**
1. Closures (Clausuras)

Una closure ocurre cuando una función recuerda y puede acceder a variables de su ámbito externo, incluso después de que ese ámbito haya terminado de ejecutarse.

Idea clave

Una función “encierra” (closes over) las variables del lugar donde fue creada.

Para qué se usan

-Encapsular datos (similar a variables privadas)

-Factory functions

-Manejo de estado sin usar variables globales

2. Event Loop

El event loop es el mecanismo que permite que JavaScript maneje operaciones asíncronas aunque tenga un solo hilo de ejecución.

Componentes principales

-Call Stack

Donde se ejecutan las funciones.

-Web APIs / APIs del navegador

setTimeout, fetch, eventos del DOM, etc.

-Callback Queue / Task Queue

Cola donde esperan las funciones cuando termina la operación async.

-Event Loop

Revisa si el Call Stack está vacío.

Si lo está, mueve tareas desde la cola al stack.

3. DOM (Document Object Model)

El DOM es una representación en forma de árbol del HTML de una página que el navegador crea para que JavaScript pueda leer y modificar la interfaz.



-**Claude:**

-Closures
Una closure es una función que "recuerda" las variables de su ámbito exterior, incluso después de que ese ámbito haya terminado de ejecutarse.

-Event Loop
JavaScript es single-threaded, pero el event loop le permite manejar operaciones asíncronas sin bloquearse. Funciona así:

1.Call Stack → ejecuta el código síncrono
2.Web APIs → maneja tareas asíncronas (setTimeout, fetch…)
3.Queue → encola los callbacks cuando terminan
4.Event Loop → cuando el stack está vacío, mueve callbacks de la queue al stack

-DOM
El Document Object Model es la representación en forma de árbol que el navegador crea a partir del HTML, permitiendo a JavaScript leer y manipular la página en tiempo real.



-**Analisis:**
Ambas respuestas explican correctamente los conceptos de closures, event loop y DOM. Sin embargo, presentan enfoques diferentes. Claude prioriza la concisión y la claridad mediante definiciones breves, ejemplos y esquemas simples, lo que facilita una comprensión rápida. En cambio, ChatGPT ofrece una explicación más profunda al incluir ejemplos de código más precisos y descripciones del funcionamiento interno, lo que permite entender mejor cómo se aplican estos conceptos en la práctica. Por tanto, la segunda respuesta es más adecuada para un resumen rápido, mientras que la primera resulta más útil para aprendizaje y comprensión técnica.


2.-Tras pedirles que detecten los errores de estas tres funciones JavaScript y los expliquen, estas fueron las respuestas:

-Primera función:

function sumarArray(arr) {
  let total = 0;

  for (let i = 0; i <= arr.length; i++) {
    total += arr[i];
  }

  return total;
}

-Chatgpt:
El error está en la condición del bucle for:

for (let i = 0; i <= arr.length; i++)

arr.length es una posición fuera del array, ya que los índices van de 0 a arr.length - 1. Al usar <=, en la última iteración arr[i] será undefined, lo que provoca un resultado incorrecto en la suma.

-Claude:
El error está en la condición del for:
javascripti <= arr.length  // ❌
i < arr.length   // ✅
Los arrays se indexan desde 0 hasta length - 1, así que cuando i === arr.length estás accediendo a una posición que no existe, devolviendo undefined. Al sumar undefined al total, el resultado se convierte en NaN.

-Segunda función:

function imprimirNumeros() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  }
}

-ChatGPT:
El problema está en usar var dentro del bucle.

var tiene scope de función, no de bloque, por lo que todos los setTimeout comparten la misma variable i. Cuando se ejecutan después de 1 segundo, el bucle ya terminó y i vale 5, así que se imprime 5 cinco veces en lugar de 0,1,2,3,4.

-Claude:
El error está en usar var en lugar de let:
javascriptvar i  // ❌ → imprime: 5, 5, 5, 5, 5
let i  // ✅ → imprime: 0, 1, 2, 3, 4
var tiene scope de función, por lo que todos los setTimeout comparten la misma variable i. Para cuando se ejecutan (1 segundo después), el bucle ya terminó y i vale 5. Con let cada iteración tiene su propio scope, conservando su valor correctamente.

-Tercera función:

function esPar(num) {
  if (num % 2 = 0) {
    return true;
  } else {
    return false;
  }
}

-ChatGPT:
El error está en la condición del if:

num % 2 = 0

Se está usando el operador de asignación (=) en lugar del operador de comparación (=== o ==). Esto provoca un error porque se intenta asignar 0 al resultado de num % 2, cuando en realidad se quiere comparar si el resto es 0.

-Claude:
El error está en usar = en lugar de ===:
javascriptif (num % 2 = 0)   // ❌ asignación
if (num % 2 === 0) // ✅ comparación
= es el operador de asignación, no de comparación, por lo que JavaScript intenta asignar 0 a num % 2, lo cual es inválido y lanza un ReferenceError. Para comparar se debe usar == (comparación débil) o === (comparación estricta, recomendada).



3.-Ahora pediremos que nos generen el código de tres funciones basicas en JavaScript, estas son las respuestas:

-Primera función:

Calcular el área de un rectángulo → recibe el ancho y el alto, y devuelve su multiplicación.

-Chatgpt:
function areaRectangulo(ancho, alto) {
  return ancho * alto;
}

-Claude:
function calcularArea(ancho, alto) {
  return ancho * alto;
}

-Segunda función:

Convertir grados Celsius a Fahrenheit → recibe una temperatura en Celsius y devuelve el equivalente en Fahrenheit.

-ChatGPT:
function celsiusAFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

-Claude:
function celsiusAFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

-Tercera función:

Verificar si una palabra es palíndromo → recibe un string y devuelve true si se lee igual al derecho que al revés.

-ChatGPT:
function esPalindromo(palabra) {
  const invertida = palabra.split('').reverse().join('');
  return palabra === invertida;
}

-Claude:
function esPalindromo(palabra) {
  const invertida = palabra.split("").reverse().join("");
  return palabra === invertida;
}

-**Análisis:**
Ambas IA generan soluciones prácticamente equivalentes en calidad y eficiencia, con variaciones solo en estilo de escritura o nombres de funciones, no en la lógica ni en el rendimiento.
