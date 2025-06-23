# API Endpoint: PATCH /visitas/directa/:id

## Descripción

Este endpoint permite actualizar una visita directa, incluyendo tanto los datos de la visita como los datos del visitante asociado en una sola operación.

## URL

```
PATCH http://localhost:3001/visitas/directa/{id}
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
    "nombre": "string | null",
    "apellido_paterno": "string | null", 
    "apellido_materno": "string | null",
    "ci": "string | null"
  },
  "fecha_estimada_ingreso": "string (ISO 8601) | null",
  "fecha_real_ingreso": "string (ISO 8601) | null",
  "fecha_salida": "string (ISO 8601) | null",
  "motivo_visita": "string | null",
  "residenteId": "number",
  "guardiaId": "number | null",
  "estadoVisitaId": "number | null (Por defecto: 1 - Pendiente)"
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
  "fecha_estimada_ingreso": "2024-01-15T11:00:00",
  "fecha_real_ingreso": "2024-01-15T11:15:00",
  "fecha_salida": "2024-01-15T12:00:00",
  "motivo_visita": "Entrega de paquete urgente",
  "residenteId": 2,
  "guardiaId": 1,
  "estadoVisitaId": 2
}
```

### Ejemplo Parcial (Solo algunos campos)

```json
{
  "motivo_visita": "Cambio de motivo - Mantenimiento técnico",
  "fecha_real_ingreso": "2024-01-15T10:30:00",
  "estadoVisitaId": 2
}
```

## Response

### Códigos de Estado

- **200 OK**: Visita actualizada exitosamente
- **400 Bad Request**: Datos inválidos o faltantes
- **404 Not Found**: Visita, residente, guardia o estado no encontrado
- **500 Internal Server Error**: Error del servidor

### Estructura de Respuesta (200 OK)

```json
{
  "id": 1,
  "fecha_estimada_ingreso": "2024-01-15T11:00:00.000Z",
  "fecha_real_ingreso": "2024-01-15T11:15:00.000Z",
  "fecha_salida": "2024-01-15T12:00:00.000Z",
  "motivo_visita": "Entrega de paquete urgente",
  "visitanteId": 1,
  "residenteId": 2,
  "guardiaId": 1,
  "estadoVisitaId": 2,
  "visitante": {
    "id": 1,
    "nombre": "Juan Carlos",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García",
    "ci": "12345678"
  },
  "residente": {
    "id": 2,
    "nombre": "María",
    "apellido_paterno": "López",
    "apellido_materno": "Rodríguez",
    "ci": "87654321",
    "viviendaId": 2
  },
  "guardia": {
    "id": 1,
    "nombre": "Carlos",
    "turno": "Mañana"
  },
  "estadoVisita": {
    "id": 2,
    "nombre": "En curso"
  }
}
```

## Casos de Uso

### Caso 1: Actualizar Solo Datos de la Visita

**Request:**
```json
{
  "motivo_visita": "Cambio de motivo - Visita familiar",
  "fecha_real_ingreso": "2024-01-15T10:30:00",
  "estadoVisitaId": 2
}
```

**Resultado:**
- Se actualiza solo la información de la visita
- Los datos del visitante permanecen sin cambios
- Se valida que el nuevo estado de visita exista

### Caso 2: Actualizar Solo Datos del Visitante

**Request:**
```json
{
  "visitante": {
    "nombre": "Juan Carlos",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García",
    "ci": "12345678"
  }
}
```

**Resultado:**
- Se actualiza la información del visitante
- Se valida que la nueva CI no exista en otro visitante
- Los datos de la visita permanecen sin cambios

### Caso 3: Actualización Completa

**Request:**
```json
{
  "visitante": {
    "nombre": "Ana María",
    "apellido_paterno": "Martínez",
    "apellido_materno": "López",
    "ci": "98765432"
  },
  "fecha_estimada_ingreso": "2024-01-15T14:00:00",
  "fecha_real_ingreso": "2024-01-15T14:15:00",
  "motivo_visita": "Mantenimiento técnico",
  "residenteId": 3,
  "guardiaId": 2,
  "estadoVisitaId": 1
}
```

**Resultado:**
- Se actualiza tanto el visitante como la visita
- Se validan todas las entidades relacionadas
- Se verifica que la nueva CI sea única

## Validaciones

### Campos Opcionales

Todos los campos son opcionales para actualización:

- `visitante.nombre`: String válido
- `visitante.apellido_paterno`: String válido
- `visitante.apellido_materno`: String válido
- `visitante.ci`: String válido, debe ser único si se cambia
- `fecha_estimada_ingreso`: Formato ISO 8601 válido
- `fecha_real_ingreso`: Formato ISO 8601 válido
- `fecha_salida`: Formato ISO 8601 válido
- `motivo_visita`: String descriptivo
- `residenteId`: Debe existir en la base de datos
- `guardiaId`: Debe existir en la base de datos
- `estadoVisitaId`: Debe existir en la base de datos

### Validaciones Específicas

1. **CI Única**: Si se actualiza la CI del visitante, debe ser única
2. **Entidades Existentes**: Residentes, guardias y estados deben existir
3. **Visita Existente**: La visita debe existir antes de actualizarla
4. **Fechas Válidas**: Todas las fechas deben estar en formato ISO 8601

## Errores Comunes

### 400 Bad Request - CI Duplicada

```json
{
  "statusCode": 400,
  "message": "El CI 12345678 ya está registrado en otro visitante",
  "error": "Bad Request"
}
```

### 404 Not Found - Visita No Encontrada

```json
{
  "statusCode": 404,
  "message": "Visita con ID 999 no encontrada",
  "error": "Not Found"
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

### 400 Bad Request - Datos Inválidos

```json
{
  "statusCode": 400,
  "message": [
    "fecha_estimada_ingreso must be a valid ISO 8601 date string",
    "visitante.ci should not be empty"
  ],
  "error": "Bad Request"
}
```

## Ejemplos de Uso con cURL

### Actualizar Solo Motivo

```bash
curl -X PATCH http://localhost:3001/visitas/directa/1 \
  -H "Content-Type: application/json" \
  -d '{
    "motivo_visita": "Cambio de motivo - Entrega urgente"
  }'
```

### Actualizar Datos del Visitante

```bash
curl -X PATCH http://localhost:3001/visitas/directa/1 \
  -H "Content-Type: application/json" \
  -d '{
    "visitante": {
      "nombre": "Juan Carlos",
      "apellido_paterno": "Pérez",
      "apellido_materno": "García",
      "ci": "12345678"
    }
  }'
```

### Actualización Completa

```bash
curl -X PATCH http://localhost:3001/visitas/directa/1 \
  -H "Content-Type: application/json" \
  -d '{
    "visitante": {
      "nombre": "Ana María",
      "apellido_paterno": "Martínez",
      "apellido_materno": "López",
      "ci": "98765432"
    },
    "fecha_estimada_ingreso": "2024-01-15T14:00:00",
    "fecha_real_ingreso": "2024-01-15T14:15:00",
    "motivo_visita": "Mantenimiento técnico",
    "residenteId": 3,
    "guardiaId": 2,
    "estadoVisitaId": 1
  }'
```

## Notas Importantes

1. **Actualización Parcial**: Solo se actualizan los campos proporcionados
2. **Transacción Atómica**: La actualización del visitante y visita se realiza en una transacción
3. **Validación de CI**: Se valida que la nueva CI no exista en otro visitante
4. **Entidades Relacionadas**: Se validan solo si se proporcionan en la actualización
5. **Fechas**: Todas las fechas deben estar en formato ISO 8601

## Logs del Servidor

El endpoint registra las siguientes operaciones:

```
[VisitaService] Actualizando visita directa ID: 1
[VisitaService] Actualizando visitante ID: 1
[VisitaService] Visitante encontrado con CI: 12345678, actualizando datos
```

## Testing

Para probar el endpoint, puedes usar:

1. **Postman**: Crea una nueva request PATCH
2. **cURL**: Usa los comandos de ejemplo
3. **Insomnia**: Crea una nueva request PATCH
4. **Thunder Client**: Extensión de VS Code para testing de APIs

## Dependencias

Este endpoint depende de:

- **Visita**: Debe existir la visita a actualizar
- **Residentes**: Debe existir el residente si se especifica
- **Estados de Visita**: Debe existir el estado si se especifica
- **Guardias**: Debe existir el guardia si se especifica
- **Visitantes**: Se actualiza el visitante asociado a la visita 