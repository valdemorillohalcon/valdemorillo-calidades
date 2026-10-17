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
- La exportación/publicación del estado de la aplicación no debe requerir credenciales de escritura en el navegador ni escribir directamente sobre `main`.

### Implementación y verificación

1. Rama `fix/theme-save-bug` creada desde `main`.
2. `theme.js` aplica `light`, `dark` o `system` antes de cargar los estilos, persiste bajo `app-theme` y sigue aplicando el tema a la sesión si el almacenamiento falla.
3. Se añadieron controles accesibles para escritorio y móvil, estilos para claro/oscuro y un aviso visible si no se puede persistir.
4. Las lecturas y escrituras de `localStorage` de materiales/estancias ahora notifican errores y no interrumpen la inicialización; los datos permanecen operativos en memoria durante la sesión.
5. Se añadió un test runner de navegador sin dependencias en [`tests/theme.test.html`](./tests/theme.test.html). Resultado: 5 pruebas correctas, 0 fallidas. La prueba de integración con `localStorage` bloqueado cargó la aplicación y renderizó 42 tarjetas; la vista móvil no desbordó a 375 px ni 320 px.
6. El entorno no tiene Node.js ni un runner JavaScript de consola; se validó la aplicación y el test runner en el navegador integrado.
7. La exportación genera `data.js`; la verificación en navegador confirma nombre/contenido, limpia la credencial antigua de `localStorage` y no hace peticiones a la API de GitHub.
8. Commits locales: `e94ea85` (diagnóstico), `68eb4a3` (fix y pruebas) y pendiente (publicación segura).

**Estado:** implementación y pruebas completadas localmente. El flujo de publicación se sustituyó por exportación de `data.js` y publicación mediante rama Git + pull request; la aplicación no necesita credenciales de escritura. Se eliminó el secreto del código fuente de esta rama y se limpia la clave antigua del almacenamiento local al abrir la app. La credencial filtrada debe revocarse/rotarse desde GitHub; eso no puede hacerse desde este repositorio. PR pendiente.

## Fase 3 — Modernización UI/UX (iniciada; arquitectura por confirmar)

- Rama prevista: `feat/modern-ui`, independiente del PR de tema/publicación.
- La aplicación actual es HTML/CSS/JavaScript vanilla, sin `package.json`, framework ni entorno Node disponible en esta máquina.
- shadcn/ui y Radix UI requieren una aplicación basada en React (o una migración equivalente); no se pueden incorporar coherentemente como componentes accesibles en el HTML vanilla existente. Tailwind requerirá asimismo un proceso de compilación para producción.
- Antes de migrar la aplicación completa, confirmar si se aprueba adoptar React + Vite y el tooling asociado; la migración afecta la arquitectura, la carga de datos y la app completa, no solo los estilos.
- Mantener contraste WCAG AA, navegación accesible por teclado y diseño responsive.
- Incluir estados de carga, error y vacío.
- Mantener esta fase en un pull request separado, sin mezclarla con el fix de tema.
- No se han iniciado cambios visuales ni añadido dependencias mientras se confirma la arquitectura.

## Registro de fases

| Fecha | Fase | Resultado | Rama / PR | Estado |
|---|---|---|---|---|
| 2026-10-17 | 1 — Diagnóstico | Tema inexistente; error de Git por historiales sin ancestro común; documentados riesgos independientes de almacenamiento y sincronización web | `main` | Completada |
| 2026-10-17 | 2 — Tema y publicación segura | Preferencia segura, exportación de datos para rama/PR y 5 pruebas de navegador; se eliminó el secreto del cliente y se limpia la clave local antigua | `fix/theme-save-bug` | Implementada localmente; rotación de credencial y PR pendientes |
| 2026-10-17 | 3 — Modernización UI/UX | Inicio y evaluación del alcance; falta confirmar la migración de vanilla a React + Vite requerida por las bibliotecas solicitadas | `feat/modern-ui` | En pausa antes de modificar UI/tooling |
