# Plan de optimización y modernización

## Objetivo
1. Arreglar el bug que impide guardar en Git los cambios realizados al cambiar de tema en la app.
2. Modernizar la UI/UX con un sistema de temas accesible, rápido y mantenible.
3. Optimizar rendimiento, accesibilidad y consistencia visual.

## Reglas
- No cambiar el comportamiento externo de la aplicación sin justificarlo.
- Un pull request por bloque de trabajo.
- Todo cambio debe incluir tests o una verificación manual documentada.
- No añadir dependencias sin necesidad.
- Mantener compatibilidad con navegadores y dispositivos actuales.
- Revisar cada PR con CodeRabbit antes de fusionar.

## Fase 1 — Diagnóstico del bug de temas y Git

### Problema
Al cambiar de tema en la app, los cambios no se guardan correctamente en Git.

### Hipótesis a validar
- [ ] El tema se aplica en memoria, pero no se persiste en `localStorage`, cookies o perfil del usuario.
- [ ] El cambio de tema provoca un error de JavaScript que interrumpe el flujo de guardado.
- [ ] El estado del tema se guarda en un lugar no sincronizado con el resto del estado de la app.
- [ ] Hay un problema de hidratación, SSR o renderizado que revierte el tema.
- [ ] El botón o control de cambio de tema no dispara correctamente el guardado.
- [ ] Hay conflictos de estado entre tema claro, oscuro y tema del sistema.
- [ ] El guardado de Git falla por otro motivo y el cambio de tema solo lo hace visible.

### Tareas
- [ ] Identificar el componente, hook o función responsable del cambio de tema.
- [ ] Identificar dónde se guarda actualmente la preferencia de tema.
- [ ] Reproducir el bug y documentar pasos exactos.
- [ ] Revisar la consola del navegador y los errores de red.
- [ ] Comprobar si el cambio de tema modifica archivos, estado global o llamadas al backend.
- [ ] Determinar si el fallo es de persistencia del tema, de guardado en Git o de ambos.
- [ ] Escribir un test que reproduzca el bug antes de aplicar la corrección.

## Fase 2 — Corrección del bug

### Criterio de aceptación
- [ ] Al cambiar de tema, la preferencia se guarda de forma inmediata y segura.
- [ ] Al recargar la página, el tema seleccionado se mantiene.
- [ ] Si `localStorage` no está disponible, la app no falla y mantiene el tema en la sesión actual.
- [ ] El tema del sistema se respeta cuando el usuario no ha elegido uno manualmente.
- [ ] No hay parpadeo, salto de layout ni pérdida de estado al cambiar de tema.
- [ ] El usuario puede guardar o confirmar cambios en Git sin errores relacionados con el tema.
- [ ] Existe un test automatizado para el cambio y la persistencia del tema.

### Implementación recomendada
- Usar variables CSS como sistema de design tokens.
- Aplicar el tema mediante una clase o atributo en el elemento raíz, por ejemplo `<html class="dark">`.
- Guardar la preferencia con una clave estable, por ejemplo `app-theme`.
- Valores permitidos: `light`, `dark` y `system`.
- Si no hay preferencia guardada, usar `prefers-color-scheme`.
- Capturar errores de `localStorage` para que la app siga funcionando aunque el almacenamiento esté bloqueado.

## Fase 3 — Modernización de UI/UX

### Principios
- [ ] Diseño limpio, jerarquía visual clara y espaciado consistente.
- [ ] Contraste mínimo WCAG AA en ambos temas.
- [ ] Estados visibles para hover, focus, active, disabled, loading y error.
- [ ] Navegación por teclado completa.
- [ ] Etiquetas, roles ARIA y textos accesibles.
- [ ] Animaciones breves y respetando `prefers-reduced-motion`.
- [ ] Diseño responsive desde móvil.
- [ ] Sin cambios bruscos de layout al cargar o cambiar tema.

### Bibliotecas recomendadas
- **Tailwind CSS**: sistema de utilidades y design tokens.
- **shadcn/ui**: componentes modernos, personalizables y con propiedad total del código.
- **Radix UI**: primitivas accesibles para diálogos, menús, tooltips y controles.
- **Lucide**: iconografía ligera y consistente.
- **Framer Motion**: solo para microinteracciones y transiciones sutiles.

### Tareas
- [ ] Auditoría visual de pantallas principales.
- [ ] Definir tokens de color, tipografía, espaciado, radios y sombras.
- [ ] Crear tema claro y oscuro con contraste accesible.
- [ ] Sustituir colores hardcodeados por variables CSS.
- [ ] Modernizar botones, formularios, tarjetas, modales y navegación.
- [ ] Mejorar estados de carga, vacío y error.
- [ ] Revisar la experiencia en móvil.
- [ ] Ejecutar auditoría de accesibilidad.

## Fase 4 — Optimización

- [ ] Eliminar código duplicado.
- [ ] Reducir re-renderizados innecesarios.
- [ ] Cargar componentes pesados de forma diferida.
- [ ] Optimizar imágenes y recursos estáticos.
- [ ] Revisar dependencias obsoletas.
- [ ] Medir rendimiento antes y después.

## Registro de cambios

| Fecha | Módulo | Cambio | PR | Estado |
|---|---|---|---|---|
|  |  |  |  |  |

## Pendiente
- (Se actualizará tras el diagnóstico)
