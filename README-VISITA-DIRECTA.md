# Registro de Visita Directa - Sistema de Condominio

## Descripción

Este sistema permite registrar visitas directas creando tanto el visitante como la visita en una sola operación. **Si el visitante ya existe con ese número de carnet (CI), el sistema lo reutilizará automáticamente sin crear un duplicado.**

## Características Principales

### ✅ **Verificación Inteligente de Visitantes**
- **Búsqueda automática** por CI mientras el usuario escribe
- **Reutilización de visitantes existentes** para evitar duplicados
- **Actualización de datos** si el visitante existe pero con información diferente
- **Feedback visual** que indica si el visitante es nuevo o existente

### ✅ **Transacción Segura**
- **Creación condicional** del visitante (solo si no existe)
- **Actualización de datos** si el visitante existe
- **Consistencia de datos** garantizada con transacciones de base de datos

## Nuevo Endpoint API

### POST `/visitas/directa`

Crea un visitante (si no existe) y una visita en una sola transacción.

#### Request Body

```json
{
  "visitante": {
    "nombre": "Juan",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García",
    "ci": "12345678"
  },
  "fecha_estimada_ingreso": "2024-01-15T10:00:00",
  "fecha_real_ingreso": "2024-01-15T10:15:00",
  "fecha_salida": null,
  "residenteId": 1,
  "guardiaId": 1,
  "estadoVisitaId": 1
}
```

#### Lógica de Procesamiento

1. **Busca el visitante** por CI en la base de datos
2. **Si existe**: Actualiza los datos y usa el visitante existente
3. **Si no existe**: Crea un nuevo visitante
4. **Crea la visita** asociada al visitante (nuevo o existente)

#### Response

```json
{
  "id": 1,
  "fecha_estimada_ingreso": "2024-01-15T10:00:00.000Z",
  "fecha_real_ingreso": "2024-01-15T10:15:00.000Z",
  "fecha_salida": null,
  "visitanteId": 1,
  "residenteId": 1,
  "guardiaId": 1,
  "estadoVisitaId": 1,
  "visitante": {
    "id": 1,
    "nombre": "Juan",
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
    "id": 1,
    "nombre": "Carlos",
    "turno": "Mañana"
  },
  "estadoVisita": {
    "id": 1,
    "nombre": "Pendiente"
  }
}
```

### GET `/visitantes/ci/:ci`

Busca un visitante por número de CI (usado por el formulario para verificación en tiempo real).

#### Response (si existe)
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido_paterno": "Pérez",
  "apellido_materno": "García",
  "ci": "12345678"
}
```

#### Response (si no existe)
```http
404 Not Found
```

## Formulario Web

### Características Mejoradas

- **Diseño moderno y responsivo**: Se adapta a diferentes tamaños de pantalla
- **Verificación en tiempo real**: Busca visitantes mientras escribes la CI
- **Indicadores visuales**: 
  - ⏳ Verificando...
  - ✅ Visitante encontrado
  - 🆕 Nuevo visitante
- **Información contextual**: Muestra detalles del visitante si existe
- **Validación en tiempo real**: Valida los campos mientras el usuario escribe
- **Carga dinámica de datos**: Carga automáticamente residentes, guardias y estados
- **Feedback visual**: Muestra mensajes de éxito y error
- **Indicador de carga**: Muestra un spinner durante el procesamiento

### Campos del Formulario

#### Datos del Visitante
- **Nombre** (requerido)
- **Apellido Paterno** (requerido)
- **Apellido Materno** (requerido)
- **Cédula de Identidad** (requerido, solo números, con verificación automática)

#### Datos de la Visita
- **Fecha Estimada de Ingreso** (requerido, se establece automáticamente)
- **Fecha Real de Ingreso** (opcional)
- **Motivo de la Visita** (opcional, texto descriptivo)
- **Residente** (requerido, se carga desde la API)
- **Guardia** (opcional, se carga desde la API)
- **Estado de la Visita** (requerido, se carga desde la API)

### Flujo de Verificación

1. **Usuario escribe CI** → Sistema espera 500ms
2. **Búsqueda automática** → Consulta a `/visitantes/ci/:ci`
3. **Resultado encontrado** → Muestra información del visitante existente
4. **Resultado no encontrado** → Indica que se creará un nuevo visitante
5. **Envío del formulario** → Usa visitante existente o crea uno nuevo

## Instalación y Uso

### 1. Configurar la API

Asegúrate de que tu servidor NestJS esté ejecutándose en el puerto correcto (por defecto 3001).

### 2. Configurar CORS

Si tienes problemas de CORS, asegúrate de que tu aplicación NestJS tenga configurado CORS correctamente en `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: true, // O especifica los dominios permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3001);
}
bootstrap();
```

### 3. Usar el Formulario

1. Abre el archivo `formulario-visita-directa.html` en tu navegador
2. El formulario cargará automáticamente los datos necesarios
3. **Escribe la CI del visitante** → El sistema verificará si existe
4. **Completa los campos requeridos**
5. Haz clic en "Registrar Visita Directa"
6. El sistema creará la visita usando el visitante existente o creando uno nuevo

### 4. Configurar la URL de la API

Si tu API no está en `http://localhost:3001`, modifica la variable `API_BASE_URL` en el archivo HTML:

```javascript
const API_BASE_URL = 'http://tu-servidor:puerto';
```

## Validaciones

### Del lado del cliente (formulario)
- Campos requeridos marcados con asterisco (*)
- Validación de formato de fecha
- Solo números en el campo CI
- Verificación automática de visitantes existentes
- Validación HTML5 nativa

### Del lado del servidor (API)
- Validación de DTOs con class-validator
- Verificación de existencia de residente, guardia y estado
- Búsqueda de visitantes existentes por CI
- Actualización de datos de visitantes existentes
- Transacción de base de datos para garantizar consistencia
- Validación de formato de fechas

## Manejo de Errores

### Errores comunes y soluciones

1. **Error de CORS**: Configurar CORS en el servidor
2. **Visitante con CI duplicado**: El sistema validará que la CI sea única
3. **Residente no encontrado**: Verificar que el residente existe en la base de datos
4. **Estado de visita no válido**: Verificar que el estado existe
5. **Error de verificación**: Si falla la verificación, el sistema continuará normalmente

### Mensajes de error

El formulario mostrará mensajes específicos para cada tipo de error, incluyendo:
- Errores de validación
- Errores de conexión
- Errores del servidor
- Errores de datos duplicados
- Información sobre visitantes existentes

## Estructura de Archivos

```
sistema_condominio2/
├── src/
│   ├── visita/
│   │   ├── dto/
│   │   │   └── create-visita-directa.dto.ts  # DTO para visita directa
│   │   ├── visita.controller.ts              # Endpoint /directa
│   │   └── visita.service.ts                 # Método createDirecta
│   └── visitante/
│       ├── visitante.controller.ts           # Endpoint /ci/:ci
│       └── visitante.service.ts              # Método findByCi
├── formulario-visita-directa.html            # Formulario web mejorado
└── README-VISITA-DIRECTA.md                  # Este archivo
```

## Casos de Uso

### Caso 1: Visitante Nuevo
1. Usuario escribe CI nueva
2. Sistema indica "🆕 Nuevo visitante"
3. Al enviar, se crea visitante + visita

### Caso 2: Visitante Existente
1. Usuario escribe CI existente
2. Sistema muestra "✅ Visitante encontrado" con datos
3. Al enviar, se actualiza visitante + se crea visita

### Caso 3: Datos Diferentes
1. Usuario escribe CI existente pero con datos diferentes
2. Sistema actualiza los datos del visitante
3. Se crea la nueva visita

## Próximas Mejoras

- [ ] Generación automática de QR para la visita
- [ ] Notificaciones por WhatsApp al residente
- [ ] Historial de visitas del visitante
- [ ] Reportes de visitas por fecha
- [ ] Integración con sistema de cámaras
- [ ] App móvil para guardias
- [ ] Búsqueda avanzada de visitantes
- [ ] Importación masiva de visitantes

## Soporte

Para reportar problemas o solicitar nuevas funcionalidades, contacta al equipo de desarrollo. 