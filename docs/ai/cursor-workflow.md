Aqui documentaré varias cosas en relación a **Cursor**.

Documentaré: 

-Los atajos de teclado que uso con mas frecuencia.

-Un par de ejemplos concretos en los que **Cursor** ha mejorado mi codigo.



Los atajos de teclado que uso con mas frecuencia son:

-Ctrl + K: Abrir prompt de edición

-Ctrl + L: Abrir chat lateral

-Ctrl + I: Inline edit



Dos ejemplos en los que Cursor ha mejorado mi código:

-Tuve problemas al hacer que en la pestaña de tareas del proyecto taskflow, al cambiar de proyecto se cambiaran las tareas, pues deben estar asociadas al proyecto en el que se crean.
No sabia como solucionarlo directamente, por lo que pregunte a Cursor cual podia ser el problema, y no solo me ayudo a solucionarlo sino que me ayudo a optimizar el código.

-Tuve problemas con un par de estilos de Tailwind, cursor me ayudo a solucionarlos y a dejar el proyecto mas claro y visualmente agradable.


-Model Context Protocol (MCP)

**Model Context Protocol (MCP)** es un sistema que permite conectar modelos de IA con herramientas externas mediante servidores. Gracias a esto, la IA puede acceder a información real como archivos del proyecto, repositorios o APIs, en lugar de trabajar solo con el texto del chat.

-Configuración de MCP en Cursor

Para usar MCP en Cursor primero abrí la configuración del proyecto y creé un archivo de configuración llamado:

.cursor/mcp.json

Dentro de ese archivo añadí la configuración para usar un servidor MCP. En este caso utilicé el servidor **filesystem**, que permite a la IA leer archivos del proyecto.

Ejemplo de configuración:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "."
      ]
    }
  }
}
```

Después de configurar esto reinicié Cursor para que detectara el servidor MCP.

-Comprobación del funcionamiento

Para comprobar que funcionaba, hice varias consultas a la IA para que analizara archivos del proyecto. Algunas de las consultas fueron:

* Explicar qué hace el archivo `app.js`
* Analizar la estructura de `index.html`
* Buscar dónde se usa `localStorage`
* Explicar cómo se crean las tareas
* Sugerir mejoras en el código del proyecto

La IA pudo acceder a los archivos del proyecto y responder basándose en el código.

-Uso de MCP en proyectos reales

MCP puede ser útil en proyectos reales porque permite que la IA:

* Analice proyectos grandes
* Revise código automáticamente
* Acceda a repositorios como GitHub
* Genere documentación
* Ayude a detectar errores

Esto hace que la IA sea más útil para tareas de desarrollo y mantenimiento de software.
