En este documento incluiré varias cosas sobre el **Prompt Engineering**.

Incluiré 10 prompts útiles y una explicación de su buen funcionamiento.



1. Definir un rol

Prompt:
Actúa como un desarrollador senior de JavaScript. Revisa este código y sugiere mejoras para hacerlo más limpio y mantenible.

Por qué funciona:
Definir un rol orienta la respuesta hacia buenas prácticas y calidad de código.

2. Explicar código

Prompt:
Explica este archivo JavaScript como si se lo estuvieras enseñando a un desarrollador junior.

Por qué funciona:
Hace que la explicación sea más clara y sencilla, útil para entender mejor el código.

3. Refactorizar una función

Prompt:
Refactoriza esta función para que sea más legible y evita repetir código innecesario.

Por qué funciona:
La IA simplifica la función y aplica buenas prácticas como reducir duplicación o mejorar nombres de variables.

4. Razonamiento paso a paso

Prompt:
Analiza este código paso a paso y explica qué hace cada parte antes de dar una conclusión.

Por qué funciona:
Pedir razonamiento paso a paso ayuda a que la IA analice el código con más detalle.

5. Restricciones claras

Prompt:
Genera una función en JavaScript que valide un email. La respuesta debe tener menos de 15 líneas de código.

Por qué funciona:
Las restricciones ayudan a controlar el tipo de respuesta y hacer el código más directo.

6. Generar documentación

Prompt:
Genera comentarios para este código siguiendo el estilo JSDoc.

Por qué funciona:
Hace que la IA genere documentación estructurada lista para usar en el proyecto.

7. Ejemplo (few-shot)

Prompt:
Convierte estas funciones a un formato más limpio.

Ejemplo:
Antes:
function suma(a,b){return a+b}
Después:
function suma(a, b) {
return a + b;
}

Ahora aplica el mismo estilo a este código:

Por qué funciona:
Dar un ejemplo ayuda a que la IA entienda exactamente el estilo que se espera.

8. Buscar errores en código

Prompt:
Revisa este código y dime si hay posibles errores o malas prácticas.

Por qué funciona:
La IA analiza el código buscando posibles problemas o cosas que se podrían mejorar.

9. Mejorar nombres de variables

Prompt:
Sugiere nombres de variables más claros para este código.

Por qué funciona:
Mejora la legibilidad del código sin cambiar su funcionamiento.

10. Analizar un proyecto completo

Prompt:
Analiza este proyecto JavaScript y sugiere tres mejoras que podrían hacerlo más mantenible.

Por qué funciona:
Ayuda a obtener feedback general sobre un proyecto y encontrar posibles mejoras.