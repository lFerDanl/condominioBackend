# API Endpoint: POST /visitas/directa

## Descripción

Este endpoint permite crear una visita directa, creando automáticamente el visitante si no existe o reutilizando uno existente si ya está registrado con esa CI.

## URL

```
POST http://localhost:3001/visitas/directa
```

## Headers

```
Content-Type: application/json
```

## Request Body

### Estructura

```json
{
  "visitante": {
    "nombre": "string",
    "apellido_paterno": "string", 
    "apellido_materno": "string",
    "ci": "string"
  },
  "fecha_estimada_ingreso": "string (ISO 8601)",
  "fecha_real_ingreso": "string (ISO 8601) | null",
  "fecha_salida": "string (ISO 8601) | null",
  "motivo_visita": "string | null",
  "residenteId": "number",
  "guardiaId": "number | null",
  "estadoVisitaId": "number"
}
```

### Ejemplo Completo

```json
{
  "visitante": {
    "nombre": "Juan Carlos",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García",
    "ci": "12345678"
  },
  "fecha_estimada_ingreso": "2024-01-15T10:00:00",
  "fecha_real_ingreso": "2024-01-15T10:15:00",
  "fecha_salida": null,
  "motivo_visita": "Entrega de paquete",
  "residenteId": 1,
  "guardiaId": 2,
  "estadoVisitaId": 1
}
```

## Response

### Códigos de Estado

- **201 Created**: Visita creada exitosamente
- **400 Bad Request**: Datos inválidos o faltantes
- **404 Not Found**: Residente, guardia o estado no encontrado
- **500 Internal Server Error**: Error del servidor

### Estructura de Respuesta (201 Created)

```json
{
  "id": 1,
  "fecha_estimada_ingreso": "2024-01-15T10:00:00.000Z",
  "fecha_real_ingreso": "2024-01-15T10:15:00.000Z",
  "fecha_salida": null,
  "motivo_visita": "Entrega de paquete",
  "visitanteId": 1,
  "residenteId": 1,
  "guardiaId": 2,
  "estadoVisitaId": 1,
  "visitante": {
    "id": 1,
    "nombre": "Juan Carlos",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García",
    "ci": "12345678"
  },
  "residente": {
    "id": 1,
    "nombre": "María",
    "apellido_paterno": "López",
    "apellido_materno": "Rodríguez",
    "ci": "87654321",
    "viviendaId": 1
  },
  "guardia": {
    "id": 2,
    "nombre": "Carlos",
    "turno": "Tarde"
  },
  "estadoVisita": {
    "id": 1,
    "nombre": "Pendiente"
  }
}
```

## Casos de Uso

### Caso 1: Visitante Nuevo

**Request:**
```json
{
  "visitante": {
    "nombre": "Ana",
    "apellido_paterno": "Martínez",
    "apellido_materno": "López",
    "ci": "98765432"
  },
  "fecha_estimada_ingreso": "2024-01-15T14:00:00",
  "motivo_visita": "Reunión familiar",
  "residenteId": 1,
  "estadoVisitaId": 1
}
```

**Resultado:**
- Se crea un nuevo visitante con CI "98765432"
- Se crea la visita asociada al nuevo visitante
- Response incluye información completa del visitante creado

### Caso 2: Visitante Existente

**Request:**
```json
{
  "visitante": {
    "nombre": "Juan Carlos",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García",
    "ci": "12345678"
  },
  "fecha_estimada_ingreso": "2024-01-16T09:00:00",
  "motivo_visita": "Mantenimiento técnico",
  "residenteId": 2,
  "estadoVisitaId": 1
}
```

**Resultado:**
- Se encuentra el visitante existente con CI "12345678"
- Se actualizan los datos del visitante si han cambiado
- Se crea la nueva visita asociada al visitante existente

### Caso 3: Sin Guardia

**Request:**
```json
{
  "visitante": {
    "nombre": "Pedro",
    "apellido_paterno": "González",
    "apellido_materno": "Hernández",
    "ci": "55555555"
  },
  "fecha_estimada_ingreso": "2024-01-15T16:00:00",
  "motivo_visita": "Visita social",
  "residenteId": 1,
  "estadoVisitaId": 1
}
```

**Resultado:**
- Se crea la visita sin asignar guardia
- El campo `guardiaId` será `null` en la respuesta

## Validaciones

### Campos Requeridos

- `visitante.nombre`: No puede estar vacío
- `visitante.apellido_paterno`: No puede estar vacío
- `visitante.apellido_materno`: No puede estar vacío
- `visitante.ci`: No puede estar vacío, debe ser único
- `fecha_estimada_ingreso`: Formato ISO 8601 válido
- `residenteId`: Debe existir en la base de datos
- `estadoVisitaId`: Debe existir en la base de datos

### Campos Opcionales

- `fecha_real_ingreso`: Formato ISO 8601 válido
- `fecha_salida`: Formato ISO 8601 válido
- `motivo_visita`: Texto descriptivo del motivo de la visita
- `guardiaId`: Debe existir en la base de datos si se proporciona

## Errores Comunes

### 400 Bad Request - Datos Inválidos

```json
{
  "statusCode": 400,
  "message": [
    "visitante.nombre should not be empty",
    "visitante.ci should not be empty",
    "fecha_estimada_ingreso must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request"
}
```

### 404 Not Found - Residente No Encontrado

```json
{
  "statusCode": 404,
  "message": "Residente con ID 999 no encontrado",
  "error": "Not Found"
}
```

### 404 Not Found - Estado No Encontrado

```json
{
  "statusCode": 404,
  "message": "Estado de visita con ID 999 no encontrado",
  "error": "Not Found"
}
```

### 404 Not Found - Guardia No Encontrado

```json
{
  "statusCode": 404,
  "message": "Guardia con ID 999 no encontrado",
  "error": "Not Found"
}
```

## Ejemplos de Uso con cURL

### Crear Visita Directa

```bash
curl -X POST http://localhost:3001/visitas/directa \
  -H "Content-Type: application/json" \
  -d '{
    "visitante": {
      "nombre": "Juan",
      "apellido_paterno": "Pérez",
      "apellido_materno": "García",
      "ci": "12345678"
    },
    "fecha_estimada_ingreso": "2024-01-15T10:00:00",
    "motivo_visita": "Entrega de paquete",
    "residenteId": 1,
    "estadoVisitaId": 1
  }'
```

### Crear Visita con Guardia

```bash
curl -X POST http://localhost:3001/visitas/directa \
  -H "Content-Type: application/json" \
  -d '{
    "visitante": {
      "nombre": "María",
      "apellido_paterno": "López",
      "apellido_materno": "Rodríguez",
      "ci": "87654321"
    },
    "fecha_estimada_ingreso": "2024-01-15T14:00:00",
    "fecha_real_ingreso": "2024-01-15T14:15:00",
    "motivo_visita": "Mantenimiento técnico",
    "residenteId": 1,
    "guardiaId": 1,
    "estadoVisitaId": 1
  }'
```

## Notas Importantes

1. **Transacción Atómica**: La creación del visitante y la visita se realiza en una transacción, garantizando consistencia de datos.

2. **Reutilización de Visitantes**: Si el visitante ya existe con esa CI, se reutiliza y se actualizan sus datos si es necesario.

3. **Validación de Entidades**: Se valida que el residente, guardia y estado existan antes de crear la visita.

4. **Formato de Fechas**: Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss).

5. **CI Única**: La CI del visitante debe ser única en el sistema.

## Logs del Servidor

El endpoint registra las siguientes operaciones:

```
[VisitaService] Creando visita directa para visitante: Juan Pérez
[VisitaService] Visitante no encontrado, creando nuevo visitante con CI: 12345678
[VisitaService] Visitante encontrado con CI: 12345678, actualizando datos
```

## Testing

Para probar el endpoint, puedes usar:

1. **Postman**: Importa la colección de ejemplos
2. **cURL**: Usa los comandos de ejemplo
3. **Formulario Web**: Usa el archivo `formulario-visita-directa.html`
4. **Insomnia**: Crea una nueva request POST

## Dependencias

Este endpoint depende de:

- **Residentes**: Debe existir el residente especificado
- **Estados de Visita**: Debe existir el estado especificado
- **Guardias**: Debe existir el guardia si se especifica
- **Visitantes**: Se crea automáticamente si no existe 