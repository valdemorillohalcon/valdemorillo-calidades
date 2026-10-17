(function () {
  const results = document.getElementById("test-results");
  const summary = document.getElementById("test-summary");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function createRoot() {
    return {
      dataset: {},
      style: {},
      setAttribute(name, value) {
        this.dataset[name.replace(/^data-/, "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value;
      }
    };
  }

  function createMediaQuery(matches) {
    return {
      matches,
      listener: null,
      addEventListener(eventName, listener) {
        if (eventName === "change") this.listener = listener;
      },
      change(value) {
        this.matches = value;
        if (this.listener) this.listener();
      }
    };
  }

  function run(name, callback) {
    const item = document.createElement("li");
    try {
      callback();
      item.textContent = `PASS: ${name}`;
      passed += 1;
    } catch (error) {
      item.textContent = `FAIL: ${name} — ${error.message}`;
      failed += 1;
      console.error(error);
    }
    results.appendChild(item);
  }

  run("carga una preferencia guardada", () => {
    const root = createRoot();
    const store = { getItem: () => "dark", setItem() {} };
    const controller = ThemePreference.create({
      root,
      getStorage: () => store,
      getMediaQuery: () => createMediaQuery(false)
    });

    assert(controller.initialize() === "dark", "debe aplicar dark");
    assert(controller.getPreference() === "dark", "debe conservar la preferencia");
    assert(root.style.colorScheme === "dark", "debe actualizar color-scheme");
  });

  run("usa el tema del sistema cuando no hay preferencia", () => {
    const root = createRoot();
    const media = createMediaQuery(true);
    const controller = ThemePreference.create({
      root,
      getStorage: () => ({ getItem: () => null, setItem() {} }),
      getMediaQuery: () => media
    });

    assert(controller.initialize() === "dark", "debe adoptar el modo oscuro del sistema");
    media.change(false);
    assert(root.style.colorScheme === "light", "debe reaccionar al cambio del sistema");
  });

  run("persiste y aplica las preferencias elegidas", () => {
    const root = createRoot();
    const values = {};
    const controller = ThemePreference.create({
      root,
      getStorage: () => ({
        getItem: key => values[key] || null,
        setItem: (key, value) => { values[key] = value; }
      }),
      getMediaQuery: () => createMediaQuery(false)
    });

    controller.initialize();
    const result = controller.setPreference("dark");
    assert(result.accepted && result.persisted, "debe aceptar y persistir la preferencia");
    assert(values["app-theme"] === "dark", "debe usar la clave app-theme");
    assert(root.style.colorScheme === "dark", "debe aplicar el tema elegido");
    assert(controller.setPreference("system").theme === "light", "system debe volver a resolver el tema del sistema");
    assert(values["app-theme"] === "system", "debe persistir system");
  });

  run("rechaza valores guardados o seleccionados no válidos", () => {
    const root = createRoot();
    const controller = ThemePreference.create({
      root,
      getStorage: () => ({ getItem: () => "blue", setItem() {} }),
      getMediaQuery: () => createMediaQuery(false)
    });

    controller.initialize();
    assert(controller.getPreference() === "system", "un valor almacenado desconocido debe usar system");
    assert(controller.setPreference("blue").accepted === false, "no debe aceptar valores fuera de la lista");
  });

  run("continúa funcionando si localStorage no está disponible", () => {
    const root = createRoot();
    let storageErrors = 0;
    const controller = ThemePreference.create({
      root,
      getStorage() {
        throw new Error("storage blocked");
      },
      getMediaQuery: () => createMediaQuery(false),
      onStorageError() {
        storageErrors += 1;
      }
    });

    controller.initialize();
    const result = controller.setPreference("dark");
    assert(result.accepted && !result.persisted, "debe mantener la selección solo en memoria");
    assert(root.style.colorScheme === "dark", "debe aplicar el tema aunque falle el almacenamiento");
    assert(storageErrors === 2, "debe notificar fallos de lectura y escritura");
  });

  summary.textContent = `${passed} correctas, ${failed} fallidas`;
  summary.dataset.result = failed === 0 ? "passed" : "failed";
})();
