(function (global) {
  const STORAGE_KEY = "app-theme";
  const VALID_PREFERENCES = ["light", "dark", "system"];

  function createThemeController(options = {}) {
    const root = options.root || global.document.documentElement;
    const getStorage = options.getStorage || (() => global.localStorage);
    const getMediaQuery = options.getMediaQuery || (() => (
      typeof global.matchMedia === "function"
        ? global.matchMedia("(prefers-color-scheme: dark)")
        : null
    ));
    const reportStorageError = options.onStorageError || ((error, operation) => {
      console.warn(`No se pudo ${operation} la preferencia de tema.`, error);
    });

    let preference = "system";
    let mediaQuery = null;
    let initialized = false;

    function readPreference() {
      try {
        const value = getStorage().getItem(STORAGE_KEY);
        return VALID_PREFERENCES.includes(value) ? value : "system";
      } catch (error) {
        reportStorageError(error, "leer");
        return "system";
      }
    }

    function persistPreference(value) {
      try {
        getStorage().setItem(STORAGE_KEY, value);
        return true;
      } catch (error) {
        reportStorageError(error, "guardar");
        return false;
      }
    }

    function resolveTheme() {
      if (preference !== "system") return preference;
      return mediaQuery && mediaQuery.matches ? "dark" : "light";
    }

    function applyTheme() {
      const theme = resolveTheme();
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
      return theme;
    }

    function handleSystemThemeChange() {
      if (preference === "system") applyTheme();
    }

    function initialize() {
      if (initialized) return applyTheme();
      preference = readPreference();
      try {
        mediaQuery = getMediaQuery();
      } catch (error) {
        console.warn("No se pudo consultar el tema del sistema.", error);
        mediaQuery = null;
      }

      if (mediaQuery) {
        if (typeof mediaQuery.addEventListener === "function") {
          mediaQuery.addEventListener("change", handleSystemThemeChange);
        } else if (typeof mediaQuery.addListener === "function") {
          mediaQuery.addListener(handleSystemThemeChange);
        }
      }

      initialized = true;
      return applyTheme();
    }

    function setPreference(value) {
      if (!VALID_PREFERENCES.includes(value)) {
        return { accepted: false, persisted: false, theme: resolveTheme() };
      }

      if (!initialized) initialize();
      preference = value;
      const persisted = persistPreference(value);
      const theme = applyTheme();
      return { accepted: true, persisted, theme };
    }

    return {
      initialize,
      getPreference: () => preference,
      getResolvedTheme: resolveTheme,
      setPreference
    };
  }

  global.ThemePreference = { create: createThemeController };
  global.themeController = createThemeController();
  global.themeController.initialize();
})(window);
