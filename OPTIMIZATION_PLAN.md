# Plan de corrección y modernización

## Alcance y orden

1. Diagnosticar el estado actual sin modificar código.
2. Corregir y probar la persistencia del tema en una rama y PR separados.
3. Tras la aprobación del fix, modernizar la interfaz en otra rama y PR.

No mezclar los cambios de persistencia del tema con la modernización visual.

## Fase 1 — Diagnóstico (completada)

### Hallazgos sobre el tema

- La aplicación actual es una página HTML/CSS/JavaScript sin framework.
- No se encontró selector, función, estado global, listener, clase o atributo de tema.
- `app.js` no lee ni escribe la clave `app-theme`; tampoco existen valores `light`, `dark` o `system`.
- `styles.css` define una única paleta clara en `:root`; no hay tema oscuro ni regla `prefers-color-scheme`.
- No hay SSR ni hidratación que puedan revertir el tema.
- Por tanto, el cambio de tema no puede ser la causa directa del error de Git observado: ese flujo de tema aún no existe en esta versión del código.

### Persistencia y estado existentes

- `state` contiene materiales, estancias y estado de navegación; no contiene preferencia de tema.
- Materiales y estancias se guardan localmente en `localStorage` mediante `saveMaterialsLocally()` y `saveSpacesLocally()`.
- Las lecturas de materiales/estancias y las escrituras ordinarias de esos datos no están protegidas frente a excepciones de `localStorage`. Si el almacenamiento está bloqueado o no disponible, una excepción puede interrumpir la inicialización o la acción de guardado local. Esto es independiente del error de `git pull`.
- No se encontraron errores de tema ni eventos de tema que revisar, ya que no hay implementación de tema.

### Diagnóstico de Git y sincronización web

- El error adjunto de `git pull --tags origin main` fue causado por historiales divergentes sin ancestro común; Git no podía elegir automáticamente entre merge, rebase o fast-forward.
- La referencia local se sincronizó con `origin/main`; el commit local previo quedó preservado en `backup/main-pre-sync-2026-10-17`. El árbol de trabajo quedó limpio.
- El botón de sincronización de la aplicación no ejecuta `git pull` ni guarda la preferencia de tema. `syncDataToGitHubCloud()` serializa materiales y estancias y actualiza únicamente `data.js` mediante la API de contenidos de GitHub.
- Si la consulta GET de `data.js` no tiene éxito, el flujo continúa sin SHA y trata de hacer el PUT de todas formas. La API requiere el SHA para reemplazar un archivo existente, por lo que ese camino puede fallar y el estado visible depende de la respuesta del PUT.
- `app.js` contiene una credencial de GitHub embebida en código ejecutado por el navegador. Debe considerarse expuesta, revocarse/rotarse y no volver a distribuirse como secreto del cliente. La sincronización necesitará una solución de autorización segura antes de considerarse apta para producción.

### Conclusión

El error Git reproducido era un problema de historial del repositorio, no del tema ni de un error JavaScript causado por cambiarlo. La Fase 2 añade la preferencia de tema que faltaba; no modifica `data.js` ni invoca la sincronización GitHub.

## Fase 2 — Persistencia segura del tema (implementada; publicación pendiente)

### Requisitos y aceptación

- Usar la clave `app-theme` y aceptar únicamente `light`, `dark` y `system`.
- Si no hay preferencia válida, resolver el aspecto inicial con `prefers-color-scheme`.
- Persistir de manera segura y no romper la aplicación si `localStorage` falla.
- Aplicar el tema al elemento raíz y mantener la preferencia separada del estado de materiales y estancias.
- Probar selección, recarga, valor inválido, ausencia de preferencia y almacenamiento inaccesible.
- No cambiar la lógica ni los datos de sincronización con GitHub como parte del fix de tema.

### Implementación y verificación

1. Rama `fix/theme-save-bug` creada desde `main`.
2. `theme.js` aplica `light`, `dark` o `system` antes de cargar los estilos, persiste bajo `app-theme` y sigue aplicando el tema a la sesión si el almacenamiento falla.
3. Se añadieron controles accesibles para escritorio y móvil, estilos para claro/oscuro y un aviso visible si no se puede persistir.
4. Las lecturas y escrituras de `localStorage` de materiales/estancias ahora notifican errores y no interrumpen la inicialización; los datos permanecen operativos en memoria durante la sesión.
5. Se añadió un test runner de navegador sin dependencias en [`tests/theme.test.html`](./tests/theme.test.html). Resultado: 5 pruebas correctas, 0 fallidas. La prueba de integración con `localStorage` bloqueado cargó la aplicación y renderizó 42 tarjetas; la vista móvil no desbordó a 375 px ni 320 px.
6. El entorno no tiene Node.js ni un runner JavaScript de consola; se validó la aplicación y el test runner en el navegador integrado.
7. Commits locales: `e94ea85` (diagnóstico) y `68eb4a3` (fix y pruebas).

**Estado:** implementación y pruebas completadas localmente. El pull request aún no está creado ni la rama publicada: antes de enviar código a GitHub hay que retirar o sustituir de forma segura la credencial de GitHub incrustada en `app.js` y revocarla/rotarla. No se debe volver a publicar como secreto del cliente.

## Fase 3 — Modernización UI/UX (bloqueada hasta aprobar el fix)

- Crear la rama `feat/modern-ui` después de aprobar el fix de la Fase 2.
- Modernizar con Tailwind CSS, shadcn/ui y Radix UI, comprobando su compatibilidad con la estructura estática actual antes de añadir tooling.
- Mantener contraste WCAG AA, navegación accesible por teclado y diseño responsive.
- Incluir estados de carga, error y vacío.
- Mantener esta fase en un pull request separado, sin mezclarla con el fix de tema.
- Actualizar este plan al completar la fase.

## Registro de fases

| Fecha | Fase | Resultado | Rama / PR | Estado |
|---|---|---|---|---|
| 2026-10-17 | 1 — Diagnóstico | Tema inexistente; error de Git por historiales sin ancestro común; documentados riesgos independientes de almacenamiento y sincronización web | `main` | Completada |
| 2026-10-17 | 2 — Persistencia del tema | Preferencia segura, controles, estilos, fallback y 5 pruebas de navegador; publicación requiere sanear una credencial preexistente | `fix/theme-save-bug` | Implementada localmente; PR pendiente |
|  | 3 — Modernización UI/UX | Pendiente de aprobación del fix | `feat/modern-ui` | Bloqueada |
