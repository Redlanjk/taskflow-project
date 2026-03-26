# Backend API (TaskFlow) - Guía de herramientas

Este documento resume herramientas comunes en APIs HTTP modernas y por qué se utilizan junto a frameworks como Express.

## Axios

**Axios** es una librería HTTP para JavaScript que simplifica llamadas `fetch` y ofrece:

- Interceptores (para logs, tokens, reintentos).
- Manejo consistente de respuestas y errores.
- Soporte sencillo de timeout y cancelación.

En proyectos reales, se usa porque reduce repetición de código (por ejemplo, parsear JSON, normalizar errores, adjuntar headers).

## Postman

**Postman** es una aplicación para probar APIs con:

- Colecciones (agrupan endpoints).
- Variables de entorno (cambiar URLs/keys sin tocar requests).
- Validación (tests dentro de Postman).

Se usa para hacer pruebas de integración del contrato REST (y para forzar errores intencionados: `400`, `404`, `500`).

## Sentry

**Sentry** es una plataforma de observabilidad para capturar:

- Excepciones no controladas.
- Trazas (stack traces) y contexto.
- Rendimiento (tiempos de respuesta).

En backend, evita “no sé qué pasó” y permite corregir fallos con datos reales en producción.

## Swagger / OpenAPI

**Swagger** (y el estándar **OpenAPI**) describe formalmente una API:

- Endpoints.
- Esquemas de request/response.
- Parámetros, query strings y códigos de estado.

Se usa para:

- Generar documentación automática.
- Validar contratos y reducir inconsistencias.
- Permitir que clientes generen código automáticamente.

## Recomendación práctica (cómo usar estas herramientas)

1. Definir el contrato (idealmente con OpenAPI).
2. Implementar endpoints en Express con validación defensiva y manejo global de errores.
3. Probar con Postman: casos válidos y casos inválidos.
4. Activar Sentry para capturar errores y acelerar debugging.

