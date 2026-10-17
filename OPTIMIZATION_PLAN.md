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

El error Git reproducido era un problema de historial del repositorio, no del tema ni de un error JavaScript causado por cambiarlo. El futuro fix de tema debe crear la funcionalidad ausente y no debe modificar `data.js`, invocar la sincronización GitHub ni alterar el estado de materiales/estancias.

## Fase 2 — Persistencia segura del tema (pendiente)

### Requisitos y aceptación

- Usar la clave `app-theme` y aceptar únicamente `light`, `dark` y `system`.
- Si no hay preferencia válida, resolver el aspecto inicial con `prefers-color-scheme`.
- Persistir de manera segura y no romper la aplicación si `localStorage` falla.
- Aplicar el tema al elemento raíz y mantener la preferencia separada del estado de materiales y estancias.
- Probar selección, recarga, valor inválido, ausencia de preferencia y almacenamiento inaccesible.
- No cambiar la lógica ni los datos de sincronización con GitHub como parte del fix de tema.

### Trabajo previsto

1. Crear la rama `fix/theme-save-bug` desde `main`.
2. Implementar la selección y persistencia de tema siguiendo los requisitos anteriores.
3. Añadir pruebas automatizadas adecuadas al proyecto y ejecutar las verificaciones pertinentes.
4. Actualizar este plan al completar la fase.
5. Crear commits pequeños y un pull request exclusivo para el fix.

**Estado:** pendiente de autorización para comenzar la implementación.

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
|  | 2 — Persistencia del tema | Pendiente | `fix/theme-save-bug` | Bloqueada hasta autorización |
|  | 3 — Modernización UI/UX | Pendiente de aprobación del fix | `feat/modern-ui` | Bloqueada |
