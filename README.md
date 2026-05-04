# To-Do App — Prueba Técnica Mobile Developer

Aplicación móvil de gestión de tareas con categorías, construida con **Ionic + Angular** y configurada para Android/iOS con **Capacitor**. Implementa **Firebase Remote Config** para feature flags y aplica principios de **arquitectura limpia**.

> 📱 **APK disponible en:** [`releases/todo-app-debug.apk`](./releases/todo-app-debug.apk)

---

## ✅ Funcionalidades implementadas

### Tareas
- ✅ Agregar nuevas tareas con título y categoría
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas
- ✅ Filtrar tareas por categoría

### Categorías
- ✅ Crear, editar y eliminar categorías
- ✅ Asignar color personalizado a cada categoría
- ✅ Asignar categoría a cada tarea

### Infraestructura
- ✅ Persistencia local con `localStorage`
- ✅ Configuración multiplataforma con Capacitor (Android + iOS)
- ✅ Firebase + Remote Config para feature flags
- ✅ Generación de APK Android funcional
- ✅ Versionamiento con Git + commits convencionales

### Feature Flag (Firebase Remote Config)
- ✅ Panel de estadísticas (total / completadas / pendientes) controlado por flag remoto `show_statistics`
- ✅ El flag se puede activar/desactivar en tiempo real desde Firebase Console sin recompilar la app
- ✅ Cache configurado dinámicamente: 10s en desarrollo, 1h en producción

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Ionic | 8 | Framework UI mobile |
| Angular | 19 | Framework de aplicación |
| Capacitor | 7 | Bridge nativo Android/iOS |
| Firebase | 11 | Remote Config |
| TypeScript | 5 | Lenguaje |

---

## 📂 Estructura del proyecto
src/app/
├── models/                    # Interfaces del dominio
│   ├── task.ts
│   └── category.ts
├── services/                  # Lógica de negocio
│   ├── task.ts                # CRUD de tareas + filtrado
│   ├── category.ts            # CRUD de categorías
│   └── feature-flag.ts        # Servicio de Firebase Remote Config
├── pages/                     # Páginas (lazy-loaded)
│   ├── task-list/             # Lista principal de tareas
│   ├── task-form/             # Modal de creación de tarea
│   └── category-manager/      # Gestión de categorías
├── components/
│   └── task-item/
└── firebase.config.ts         # Configuración Firebase

La separación en capas permite reemplazar cualquier capa (ej. cambiar `localStorage` por una API REST) sin tocar las demás. Los servicios no dependen de los componentes; los componentes consumen los servicios mediante inyección de dependencias.

---

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js 20+
- npm 10+
- Android Studio (solo si vas a generar el APK)
- JDK 17

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/eats1031/todo-app-ionic.git
cd todo-app-ionic

# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en navegador
ionic serve
```

La app estará disponible en `http://localhost:8100`.

### Compilar para Android

```bash
ionic build
npx cap sync android
npx cap open android
# En Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
```

El APK se genera en `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## ⚡ Optimizaciones de rendimiento aplicadas

### 1. `ChangeDetectionStrategy.OnPush`
La página principal usa detección de cambios manual. Angular solo verifica el componente cuando los inputs cambian o se llama explícitamente a `markForCheck()`. Reduce significativamente el consumo de CPU.

### 2. `trackBy` en `*ngFor`
Las listas de tareas y categorías usan funciones `trackBy` con el `id` único. Esto evita que Angular destruya y recree elementos del DOM cuando solo cambia un ítem — crítico para el manejo eficiente de grandes cantidades de tareas.

### 3. Lazy loading de páginas
Cada página se carga bajo demanda mediante `loadChildren()`. La carga inicial solo descarga los assets de la pantalla principal, mejorando el tiempo de arranque.

### 4. Build de producción
Compilación con tree-shaking, minificación y eliminación de código muerto.

### 5. Cache inteligente del Remote Config
En desarrollo el cache es de 10 segundos para iterar rápido. En producción es de 1 hora para no abusar de las llamadas a la API ni del consumo de datos del usuario.

---

## ❓ Respuestas a las preguntas técnicas

### ¿Cuáles fueron los principales desafíos al implementar las nuevas funcionalidades?

El mayor desafío fue la **configuración del entorno en Windows**: Windows Defender bloqueaba sistemáticamente la ejecución de `esbuild.exe` durante la instalación de dependencias, lo que requirió aplicar exclusiones de seguridad y entender el flujo de scripts post-instalación de npm. Esto enseña la importancia de conocer no solo el framework, sino el ecosistema completo (npm, gestores de procesos, sistema operativo).

A nivel de código, el desafío más interesante fue **integrar el modal de creación de tareas** preservando la arquitectura limpia: el modal debía conocer las categorías sin acoplarse al componente padre. La solución fue inyectar `CategoryService` directamente en el modal y usar `ModalController.dismiss()` para devolver datos al padre, manteniendo la responsabilidad única.

Otro reto fue **la migración a componentes standalone** de Angular 19, que cambia la forma en que los módulos importan componentes. Aprendí que las páginas standalone no se declaran en `NgModule.declarations`, sino que se importan en `NgModule.imports`.

### ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

Apliqué **cinco técnicas combinadas**:

1. **`OnPush` change detection** para evitar chequeos innecesarios del DOM en cada evento del navegador. En una app con muchas interacciones, esto reduce significativamente el trabajo del CPU.

2. **`trackBy` en listas** porque sin él, Angular destruye y recrea todos los elementos del DOM cuando cambia un solo ítem. Con `trackBy`, solo se actualiza el ítem afectado. Esto es crítico para cumplir con el requisito de "manejo eficiente de grandes cantidades de tareas" del enunciado.

3. **Lazy loading de páginas** para que la carga inicial solo descargue los recursos necesarios. La página de gestión de categorías solo se descarga cuando el usuario la abre.

4. **Cache adaptativo del Remote Config** según el entorno. En desarrollo prima la rapidez de iteración; en producción priman las llamadas a la API y el consumo de datos del usuario.

5. **Build de producción** con tree-shaking que elimina código no utilizado, reduciendo el tamaño del bundle final.

### ¿Cómo aseguraste la calidad y mantenibilidad del código?

Aseguré la calidad mediante **cuatro prácticas**:

1. **Arquitectura limpia con separación de capas:** modelos, servicios y vistas viven en carpetas separadas. Los servicios encapsulan toda la lógica de negocio (acceso a `localStorage`, filtrado, validaciones). Las páginas solo orquestan llamadas a servicios y manejan presentación. Esto facilita testing, refactorizaciones y onboarding de nuevos desarrolladores.

2. **Inyección de dependencias:** todos los servicios se inyectan en los constructores. Esto permite mockear fácilmente las dependencias en tests y cambiar implementaciones sin tocar el resto del código (por ejemplo, reemplazar `localStorage` por una API REST cambiaría solo `TaskService`).

3. **Tipado estricto con TypeScript:** las interfaces `Task` y `Category` definen contratos claros entre capas. El compilador detecta errores antes de tiempo de ejecución.

4. **Commits semánticos con Conventional Commits:** cada cambio se documenta con prefijos (`feat:`, `fix:`, `docs:`, `perf:`, `chore:`) y mensajes descriptivos. Esto facilita la lectura del historial, la generación automática de changelogs y la trazabilidad de decisiones.

---

## ⚠️ Limitaciones conocidas

- **IPA no generado:** la generación de archivos IPA requiere un entorno macOS con Xcode, no disponible en el equipo de desarrollo (Windows). El proyecto está configurado para iOS y se compilaría correctamente en un entorno macOS ejecutando `npx cap add ios && npx cap open ios`.

---

## 📝 Autor

**Edwin Tejada** — Prueba técnica Mobile Developer
🔗 [github.com/eats1031](https://github.com/eats1031)