# To-Do App — Prueba Técnica Ionic

Aplicación móvil de lista de tareas con categorías, construida con **Ionic + Angular** y configurada para Android/iOS con Capacitor.

## ✅ Funcionalidades implementadas

- ✅ Agregar, completar y eliminar tareas
- ✅ Crear, editar y eliminar categorías
- ✅ Asignar categoría a cada tarea
- ✅ Filtrar tareas por categoría
- ✅ Persistencia con `localStorage`
- ✅ Modal personalizado para creación de tareas con selector visual
- ✅ Arquitectura limpia (modelos, servicios, páginas, componentes)
- ✅ Versionamiento con Git + commits convencionales
- ✅ Configuración base para Android e iOS con Capacitor

## ⚠️ Pendiente (limitación de tiempo)

- Integración con Firebase + Remote Config (feature flag)
- Generación de APK / IPA (configuración base lista)
- Optimizaciones de rendimiento avanzadas

## 🛠️ Stack tecnológico

- **Ionic 8** + **Angular 19** (standalone components)
- **Capacitor** (Android + iOS)
- **TypeScript**
- **localStorage** para persistencia
- **Git + GitHub** para versionamiento

## 📂 Estructura del proyecto
src/app/
├── models/           # Interfaces (Task, Category)
├── services/         # Lógica de negocio + localStorage
├── pages/
│   ├── task-list/    # Lista principal de tareas
│   ├── task-form/    # Modal de creación de tarea
│   └── category-manager/  # Gestión de categorías
└── components/
└── task-item/

## 🚀 Cómo ejecutar

```bash
npm install
ionic serve
```

Para Android:
```bash
ionic capacitor add android
ionic capacitor build android
```

## 🧠 Decisiones técnicas

- **Arquitectura limpia:** separación clara entre modelos, servicios y vistas para facilitar mantenimiento.
- **Standalone components:** se usaron componentes standalone de Angular (recomendación oficial actual).
- **Modal en lugar de Alert:** se priorizó UX al implementar un modal personalizado con selector visual de categorías en lugar del Alert básico.
- **Filtrado en servicio:** la lógica de filtrado está en `TaskService` para mantener componentes simples.

## 📝 Autor

Edwin Tejada — Prueba técnica Mobile Developer