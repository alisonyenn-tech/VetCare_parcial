# 🐾 VetCare · Aplicación web para una clínica veterinaria

Aplicación hecha con **Angular 18, TypeScript, Angular Material y Bootstrap 5** que digitaliza la atención de una clínica veterinaria. Resuelve tres problemas: los clientes tenían que llamar para pedir una cita, no había control de los horarios disponibles y no existía un historial de las mascotas atendidas.

## Funcionalidades

1. **Registro de mascotas y dueños:** formulario reactivo con validaciones (DNI de 8 dígitos, celular de 9 dígitos que empieza con 9, correo, fecha de nacimiento no futura).
2. **Agenda de citas con calendario:** se elige el día en un calendario (los días con citas llevan un punto naranja) y los horarios de 09:00 a 18:00 cada 30 minutos. Los horarios ocupados o ya pasados se bloquean, así que no se pueden duplicar citas. Las citas de las próximas 24 horas se resaltan en amarillo.
3. **Historial de atención:** cada mascota tiene una línea de tiempo con motivo, estado, diagnóstico y tratamiento, y desde ahí se registra la atención de una cita pendiente.
4. **Ingreso del personal:** las pantallas están protegidas por un login de demostración.

> Los datos se guardan en el `localStorage` del navegador (no hay backend). La primera vez se cargan tres mascotas y cuatro citas de ejemplo. Para volver a empezar, borra los datos del sitio desde las herramientas del navegador.

## Requisitos

- [Node.js](https://nodejs.org/) 18.19 o superior (recomendado 20 o 22)
- npm (viene con Node.js)
- Git
- Conexión a internet (para instalar dependencias y cargar la fuente y los íconos de Google Fonts)

## Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPOSITORIO>
cd veterinaria-app

# 2. Instalar las dependencias
npm ci

# 3. Ejecutar en modo desarrollo
npm start
```

Abre **http://localhost:4200** en el navegador.

**Credenciales de prueba:** usuario `admin` · contraseña `vet123`

## Pruebas

```bash
npm run test:ci
```

Ejecuta las pruebas con Jasmine y jsdom. Para ejecutarlas en Chrome durante el desarrollo, usa `npm test` con Google Chrome instalado.

### Evidencia de verificación

Se ejecutaron **19 pruebas en 6 archivos**, todas aprobadas, con Node.js 24.22.1 y npm 11.9.0.

| Área | Pruebas | Qué verifican |
| --- | ---: | --- |
| Cita | 5 | Estado inicial, proximidad, cancelación e inmutabilidad, atención y transición inválida |
| Servicio de citas | 4 | Agenda, bloqueo de duplicados, liberación de horario e historial |
| Mascota y dueño | 3 | Reconstrucción de instancias, descripción e iniciales |
| Pipe de estado | 3 | Texto, color e icono según el estado |
| Validadores | 3 | Fechas futuras, pasadas y campos vacíos |
| Buscador | 1 | Emisión del texto y limpieza del campo |

También se ejecutó `npm run build` correctamente. El compilador informó una advertencia por el tamaño del SCSS del buscador. Las pruebas automatizadas comprueban comportamiento de componentes y lógica. La revisión visual se puede hacer en el navegador después de ejecutar `npm start`.

## Compilar para producción

```bash
npm run build
```

Los archivos del sitio quedan en `dist/veterinaria-app/browser`.

## Estructura del proyecto

```
src/app/
├── core/                       # Lógica de negocio compartida por toda la app
│   ├── models/                 # Persona (abstracta) → Dueno · Mascota · Cita · tipos
│   ├── services/               # IRepositorio<T> · Repositorio<T> (abstracta) → MascotaService, CitaService · AuthService
│   ├── guards/                 # authGuard: protege las rutas privadas
│   └── config/ utils/ data/    # Horario de atención, funciones de fechas, datos de ejemplo
├── shared/                     # SharedModule: piezas reutilizables
│   ├── components/             # navbar, encabezado-pagina, estado-chip, estado-vacio, tarjeta-dato, avatar-mascota
│   ├── pipes/                  # estadoCita, fechaCorta, edadMascota
│   ├── directives/             # appResaltarProxima
│   ├── validators/             # fechaNoFutura, fechaNoPasada
│   └── material.module.ts      # Componentes de Angular Material agrupados
├── auth/                       # Módulo de ingreso (carga perezosa)
├── mascotas/                   # Módulo: lista, formulario de registro e historial (carga perezosa)
└── citas/                      # Módulo: agenda con calendario (carga perezosa)
docs/                           # Definición del problema, diseño y guion de sustentación
```

## Uso de Angular

- **Arquitectura modular:** `AppModule`, `SharedModule` y los módulos `auth`, `mascotas` y `citas`, con rutas propias y **carga perezosa** (`loadChildren`).
- **Componentes reutilizables:** `shared` reúne el encabezado, avatar, tarjetas, avisos y buscador. `BuscadorComponent` recibe el identificador, la etiqueta y el ejemplo por `@Input`. Su `@Output() textoCambiado` emite un `string` al escribir o limpiar. La lista de mascotas recibe el evento y filtra por nombre, dueño o DNI.
- **Pipes personalizados:** `estadoCita` (texto, color e ícono), `fechaCorta` y `edadMascota`.
- **Directiva personalizada:** `appResaltarProxima`.
- **Formularios reactivos** (`ReactiveFormsModule`): `FormBuilder`, grupos anidados (mascota + dueño), validadores integrados (`required`, `pattern`, `email`, `minLength`) y validadores propios para fechas. El estado de cada control (válido, tocado) decide cuándo se muestran los errores.
- **Guard funcional** para proteger las rutas y **RxJS** (`BehaviorSubject`, `combineLatest`, `async` pipe) para que las pantallas se actualicen solas.
- **Bootstrap 5** aporta el grupo de búsqueda con icono, campo y botón. Sus estilos Sass se cargan en el componente y se adaptan al tema VetCare.
- **Angular Material** como librería de diseño (tarjetas, campos, calendario, botones, avisos, barra superior) con un tema verde propio. La interfaz es responsive para escritorio y móvil.

## Uso de TypeScript

- **Interfaces y tipos:** `DatosMascota`, `DatosCita`, `IRepositorio<T>`, `Entidad`, y tipos literales como `EstadoCita` y `Especie`.
- **Programación orientada a objetos:**
  - *Herencia:* `Persona` (clase abstracta) → `Dueno`; `Repositorio<T>` (clase abstracta genérica) → `MascotaService` y `CitaService`.
  - *Interfaces implementadas:* `Repositorio<T> implements IRepositorio<T>`.
  - *Encapsulamiento:* atributos `private` y `readonly`.
  - *Métodos de negocio en los modelos:* `Cita.esProxima()`, `Cita.cancelar()`, `Cita.atender()`, `Mascota.descripcion`.
- **Funciones y servicios tipados**, con `strict` activado en `tsconfig.json`.

## Documentación del proyecto

- [`docs/01-definicion-del-problema.md`](docs/01-definicion-del-problema.md): problema, usuarios, necesidades y cómo se resuelven.
- [`docs/02-diseno-de-la-solucion.md`](docs/02-diseno-de-la-solucion.md): bocetos de pantallas y flujos de usuario.
- [`docs/03-guion-de-sustentacion.md`](docs/03-guion-de-sustentacion.md): guion para la presentación y preguntas probables.

## Integrantes

- _Nombre del integrante 1_
- _Nombre del integrante 2_
- _Nombre del integrante 3_
