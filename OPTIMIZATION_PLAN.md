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
- Antes de las Fases 2 y 3, el botón de sincronización serializaba materiales y estancias y actualizaba `data.js` directamente con la API de GitHub. Ese comportamiento se eliminó: no ejecutaba `git pull` ni guardaba la preferencia de tema.
- Si la consulta GET de `data.js` no tiene éxito, el flujo continúa sin SHA y trata de hacer el PUT de todas formas. La API requiere el SHA para reemplazar un archivo existente, por lo que ese camino puede fallar y el estado visible depende de la respuesta del PUT.
- `app.js` contiene una credencial de GitHub embebida en código ejecutado por el navegador. Debe considerarse expuesta, revocarse/rotarse y no volver a distribuirse como secreto del cliente. La sincronización necesitará una solución de autorización segura antes de considerarse apta para producción.

### Conclusión

El error Git reproducido era un problema de historial del repositorio, no del tema ni de un error JavaScript causado por cambiarlo. La Fase 2 añade la preferencia de tema que faltaba; no modifica `data.js` ni invoca la sincronización GitHub.

## Fase 2 — Persistencia segura del tema (integrada en producción)

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

**Estado:** integrada en `main` mediante [PR #1](https://github.com/valdemorillohalcon/valdemorillo-calidades/pull/1). El despliegue de GitHub Pages terminó correctamente. El flujo de publicación se sustituyó por exportación de `data.js` y publicación mediante rama Git + pull request; la aplicación no necesita credenciales de escritura.

## Fase 3 — Modernización UI/UX (integrada en producción)

- Rama `feat/modern-ui`, apilada sobre `fix/theme-save-bug` para conservar la separación de fases; integrada mediante [PR #2](https://github.com/valdemorillohalcon/valdemorillo-calidades/pull/2).
- Se renovaron la cabecera, la navegación, el hero de inicio, los indicadores de presupuesto, las tarjetas y la vista de estancias con una identidad cálida y 662 iconos Lucide renderizados.
- Se simplificó la navegación a Calidades, Inspiración y Obra; el control visible de guardado ahora solo confirma el guardado local automático.
- Se eliminaron de la interfaz principal el acceso de publicación Git, los controles de respaldo visibles y la antigua sincronización remota. La aplicación no hace escrituras remotas ni ofrece un botón que aparente hacerlo.
- No se añadió un acceso con claves compartidas: no daría protección real a una web estática y no es adecuado presentar esa falsa garantía.
- Esta versión vanilla usa CSS propio y Lucide; shadcn/ui/Radix no son compatibles sin migrar toda la aplicación a React. No se añadió tooling nuevo ni dependencias.
- Verificación en navegador: 0 errores JavaScript, 662 iconos Lucide renderizados y 42 tarjetas de materiales.
- Se probaron las vistas de Calidades, Inspiración y Obra a 320, 375, 768, 1024 y 1440 px: 15 combinaciones sin desbordamiento horizontal.
- Guardar confirma materiales y estancias en `localStorage`; modo claro/oscuro y la navegación al informe del aparejador se verificaron.
- El runner de temas continúa con 5 pruebas correctas y 0 fallidas.
- Contraste comprobado en los colores base de texto, fondos y botón principal; los estados de vista vacía existentes se mantienen. El informe conserva mediciones, costes y notas de montaje e imprime/exporta CSV.
- No se ofrece autenticación ficticia con nombres compartidos. El guardado es local y no publica ni sincroniza datos entre dispositivos.

## Fase 4 — Organización de partidas y acceso del aparejador

- Las partidas se presentan agrupadas por capítulo plegable, con número de elementos, estados y decisiones de Laura y Alex; se abre como máximo un capítulo a la vez y solo se renderizan sus tarjetas.
- La búsqueda abre una sección única con los resultados visibles, y el selector de capítulo expande directamente el grupo correspondiente.
- El encabezado de marca y el favicon usan un monograma de casa `L·A`; la navegación profesional se identifica como «Aparejador» y su vista como «Documentación para el aparejador».
- La documentación explica el acceso de edición y ofrece «Editar partidas» para volver a las fichas, donde se pueden actualizar calidades, mediciones, precios, estados, notas y referencias.
- Límite de producto: la página estática no dispone de cuentas o permisos diferenciados. Cualquier visitante puede editar datos en su navegador, pero estos cambios se guardan localmente y no se sincronizan con los dispositivos de otros colaboradores. La app lo comunica sin prometer permisos que no existen.
- Verificación en navegador: 14 capítulos / 65 partidas en la vista «Todo», un solo capítulo abierto a la vez, búsqueda que mostró 7 resultados, selector de capítulo que expande directamente su grupo y documentación con 65 filas. A 320 px no hay desbordamiento horizontal.
- GitHub Pages desplegó el cambio. La verificación detectó que una sesión de navegador seguía usando el JavaScript previo por caché; las URLs con versión fuerzan la descarga de JavaScript, datos, estilos e icono actualizados.

## Revisión del guardado

- Reproducido en producción: los dos conjuntos de datos existentes (materiales e inspiración) estaban escritos en `localStorage` y coincidían con el estado cargado; pulsar «Guardar» conservaba ambos valores.
- Causa del aviso imperceptible: `#save-toast` estaba dentro del lightbox, cuyo estado cerrado aplica opacidad cero a todo su contenido. El guardado local funcionaba, pero su confirmación visual quedaba oculta.
- Se movió el aviso fuera del lightbox para hacerlo visible y accesible. El botón solo muestra «Guardado» si ambas escrituras tienen éxito; ante un fallo, el botón permanece disponible y el aviso distingue si se guardó parcialmente o no se guardó nada.
- Se eliminó la transición de opacidad del aviso para que no dependa del ciclo de animación del navegador; se conserva el desplazamiento breve.
- La confirmación especifica que los datos se guardan en este dispositivo. La app estática no sincroniza datos ni actualiza el contenido publicado para otros usuarios; eso requiere un servicio compartido con backend.
- Se versionaron las URLs de CSS y JavaScript para que la confirmación corregida no quede oculta por cachés del navegador.
- Validación en navegador: cambio de dato sobrevivió a una recarga real y se restauró exactamente el almacenamiento original; el aviso quedó fuera del lightbox, apareció con el estado de éxito y el botón siguió disponible ante cuota de almacenamiento simulada.

## Almacenamiento compartido entre dispositivos

- Se confirmó el proyecto Supabase `narqcdtjxwoynmfqacmu` en la organización del usuario; clave `publishable`, nunca `secret`/`service_role`.
- Se preparó `public.shared_app_state` con RLS y políticas limitadas a la fila `id = 1`, permitiendo lectura, inserción inicial y actualización anónimas según la opción pública elegida.
- La aplicación carga el registro compartido al iniciar, lo inicializa una sola vez desde los datos locales existentes si está vacío, sincroniza los cambios automáticos y actualiza otras sesiones mediante sondeo cada 15 segundos.
- La integración mantiene `localStorage` como caché/respaldo offline y distingue explícitamente entre persistencia compartida y cambios que solo están en el dispositivo.
- La política pública permite que cualquier visitante con el enlace edite la información; no se presenta como autenticación ni como control de acceso.
- Verificación real: el endpoint anónimo responde con RLS; se inicializó la fila común con 65 materiales y 15 estancias del almacenamiento local existente.
- Prueba entre dos sesiones: un cambio reversible enviado desde una sesión apareció en la otra mediante sondeo; la modificación se restauró en Supabase y ambas cachés quedaron consistentes.
- Prueba de recarga: se introdujo un valor local obsoleto en la segunda sesión y, al recargar, prevalecieron los datos compartidos del servidor (65/15), reemplazando la caché.
- Prueba de errores y reintento: un fallo de red simulado se informó como almacenamiento solo local, mantuvo disponible el botón y una escritura posterior volvió a compartir el estado correctamente. Las 5 pruebas de persistencia del tema siguen pasando.
- Publicación: integrar esta implementación en `main` mediante PR; GitHub Pages despliega automáticamente el código.

## Registro de fases

| Fecha | Fase | Resultado | Rama / PR | Estado |
|---|---|---|---|---|
| 2026-10-17 | 1 — Diagnóstico | Tema inexistente; error de Git por historiales sin ancestro común; documentados riesgos independientes de almacenamiento y sincronización web | `main` | Completada |
| 2026-10-17 | 2 — Tema y publicación segura | Preferencia segura, exportación de datos para rama/PR y 5 pruebas de navegador; se eliminó la escritura GitHub desde el cliente | `fix/theme-save-bug` / [PR #1](https://github.com/valdemorillohalcon/valdemorillo-calidades/pull/1) | Integrada y publicada |
| 2026-10-17 | 3 — Modernización UI/UX | Nuevo inicio visual, navegación e iconografía, guardado local sencillo, limpieza de acciones técnicas y verificación responsive | `feat/modern-ui` / [PR #2](https://github.com/valdemorillohalcon/valdemorillo-calidades/pull/2) | Integrada y publicada |
| 2026-10-17 | 4 — Organización y área del aparejador | Capítulos plegables y búsqueda orientada a resultados, marca de Laura y Alex, documentación técnica, edición/local y recarga fiable de recursos cacheados | `feat/organized-material-browser` | Integrada en `main` mediante PR #3; versionado de recursos para clientes con caché antigua |
| 2026-10-17 | Revisión del guardado | Aviso visible y estado de confirmación coherente con escritura y recuperación local | `fix/save-confirmation` / [PR #5](https://github.com/valdemorillohalcon/valdemorillo-calidades/pull/5) | Integrada y publicada |
| 2026-10-17 | Almacenamiento compartido | Sincronización de datos de materiales/estancias a Supabase con RLS y actualización entre sesiones | `feat/shared-cloud-storage` | Implementación lista; publicación por PR a `main` |
