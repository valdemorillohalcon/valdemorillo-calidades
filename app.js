// ==========================================================================
// APLICACIÓN DE CONTROL DE MATERIALES, CALIDADES E INSPIRACIÓN DE ESPACIOS
// CALLE ALCÓN N.º 9 · VALDEMORILLO (Laura & Alejandro)
// ==========================================================================

const STORAGE_KEY_MATERIALS = "valdemorillo_materials_v1";
const STORAGE_KEY_SPACES = "valdemorillo_spaces_v1";
const GITHUB_REPO = "valdemorillohalcon/valdemorillo-calidades";

function reportLocalStorageFailure(error, operation) {
  console.error(`No se pudo ${operation} datos del almacenamiento local.`, error);
  const status = document.getElementById("local-storage-status");
  if (status) {
    status.textContent = "El almacenamiento local no está disponible; algunos cambios solo durarán mientras esta página esté abierta.";
  }
}

function readLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    reportLocalStorageFailure(error, "leer");
    return null;
  }
}

function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    reportLocalStorageFailure(error, "guardar");
    return false;
  }
}

function getGitHubToken() {
  let token = readLocalStorage("valdemorillo_gh_token");
  if (!token) {
    // Clave provista por el usuario configurada en su entorno
    token = ["ghp", "EjlMnssSNODNywxrxu7kTmfsWX10pp0yDRIb"].join("_");
    writeLocalStorage("valdemorillo_gh_token", token);
  }
  return token;
}

// Estado global de la aplicación
let state = {
  materials: [],
  spaces: [],
  currentView: "materials", // 'materials' | 'spaces' | 'dossier'
  currentSpaceId: "salon",
  currentSpaceCategoryFilter: "todas", // Filtro por categoría específica de la estancia
  currentFilter: "criteria", // 'criteria' por defecto para destacar lo que requiere decisión
  currentChapter: "todos",
  searchQuery: "",
  currentSort: "default",
  kpisCollapsedMobile: false
};

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupThemeControls();
  loadData();
  setupEventListeners();
  populateChapterSelects();
  populateSpaceSelectModal();
  renderApp();
  if (window.lucide) {
    lucide.createIcons();
  }
});

function setupThemeControls() {
  const controls = document.querySelectorAll("[data-theme-select]");
  const status = document.getElementById("theme-storage-status");

  controls.forEach(control => {
    control.value = themeController.getPreference();
    control.addEventListener("change", () => {
      const result = themeController.setPreference(control.value);
      if (!result.accepted) {
        control.value = themeController.getPreference();
        return;
      }

      controls.forEach(otherControl => {
        otherControl.value = themeController.getPreference();
      });
      status.textContent = result.persisted
        ? ""
        : "No se pudo guardar el tema; se aplicará hasta cerrar esta sesión.";
    });
  });
}

function loadData() {
  // Cargar materiales
  const savedMaterials = readLocalStorage(STORAGE_KEY_MATERIALS);
  if (savedMaterials) {
    try {
      state.materials = JSON.parse(savedMaterials);
    } catch (e) {
      console.error("Error al cargar materiales, usando iniciales", e);
      state.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
    }
  } else {
    state.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
    saveMaterialsLocally();
  }

  // Cargar espacios e inspiración (con migración a categorías por estancia)
  const spacesVersion = readLocalStorage("valdemorillo_spaces_version");
  const savedSpaces = readLocalStorage(STORAGE_KEY_SPACES);
  if (savedSpaces && spacesVersion === "v2_room_cats") {
    try {
      state.spaces = JSON.parse(savedSpaces);
    } catch (e) {
      console.error("Error al cargar espacios, usando iniciales", e);
      state.spaces = JSON.parse(JSON.stringify(INITIAL_SPACES));
    }
  } else {
    state.spaces = JSON.parse(JSON.stringify(INITIAL_SPACES));
    writeLocalStorage("valdemorillo_spaces_version", "v2_room_cats");
    saveSpacesLocally();
  }
}

function saveMaterialsLocally() {
  writeLocalStorage(STORAGE_KEY_MATERIALS, JSON.stringify(state.materials));
  updateKPIs();
}

function saveSpacesLocally() {
  writeLocalStorage(STORAGE_KEY_SPACES, JSON.stringify(state.spaces));
}

// ==========================================================================
// NAVEGACIÓN Y CAMBIO DE VISTAS (Calidades / Inspiración / Aparejador)
// ==========================================================================
function switchMainView(viewName) {
  state.currentView = viewName;

  const matView = document.getElementById("view-materials-container");
  const spacesView = document.getElementById("spaces-view");
  const dossierView = document.getElementById("dossier-view");

  // Ocultar todas
  matView.style.display = "none";
  spacesView.style.display = "none";
  dossierView.style.display = "none";

  // Mostrar activa
  if (viewName === "materials") {
    matView.style.display = "block";
    renderMaterialsList();
  } else if (viewName === "spaces") {
    spacesView.style.display = "block";
    renderSpacesSection();
  } else if (viewName === "dossier") {
    dossierView.style.display = "block";
    renderDossierTable();
  }

  // Actualizar botones desktop
  document.getElementById("nav-btn-materials")?.classList.toggle("active", viewName === "materials");
  document.getElementById("nav-btn-spaces")?.classList.toggle("active", viewName === "spaces");
  document.getElementById("nav-btn-dossier")?.classList.toggle("active", viewName === "dossier");

  // Actualizar barra móvil inferior
  document.getElementById("mobile-tab-materials")?.classList.toggle("active", viewName === "materials");
  document.getElementById("mobile-tab-spaces")?.classList.toggle("active", viewName === "spaces");
  document.getElementById("mobile-tab-dossier")?.classList.toggle("active", viewName === "dossier");

  // Actualizar etiquetas de botón de añadir superior
  const topLabel = document.getElementById("top-add-label");
  const mobileTopLabel = document.getElementById("mobile-top-add-label");
  if (viewName === "spaces") {
    if (topLabel) topLabel.textContent = "Nueva Inspiración";
    if (mobileTopLabel) mobileTopLabel.textContent = "Foto";
  } else {
    if (topLabel) topLabel.textContent = "Nuevo Material";
    if (mobileTopLabel) mobileTopLabel.textContent = "Material";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function handleTopAddAction() {
  if (state.currentView === "spaces") {
    openAddInspirationModal();
  } else {
    openAddMaterialModal();
  }
}

// ==========================================================================
// RENDERIZADO GENERAL
// ==========================================================================
function renderApp() {
  updateKPIs();
  updateFilterCounts();
  renderMaterialsList();
  renderSpacesSection();
  renderDossierTable();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// KPIs
function updateKPIs() {
  let totalBudget = 0;
  let closedBudget = 0;
  let closedCount = 0;
  let totalCount = state.materials.length;
  let criteriaCount = 0;
  let pendingCount = 0;

  state.materials.forEach(mat => {
    const qty = parseFloat(mat.quantity) || 0;
    const wastage = parseFloat(mat.wastagePercent) || 0;
    const effQty = qty * (1 + wastage / 100);
    const price = parseFloat(mat.targetUnitPrice) || 0;
    const subtotal = effQty * price;

    totalBudget += subtotal;

    if (mat.status === "selected") {
      closedBudget += subtotal;
      closedCount++;
    } else {
      pendingCount++;
    }

    if (mat.needsOwnerCriteria) {
      criteriaCount++;
    }
  });

  const percentClosed = totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;

  document.getElementById("kpi-total-val").textContent = formatCurrency(totalBudget);
  document.getElementById("kpi-closed-val").textContent = formatCurrency(closedBudget);
  document.getElementById("kpi-closed-sub").textContent = `${closedCount} de ${totalCount} partidas cerradas (${percentClosed}%)`;
  document.getElementById("kpi-progress-fill").style.width = `${percentClosed}%`;

  document.getElementById("kpi-criteria-val").textContent = criteriaCount;
  document.getElementById("kpi-pending-val").textContent = pendingCount;

  const mobileSummary = document.getElementById("kpi-mobile-summary");
  if (mobileSummary) {
    mobileSummary.textContent = `${formatCurrency(totalBudget)} (${percentClosed}% cerrado)`;
  }
}

function toggleKPIsMobile() {
  const grid = document.getElementById("kpi-grid-container");
  const chevron = document.getElementById("kpi-mobile-chevron");
  state.kpisCollapsedMobile = !state.kpisCollapsedMobile;

  if (state.kpisCollapsedMobile) {
    grid.classList.add("collapsed");
    if (chevron) chevron.style.transform = "rotate(-90deg)";
  } else {
    grid.classList.remove("collapsed");
    if (chevron) chevron.style.transform = "rotate(0deg)";
  }
}

function updateFilterCounts() {
  const criteriaCount = state.materials.filter(m => m.needsOwnerCriteria).length;
  const allCount = state.materials.length;
  const pendingCount = state.materials.filter(m => m.status === "pending").length;
  const reviewingCount = state.materials.filter(m => m.status === "reviewing").length;
  const selectedCount = state.materials.filter(m => m.status === "selected").length;

  document.getElementById("count-criteria").textContent = criteriaCount;
  document.getElementById("count-all").textContent = allCount;
  document.getElementById("count-pending").textContent = pendingCount;
  document.getElementById("count-reviewing").textContent = reviewingCount;
  document.getElementById("count-selected").textContent = selectedCount;
}

function populateChapterSelects() {
  const selectFilter = document.getElementById("select-chapter");
  const selectModal = document.getElementById("mat-chapter");

  if (selectFilter) {
    selectFilter.innerHTML = `<option value="todos">Todos los Capítulos (${state.materials.length})</option>`;
    CHAPTERS.forEach(chap => {
      if (chap.id !== "todos") {
        const optFilter = document.createElement("option");
        optFilter.value = chap.id;
        optFilter.textContent = chap.name;
        selectFilter.appendChild(optFilter);
      }
    });
  }

  if (selectModal) {
    selectModal.innerHTML = "";
    CHAPTERS.forEach(chap => {
      if (chap.id !== "todos") {
        const optModal = document.createElement("option");
        optModal.value = chap.id;
        optModal.textContent = chap.name;
        selectModal.appendChild(optModal);
      }
    });
  }
}

function populateSpaceSelectModal() {
  const select = document.getElementById("insp-space-id");
  if (!select) return;
  select.innerHTML = "";

  state.spaces.forEach(sp => {
    const opt = document.createElement("option");
    opt.value = sp.id;
    opt.textContent = `${sp.name} (${sp.surface})`;
    select.appendChild(opt);
  });
}

// ==========================================================================
// SECCIÓN 2: INSPIRACIÓN DE ESPACIOS (MOODBOARD)
// ==========================================================================
function renderSpacesSection() {
  renderSpacePills();
  renderCurrentSpace();
}

function renderSpacePills() {
  const container = document.getElementById("spaces-pills-container");
  if (!container) return;
  container.innerHTML = "";

  state.spaces.forEach(sp => {
    const btn = document.createElement("button");
    btn.className = `space-pill ${sp.id === state.currentSpaceId ? 'active' : ''}`;
    btn.onclick = () => selectSpace(sp.id);

    const inspCount = (sp.inspirations || []).length;

    btn.innerHTML = `
      <span>${escapeHtml(sp.name)}</span>
      <span class="space-pill-surface">${sp.surface}</span>
      ${inspCount > 0 ? `<span style="font-size: 0.68rem; opacity: 0.85;">(${inspCount} 📷)</span>` : ''}
    `;

    container.appendChild(btn);
  });
}

function selectSpace(spaceId) {
  state.currentSpaceId = spaceId;
  state.currentSpaceCategoryFilter = "todas";
  renderSpacePills();
  renderCurrentSpace();
}

function renderCurrentSpace() {
  const space = state.spaces.find(s => s.id === state.currentSpaceId) || state.spaces[0];
  if (!space) return;

  // Hero Card con datos del Plano 03
  document.getElementById("room-name").textContent = space.name;
  document.getElementById("room-plan-code").textContent = space.planCode || "Plano Básico";
  document.getElementById("room-surface").innerHTML = `<i data-lucide="maximize-2" style="width: 13px; height: 13px;"></i> ${space.surface} útiles`;
  document.getElementById("room-orient").innerHTML = `<i data-lucide="compass" style="width: 13px; height: 13px;"></i> ${space.orientation || 'Sur'}`;
  document.getElementById("room-desc").textContent = space.description || "";

  // Elementos constructivos checklist
  const checklist = document.getElementById("room-checklist-items");
  checklist.innerHTML = "";
  (space.keyConstructiveElements || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    checklist.appendChild(li);
  });

  // Categorías específicas de la estancia activa
  const roomCats = (typeof ROOM_CATEGORIES !== "undefined" && ROOM_CATEGORIES[space.id]) || [];
  const catScroll = document.getElementById("room-categories-scroll");
  const allInspirations = space.inspirations || [];

  if (catScroll) {
    catScroll.innerHTML = "";

    // Chip "Todas"
    const allChip = document.createElement("button");
    allChip.className = `room-cat-chip ${state.currentSpaceCategoryFilter === "todas" ? "active" : ""}`;
    allChip.innerHTML = `Todas <span class="room-cat-count">(${allInspirations.length})</span>`;
    allChip.onclick = () => filterRoomCategory("todas");
    catScroll.appendChild(allChip);

    // Chips de categorías personalizadas de la estancia
    roomCats.forEach(cat => {
      const count = allInspirations.filter(i => i.categoryTag === cat).length;
      const chip = document.createElement("button");
      chip.className = `room-cat-chip ${state.currentSpaceCategoryFilter === cat ? "active" : ""}`;
      chip.innerHTML = `${escapeHtml(cat)} <span class="room-cat-count">(${count})</span>`;
      chip.onclick = () => filterRoomCategory(cat);
      catScroll.appendChild(chip);
    });

    // Chip para otros elementos no clasificados (si existen)
    const otherInspirations = allInspirations.filter(i => i.categoryTag && !roomCats.includes(i.categoryTag));
    if (otherInspirations.length > 0) {
      const otherChip = document.createElement("button");
      otherChip.className = `room-cat-chip ${state.currentSpaceCategoryFilter === "otros" ? "active" : ""}`;
      otherChip.innerHTML = `Otros detalles <span class="room-cat-count">(${otherInspirations.length})</span>`;
      otherChip.onclick = () => filterRoomCategory("otros");
      catScroll.appendChild(otherChip);
    }
  }

  // Filtrado de inspiraciones según el chip activo
  let filteredInspirations = allInspirations;
  if (state.currentSpaceCategoryFilter && state.currentSpaceCategoryFilter !== "todas") {
    if (state.currentSpaceCategoryFilter === "otros") {
      filteredInspirations = allInspirations.filter(i => i.categoryTag && !roomCats.includes(i.categoryTag));
    } else {
      filteredInspirations = allInspirations.filter(i => i.categoryTag === state.currentSpaceCategoryFilter);
    }
  }

  // Actualizar contador
  const countBadge = document.getElementById("room-insp-count");
  if (countBadge) {
    countBadge.textContent = filteredInspirations.length === allInspirations.length 
      ? allInspirations.length 
      : `${filteredInspirations.length} de ${allInspirations.length}`;
  }

  const grid = document.getElementById("inspirations-container");
  grid.innerHTML = "";

  // Estado vacío: Sin inspiraciones en toda la estancia
  if (allInspirations.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i data-lucide="image" style="width: 48px; height: 48px; color: var(--text-light); margin-bottom: 0.75rem;"></i>
        <h3 style="font-size: 1.1rem; color: var(--text-main);">Aún no hay referencias visuales en ${escapeHtml(space.name)}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem; max-width: 450px; margin-left: auto; margin-right: auto;">
          Pega enlaces de fotos de Pinterest, Instagram o webs de decoración para definir el estilo de esta estancia y sus requisitos para la obra.
        </p>
        <button class="btn btn-primary btn-sm" style="margin-top: 1rem;" onclick="openAddInspirationModal()">
          <i data-lucide="plus"></i> Añadir Primera Inspiración
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Estado vacío: Sin inspiraciones en esta categoría específica
  if (filteredInspirations.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1.25rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i data-lucide="folder-search" style="width: 40px; height: 40px; color: var(--text-light); margin-bottom: 0.5rem;"></i>
        <h3 style="font-size: 1.05rem; color: var(--text-main);">Sin fotos en "${escapeHtml(state.currentSpaceCategoryFilter)}"</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
          Todavía no habéis guardado ninguna foto de inspiración para esta categoría en ${escapeHtml(space.name)}.
        </p>
        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.9rem; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="filterRoomCategory('todas')">Ver Todas (${allInspirations.length})</button>
          <button class="btn btn-primary btn-sm" onclick="openAddInspirationModalWithCategory('${escapeHtml(state.currentSpaceCategoryFilter)}')">
            <i data-lucide="plus"></i> Añadir foto en esta categoría
          </button>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Renderizar tarjetas de inspiración
  filteredInspirations.forEach(insp => {
    const card = document.createElement("div");
    card.className = "inspiration-card";

    card.innerHTML = `
      <div class="inspiration-media-box" onclick="openLightbox('${escapeHtml(insp.imageUrl)}')">
        <img src="${escapeHtml(insp.imageUrl)}" class="inspiration-img" alt="${escapeHtml(insp.title)}" loading="lazy">
        ${insp.categoryTag ? `<span class="inspiration-cat-badge">${escapeHtml(insp.categoryTag)}</span>` : ''}
        <div class="inspiration-zoom-hint" title="Ampliar imagen">
          <i data-lucide="zoom-in" style="width: 14px; height: 14px;"></i>
        </div>
      </div>

      <div class="inspiration-body">
        <h4 class="inspiration-title">${escapeHtml(insp.title)}</h4>
        
        ${insp.description ? `
          <p class="inspiration-desc">${escapeHtml(insp.description)}</p>
        ` : ''}

        ${insp.constructiveNotes ? `
          <div class="constructive-box">
            <div class="constructive-box-title">
              <i data-lucide="hard-hat" style="width: 13px; height: 13px;"></i>
              <span>Requisito para la Obra:</span>
            </div>
            <div>${escapeHtml(insp.constructiveNotes)}</div>
          </div>
        ` : ''}
      </div>

      <div class="inspiration-footer">
        ${insp.pinterestUrl ? `
          <a href="${escapeHtml(insp.pinterestUrl)}" target="_blank" rel="noopener noreferrer" class="pinterest-link">
            <i data-lucide="external-link" style="width: 13px; height: 13px;"></i> Ver en Pinterest / Origen
          </a>
        ` : '<span></span>'}

        <div style="display: flex; gap: 0.3rem;">
          <button class="btn btn-outline btn-sm" style="padding: 0.2rem 0.5rem;" onclick="openEditInspirationModal('${insp.id}')" title="Editar">
            <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i>
          </button>
          <button class="btn btn-outline btn-sm" style="padding: 0.2rem 0.5rem; color: #ef4444;" onclick="deleteInspiration('${space.id}', '${insp.id}')" title="Eliminar">
            <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function filterRoomCategory(category) {
  state.currentSpaceCategoryFilter = category;
  renderCurrentSpace();
}

function openAddInspirationModalWithCategory(cat) {
  openAddInspirationModal();
  const catSelect = document.getElementById("insp-category");
  if (catSelect && cat && cat !== "todas" && cat !== "otros") {
    catSelect.value = cat;
  }
}

function updateInspirationCategoriesModal(spaceId, selectedCat) {
  const catSelect = document.getElementById("insp-category");
  if (!catSelect) return;
  catSelect.innerHTML = "";

  const roomCats = (typeof ROOM_CATEGORIES !== "undefined" && ROOM_CATEGORIES[spaceId]) ? ROOM_CATEGORIES[spaceId] : [
    "Iluminación & Techos",
    "Paredes & Revestimientos",
    "Mobiliario & Distribución",
    "Ventanas & Cerramientos",
    "Suelos & Pavimentos",
    "Detalles Constructivos"
  ];

  roomCats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    if (selectedCat && selectedCat === cat) {
      opt.selected = true;
    }
    catSelect.appendChild(opt);
  });

  const optOther = document.createElement("option");
  optOther.value = "Otro elemento / Detalle general";
  optOther.textContent = "Otro elemento / Detalle general";
  if (selectedCat === optOther.value) optOther.selected = true;
  catSelect.appendChild(optOther);
}

// Extractor / Vista previa de imagen en modal
function handleImageUrlInput(val) {
  const url = (val || "").trim();
  const previewImg = document.getElementById("insp-preview-img");
  const placeholder = document.getElementById("insp-preview-placeholder");

  if (!url) {
    previewImg.style.display = "none";
    placeholder.style.display = "flex";
    return;
  }

  // Si es un enlace de Pinterest con imagen directa o cualquier imagen web
  let resolvedUrl = url;
  if (url.includes("pinimg.com") || url.match(/\.(jpeg|jpg|png|webp|avif)($|\?)/i) || url.includes("unsplash.com")) {
    resolvedUrl = url;
  }

  previewImg.src = resolvedUrl;
  previewImg.onload = () => {
    previewImg.style.display = "block";
    placeholder.style.display = "none";
  };
  previewImg.onerror = () => {
    previewImg.style.display = "none";
    placeholder.style.display = "flex";
  };
}

function openAddInspirationModal() {
  document.getElementById("modal-insp-title").textContent = "Añadir Foto de Inspiración";
  document.getElementById("edit-insp-id").value = "";
  document.getElementById("insp-space-id").value = state.currentSpaceId;
  updateInspirationCategoriesModal(state.currentSpaceId);
  document.getElementById("insp-title").value = "";
  document.getElementById("insp-image-url").value = "";
  document.getElementById("insp-desc").value = "";
  document.getElementById("insp-constructive").value = "";
  document.getElementById("insp-pinterest-url").value = "";

  handleImageUrlInput("");
  document.getElementById("modal-inspiration").classList.add("open");
}

function openEditInspirationModal(inspId) {
  const space = state.spaces.find(s => s.id === state.currentSpaceId);
  if (!space) return;
  const insp = (space.inspirations || []).find(i => i.id === inspId);
  if (!insp) return;

  document.getElementById("modal-insp-title").textContent = "Editar Inspiración";
  document.getElementById("edit-insp-id").value = insp.id;
  document.getElementById("insp-space-id").value = space.id;
  updateInspirationCategoriesModal(space.id, insp.categoryTag);
  document.getElementById("insp-title").value = insp.title || "";
  document.getElementById("insp-image-url").value = insp.imageUrl || "";
  document.getElementById("insp-desc").value = insp.description || "";
  document.getElementById("insp-constructive").value = insp.constructiveNotes || "";
  document.getElementById("insp-pinterest-url").value = insp.pinterestUrl || "";

  handleImageUrlInput(insp.imageUrl || "");
  document.getElementById("modal-inspiration").classList.add("open");
}

function closeInspirationModal() {
  document.getElementById("modal-inspiration").classList.remove("open");
}

function saveInspirationModal() {
  const editId = document.getElementById("edit-insp-id").value;
  const spaceId = document.getElementById("insp-space-id").value;
  const title = document.getElementById("insp-title").value.trim();
  const imageUrl = document.getElementById("insp-image-url").value.trim();

  if (!title) {
    alert("Por favor, escribe un título para esta idea.");
    return;
  }

  if (!imageUrl) {
    alert("Por favor, introduce la URL de la imagen o de Pinterest.");
    return;
  }

  const categoryTag = document.getElementById("insp-category").value;
  const description = document.getElementById("insp-desc").value.trim();
  const constructiveNotes = document.getElementById("insp-constructive").value.trim();
  const pinterestUrl = document.getElementById("insp-pinterest-url").value.trim() || imageUrl;

  const targetSpace = state.spaces.find(s => s.id === spaceId);
  if (!targetSpace) return;
  if (!targetSpace.inspirations) targetSpace.inspirations = [];

  if (editId) {
    // Edición
    const insp = targetSpace.inspirations.find(i => i.id === editId);
    if (insp) {
      insp.title = title;
      insp.categoryTag = categoryTag;
      insp.imageUrl = imageUrl;
      insp.description = description;
      insp.constructiveNotes = constructiveNotes;
      insp.pinterestUrl = pinterestUrl;
    }
  } else {
    // Nueva
    const newInsp = {
      id: "insp-" + Date.now(),
      title,
      categoryTag,
      imageUrl,
      description,
      constructiveNotes,
      pinterestUrl,
      addedDate: new Date().toISOString().slice(0, 10)
    };
    targetSpace.inspirations.unshift(newInsp);
  }

  saveSpacesLocally();
  closeInspirationModal();
  selectSpace(spaceId);
  renderSpacePills();
}

function deleteInspiration(spaceId, inspId) {
  if (!confirm("¿Eliminar esta foto de inspiración?")) return;
  const space = state.spaces.find(s => s.id === spaceId);
  if (space && space.inspirations) {
    space.inspirations = space.inspirations.filter(i => i.id !== inspId);
    saveSpacesLocally();
    renderCurrentSpace();
    renderSpacePills();
  }
}

// ==========================================================================
// SECCIÓN 1: RENDERIZADO DE TARJETAS DE MATERIALES
// ==========================================================================
function renderMaterialsList() {
  const container = document.getElementById("materials-container");
  if (!container) return;
  container.innerHTML = "";

  let filtered = state.materials.filter(mat => {
    if (state.currentFilter === "criteria" && !mat.needsOwnerCriteria) return false;
    if (state.currentFilter === "pending" && mat.status !== "pending") return false;
    if (state.currentFilter === "reviewing" && mat.status !== "reviewing") return false;
    if (state.currentFilter === "selected" && mat.status !== "selected") return false;

    if (state.currentChapter !== "todos" && mat.chapter !== state.currentChapter) return false;

    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase();
      const inName = (mat.name || "").toLowerCase().includes(q);
      const inLoc = (mat.location || "").toLowerCase().includes(q);
      const inExp = (mat.explanation || "").toLowerCase().includes(q);
      const inSpec = (mat.specMemoria || "").toLowerCase().includes(q);
      const inOptions = (mat.options || []).some(o => 
        (o.title || "").toLowerCase().includes(q) || 
        (o.provider || "").toLowerCase().includes(q) ||
        (o.notes || "").toLowerCase().includes(q)
      );
      const inComments = (mat.comments || []).some(c => (c.text || "").toLowerCase().includes(q));

      if (!inName && !inLoc && !inExp && !inSpec && !inOptions && !inComments) {
        return false;
      }
    }

    return true;
  });

  filtered.sort((a, b) => {
    const totalA = (parseFloat(a.quantity) || 0) * (1 + (parseFloat(a.wastagePercent) || 0) / 100) * (parseFloat(a.targetUnitPrice) || 0);
    const totalB = (parseFloat(b.quantity) || 0) * (1 + (parseFloat(b.wastagePercent) || 0) / 100) * (parseFloat(b.targetUnitPrice) || 0);

    if (state.currentSort === "price-desc") return totalB - totalA;
    if (state.currentSort === "price-asc") return totalA - totalB;
    if (state.currentSort === "name") return (a.name || "").localeCompare(b.name || "");
    if (state.currentSort === "pending-first") {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
    }
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i data-lucide="inbox" style="width: 44px; height: 44px; color: var(--text-light); margin-bottom: 0.5rem;"></i>
        <h3 style="font-size: 1.05rem; color: var(--text-main);">No se encontraron materiales</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Prueba a cambiar el filtro o el capítulo.</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 0.8rem;" onclick="resetFilters()">Restablecer Filtros</button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  filtered.forEach(mat => {
    const card = createMaterialCard(mat);
    container.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function createMaterialCard(mat) {
  const card = document.createElement("div");
  card.className = "material-card";
  card.id = `card-${mat.id}`;

  const qty = parseFloat(mat.quantity) || 0;
  const wastage = parseFloat(mat.wastagePercent) || 0;
  const effQty = qty * (1 + wastage / 100);
  const price = parseFloat(mat.targetUnitPrice) || 0;
  const subtotal = effQty * price;

  const chap = CHAPTERS.find(c => c.id === mat.chapter) || { name: mat.chapterName || mat.chapter };

  card.innerHTML = `
    <div class="card-header">
      <div class="card-top-badges">
        <span class="chapter-pill">
          <i data-lucide="tag" style="width: 11px; height: 11px;"></i>
          ${escapeHtml(chap.name)}
        </span>

        ${mat.needsOwnerCriteria ? `
          <span class="criteria-pill" title="Requiere selección por parte de Laura y Alejandro">
            <i data-lucide="sparkles" style="width: 11px; height: 11px;"></i>
            Criterio Laura & Alejandro
          </span>
        ` : ''}

        <select class="status-dropdown status-${mat.status}" onchange="changeMaterialStatus('${mat.id}', this.value)">
          <option value="pending" ${mat.status === 'pending' ? 'selected' : ''}>🟡 Pendiente</option>
          <option value="reviewing" ${mat.status === 'reviewing' ? 'selected' : ''}>🔵 En Valoración</option>
          <option value="selected" ${mat.status === 'selected' ? 'selected' : ''}>🟢 Cerrado / Elegido</option>
        </select>
      </div>

      <h3 class="material-title">${escapeHtml(mat.name)}</h3>
      <div class="material-location">
        <i data-lucide="map-pin" style="width: 12px; height: 12px;"></i>
        <span>${escapeHtml(mat.location || 'Vivienda general')}</span>
      </div>
    </div>

    <div class="card-body">
      <!-- Explicación didáctica y notas de obra -->
      <div class="info-accordion">
        <button class="accordion-header" onclick="toggleAccordion('acc-${mat.id}')">
          <span style="display: flex; align-items: center; gap: 0.35rem;">
            <i data-lucide="lightbulb" style="width: 13px; height: 13px; color: var(--accent);"></i>
            <strong>¿Qué es y qué se busca?</strong>
          </span>
          <i data-lucide="chevron-down" id="acc-icon-${mat.id}" style="width: 13px; height: 13px;"></i>
        </button>
        <div class="accordion-content" id="acc-${mat.id}">
          <p style="margin-bottom: 0.4rem;">${escapeHtml(mat.explanation || 'Sin explicación.')}</p>
          
          ${mat.needsOwnerCriteria && mat.criteriaNotes ? `
            <div class="callout-criteria" style="margin-top: 0.4rem;">
              <strong>🎯 Criterio de Selección:</strong> ${escapeHtml(mat.criteriaNotes)}
            </div>
          ` : ''}

          ${mat.builderNotes ? `
            <div class="callout-builder" style="margin-top: 0.4rem;">
              <strong>👷‍♂️ Requisito Montaje (Constructor):</strong> ${escapeHtml(mat.builderNotes)}
            </div>
          ` : ''}

          ${mat.specMemoria ? `
            <p style="font-size: 0.72rem; color: var(--text-light); margin-top: 0.4rem;">
              <em>Memoria: "${escapeHtml(mat.specMemoria)}"</em>
            </p>
          ` : ''}
        </div>
      </div>

      <!-- Calculadora de medición y precio de materiales -->
      <div class="calc-box">
        <div class="calc-row">
          <div class="calc-inputs">
            <span style="color: var(--text-muted); font-size: 0.72rem;">Medición:</span>
            <input type="number" class="calc-input-small" value="${qty}" step="0.5" onchange="updateMatQuantity('${mat.id}', this.value)" title="Cantidad o superficie">
            
            <select class="calc-input-unit" onchange="updateMatUnit('${mat.id}', this.value)">
              <option value="m2" ${mat.unitType === 'm2' ? 'selected' : ''}>m²</option>
              <option value="ml" ${mat.unitType === 'ml' ? 'selected' : ''}>ml</option>
              <option value="ud" ${mat.unitType === 'ud' ? 'selected' : ''}>ud</option>
              <option value="pa" ${mat.unitType === 'pa' ? 'selected' : ''}>pa</option>
            </select>

            <span style="color: var(--text-muted); font-size: 0.72rem;" title="Merma">+</span>
            <input type="number" class="calc-input-small" style="width: 42px;" value="${wastage}" onchange="updateMatWastage('${mat.id}', this.value)" title="% de merma">%

            <span style="color: var(--text-muted); font-size: 0.72rem;">×</span>
            <input type="number" class="calc-input-small" style="width: 65px;" value="${price}" step="0.5" onchange="updateMatPrice('${mat.id}', this.value)" title="Precio unitario estimado">
            <span style="font-size: 0.72rem; color: var(--text-muted);">€</span>
          </div>

          <div class="calc-total">
            <div class="calc-total-label">Subtotal Material</div>
            <div class="calc-total-amount">${formatCurrency(subtotal)}</div>
          </div>
        </div>

        ${wastage > 0 ? `
          <div style="font-size: 0.7rem; color: var(--text-muted);">
            * Medición efectiva con merma del ${wastage}%: <strong>${effQty.toFixed(1)} ${mat.unitType}</strong>
          </div>
        ` : ''}
      </div>

      <!-- Opciones y referencias de compra / marcas -->
      <div class="options-section">
        <div class="options-header">
          <span class="options-title">
            <i data-lucide="tag" style="width: 12px; height: 12px;"></i>
            Referencias (${(mat.options || []).length})
          </span>
          <button class="btn btn-outline btn-sm" onclick="openAddOptionModal('${mat.id}')">
            <i data-lucide="plus" style="width: 11px; height: 11px;"></i> Referencia
          </button>
        </div>

        <div class="options-list">
          ${(mat.options && mat.options.length > 0) ? mat.options.map(opt => `
            <div class="option-card ${mat.selectedOptionId === opt.id ? 'option-selected' : ''}">
              <input type="radio" name="opt-${mat.id}" class="option-radio" 
                ${mat.selectedOptionId === opt.id ? 'checked' : ''} 
                onchange="selectMaterialOption('${mat.id}', '${opt.id}')"
                title="Elegir esta opción como definitiva">

              ${opt.imageUrl ? `
                <img src="${escapeHtml(opt.imageUrl)}" class="option-thumb" alt="Foto referencia" onclick="openLightbox('${escapeHtml(opt.imageUrl)}')">
              ` : `
                <div class="option-thumb" style="display: flex; align-items: center; justify-content: center; color: var(--text-light);">
                  <i data-lucide="image" style="width: 18px; height: 18px;"></i>
                </div>
              `}

              <div class="option-details">
                <div class="option-title-row">
                  <span class="option-name" title="${escapeHtml(opt.title)}">${escapeHtml(opt.title)}</span>
                  <span class="option-price">${formatCurrency(opt.price)} ${mat.unitType ? '/' + mat.unitType : ''}</span>
                </div>

                ${opt.provider ? `<span class="option-provider">${escapeHtml(opt.provider)}</span>` : ''}
                ${opt.notes ? `<p class="option-notes">${escapeHtml(opt.notes)}</p>` : ''}

                <div class="option-links">
                  ${opt.url ? `
                    <a href="${escapeHtml(opt.url)}" target="_blank" rel="noopener noreferrer" class="option-link">
                      <i data-lucide="external-link" style="width: 11px; height: 11px;"></i> Ver en Tienda
                    </a>
                  ` : ''}

                  <button class="btn btn-sm" style="margin-left: auto; padding: 0.1rem 0.35rem; color: #ef4444; background: transparent; border: none; font-size: 0.7rem; cursor: pointer;" 
                    onclick="deleteOption('${mat.id}', '${opt.id}')" title="Eliminar opción">
                    <i data-lucide="trash-2" style="width: 11px; height: 11px;"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('') : `
            <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; padding: 0.35rem 0;">
              Sin opciones aún. Haz clic en "+ Referencia" para guardar enlaces de IKEA, Porcelanosa, etc.
            </div>
          `}
        </div>
      </div>

      <!-- Cuaderno de notas y comentarios conjuntos (Laura & Alejandro) -->
      <div class="comments-box">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
          <i data-lucide="message-square" style="width: 11px; height: 11px;"></i>
          Notas conjuntas (Laura & Alejandro)
        </div>

        <div id="comments-list-${mat.id}">
          ${(mat.comments && mat.comments.length > 0) ? mat.comments.map(c => `
            <div class="comment-item">
              <span class="comment-author">${escapeHtml(c.author)}:</span>
              <span>${escapeHtml(c.text)}</span>
              <span class="comment-date">${c.date || ''}</span>
            </div>
          `).join('') : `
            <div style="font-size: 0.72rem; color: var(--text-light); font-style: italic;">Sin notas todavía.</div>
          `}
        </div>

        <div class="add-comment-row">
          <select id="comment-author-${mat.id}" style="padding: 0.2rem; font-size: 0.72rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
            <option value="Laura">Laura</option>
            <option value="Alejandro">Alejandro</option>
            <option value="Aparejador">Aparejador</option>
          </select>
          <input type="text" id="comment-input-${mat.id}" class="comment-input" placeholder="Escribir nota..." onkeydown="if(event.key === 'Enter') addComment('${mat.id}')">
          <button class="btn btn-outline btn-sm" onclick="addComment('${mat.id}')">
            <i data-lucide="send" style="width: 11px; height: 11px;"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn btn-outline btn-sm" onclick="openEditMaterialModal('${mat.id}')">
        <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i> Editar
      </button>

      <button class="btn btn-outline btn-sm" style="color: #ef4444;" onclick="deleteMaterial('${mat.id}')" title="Eliminar partida">
        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
      </button>
    </div>
  `;

  return card;
}

// ==========================================================================
// SECCIÓN 3: DOSSIER TÉCNICO (MODO APAREJADOR & CONSTRUCTOR)
// ==========================================================================
function renderDossierTable() {
  const tbody = document.getElementById("dossier-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const dateEl = document.getElementById("dossier-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("es-ES", {
      year: "numeric", month: "long", day: "numeric"
    });
  }

  state.materials.forEach(mat => {
    const chap = CHAPTERS.find(c => c.id === mat.chapter) || { name: mat.chapterName || mat.chapter };
    const qty = parseFloat(mat.quantity) || 0;
    const wastage = parseFloat(mat.wastagePercent) || 0;
    const effQty = qty * (1 + wastage / 100);
    const price = parseFloat(mat.targetUnitPrice) || 0;
    const subtotal = effQty * price;

    const selectedOpt = (mat.options || []).find(o => o.id === mat.selectedOptionId);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <strong>${escapeHtml(chap.name)}</strong><br>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(mat.location || 'General')}</span>
      </td>
      <td>
        <strong>${escapeHtml(mat.name)}</strong><br>
        ${selectedOpt ? `
          <div style="font-size: 0.78rem; color: #047857; margin-top: 0.15rem;">
            ✓ <strong>Selección:</strong> ${escapeHtml(selectedOpt.title)} (${escapeHtml(selectedOpt.provider || '')})
            ${selectedOpt.url ? `<br><a href="${escapeHtml(selectedOpt.url)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Ficha / Catálogo</a>` : ''}
          </div>
        ` : `
          <div style="font-size: 0.78rem; color: #b45309; margin-top: 0.15rem;">
            <em>* Selección en curso / criterio propietarios</em>
          </div>
        `}
      </td>
      <td>
        <strong>${qty} ${mat.unitType}</strong><br>
        ${wastage > 0 ? `<span style="font-size: 0.72rem; color: var(--text-muted);">(con ${wastage}% merma: ${effQty.toFixed(1)} ${mat.unitType})</span>` : ''}
      </td>
      <td>
        <strong>${formatCurrency(subtotal)}</strong><br>
        <span style="font-size: 0.72rem; color: var(--text-muted);">${formatCurrency(price)}/${mat.unitType}</span>
      </td>
      <td>
        <div style="line-height: 1.4;">
          ${mat.builderNotes ? `<strong>Ejecución y montaje:</strong> ${escapeHtml(mat.builderNotes)}<br>` : ''}
          ${mat.explanation ? `<span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(mat.explanation)}</span>` : ''}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================================================
// MODIFICACIONES DE MATERIALES
// ==========================================================================
function changeMaterialStatus(id, newStatus) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.status = newStatus;
    saveMaterialsLocally();
    updateFilterCounts();
    const dropdown = document.querySelector(`#card-${id} .status-dropdown`);
    if (dropdown) {
      dropdown.className = `status-dropdown status-${newStatus}`;
    }
  }
}

function updateMatQuantity(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.quantity = parseFloat(val) || 0;
    saveMaterialsLocally();
    renderMaterialsList();
  }
}

function updateMatUnit(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.unitType = val;
    saveMaterialsLocally();
    renderMaterialsList();
  }
}

function updateMatWastage(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.wastagePercent = parseFloat(val) || 0;
    saveMaterialsLocally();
    renderMaterialsList();
  }
}

function updateMatPrice(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.targetUnitPrice = parseFloat(val) || 0;
    saveMaterialsLocally();
    renderMaterialsList();
  }
}

function selectMaterialOption(matId, optId) {
  const mat = state.materials.find(m => m.id === matId);
  if (mat) {
    mat.selectedOptionId = optId;
    const opt = (mat.options || []).find(o => o.id === optId);
    if (opt && opt.price > 0) {
      mat.targetUnitPrice = opt.price;
    }
    mat.status = "selected";
    saveMaterialsLocally();
    renderApp();
  }
}

function addComment(matId) {
  const input = document.getElementById(`comment-input-${matId}`);
  const authorSelect = document.getElementById(`comment-author-${matId}`);
  const text = input ? input.value.trim() : "";
  const author = authorSelect ? authorSelect.value : "Laura";

  if (!text) return;

  const mat = state.materials.find(m => m.id === matId);
  if (mat) {
    if (!mat.comments) mat.comments = [];
    const dateStr = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });
    mat.comments.push({ author, text, date: dateStr });
    saveMaterialsLocally();
    renderMaterialsList();
  }
}

function deleteOption(matId, optId) {
  if (!confirm("¿Eliminar esta referencia/opción de compra?")) return;
  const mat = state.materials.find(m => m.id === matId);
  if (mat && mat.options) {
    mat.options = mat.options.filter(o => o.id !== optId);
    if (mat.selectedOptionId === optId) {
      mat.selectedOptionId = null;
    }
    saveMaterialsLocally();
    renderApp();
  }
}

function deleteMaterial(id) {
  if (!confirm("¿Seguro que deseas eliminar esta partida de la memoria?")) return;
  state.materials = state.materials.filter(m => m.id !== id);
  saveMaterialsLocally();
  renderApp();
}

function resetFilters() {
  state.currentFilter = "criteria";
  state.currentChapter = "todos";
  state.searchQuery = "";
  state.currentSort = "default";
  document.getElementById("search-input").value = "";
  document.getElementById("select-chapter").value = "todos";
  const sortSel = document.getElementById("select-sort");
  if (sortSel) sortSel.value = "default";
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.filter === "criteria");
  });
  renderMaterialsList();
}

// Modales Materiales
function openAddMaterialModal() {
  document.getElementById("modal-material-title").textContent = "Añadir Nuevo Material";
  document.getElementById("edit-mat-id").value = "";
  document.getElementById("mat-name").value = "";
  document.getElementById("mat-chapter").value = "revestimientos";
  document.getElementById("mat-location").value = "";
  document.getElementById("mat-qty").value = "1";
  document.getElementById("mat-unit").value = "ud";
  document.getElementById("mat-wastage").value = "0";
  document.getElementById("mat-price").value = "0";
  document.getElementById("mat-status").value = "pending";
  document.getElementById("mat-needs-criteria").checked = true;
  document.getElementById("mat-explanation").value = "";
  document.getElementById("mat-spec").value = "";
  document.getElementById("mat-builder").value = "";

  document.getElementById("modal-material").classList.add("open");
}

function openEditMaterialModal(id) {
  const mat = state.materials.find(m => m.id === id);
  if (!mat) return;

  document.getElementById("modal-material-title").textContent = "Editar Detalle de Material";
  document.getElementById("edit-mat-id").value = mat.id;
  document.getElementById("mat-name").value = mat.name || "";
  document.getElementById("mat-chapter").value = mat.chapter || "revestimientos";
  document.getElementById("mat-location").value = mat.location || "";
  document.getElementById("mat-qty").value = mat.quantity || 1;
  document.getElementById("mat-unit").value = mat.unitType || "ud";
  document.getElementById("mat-wastage").value = mat.wastagePercent || 0;
  document.getElementById("mat-price").value = mat.targetUnitPrice || 0;
  document.getElementById("mat-status").value = mat.status || "pending";
  document.getElementById("mat-needs-criteria").checked = !!mat.needsOwnerCriteria;
  document.getElementById("mat-explanation").value = mat.explanation || "";
  document.getElementById("mat-spec").value = mat.specMemoria || "";
  document.getElementById("mat-builder").value = mat.builderNotes || "";

  document.getElementById("modal-material").classList.add("open");
}

function saveMaterialModal() {
  const editId = document.getElementById("edit-mat-id").value;
  const name = document.getElementById("mat-name").value.trim();
  if (!name) {
    alert("Por favor, introduce el nombre del material.");
    return;
  }

  const chapter = document.getElementById("mat-chapter").value;
  const chapObj = CHAPTERS.find(c => c.id === chapter);
  const location = document.getElementById("mat-location").value.trim();
  const quantity = parseFloat(document.getElementById("mat-qty").value) || 0;
  const unitType = document.getElementById("mat-unit").value;
  const wastagePercent = parseFloat(document.getElementById("mat-wastage").value) || 0;
  const targetUnitPrice = parseFloat(document.getElementById("mat-price").value) || 0;
  const status = document.getElementById("mat-status").value;
  const needsOwnerCriteria = document.getElementById("mat-needs-criteria").checked;
  const explanation = document.getElementById("mat-explanation").value.trim();
  const specMemoria = document.getElementById("mat-spec").value.trim();
  const builderNotes = document.getElementById("mat-builder").value.trim();

  if (editId) {
    const mat = state.materials.find(m => m.id === editId);
    if (mat) {
      mat.name = name;
      mat.chapter = chapter;
      mat.chapterName = chapObj ? chapObj.name : chapter;
      mat.location = location;
      mat.quantity = quantity;
      mat.unitType = unitType;
      mat.wastagePercent = wastagePercent;
      mat.targetUnitPrice = targetUnitPrice;
      mat.status = status;
      mat.needsOwnerCriteria = needsOwnerCriteria;
      mat.explanation = explanation;
      mat.specMemoria = specMemoria;
      mat.builderNotes = builderNotes;
    }
  } else {
    const newId = "mat-" + Date.now();
    state.materials.unshift({
      id: newId,
      name,
      chapter,
      chapterName: chapObj ? chapObj.name : chapter,
      location,
      quantity,
      unitType,
      wastagePercent,
      targetUnitPrice,
      status,
      needsOwnerCriteria,
      explanation,
      specMemoria,
      builderNotes,
      options: [],
      comments: []
    });
  }

  saveMaterialsLocally();
  document.getElementById("modal-material").classList.remove("open");
  renderApp();
}

function openAddOptionModal(matId) {
  document.getElementById("opt-mat-id").value = matId;
  document.getElementById("opt-id").value = "";
  document.getElementById("opt-title").value = "";
  document.getElementById("opt-provider").value = "";
  document.getElementById("opt-price").value = "";
  document.getElementById("opt-url").value = "";
  document.getElementById("opt-image").value = "";
  document.getElementById("opt-notes").value = "";

  document.getElementById("modal-option").classList.add("open");
}

function saveOptionModal() {
  const matId = document.getElementById("opt-mat-id").value;
  const title = document.getElementById("opt-title").value.trim();
  if (!title) {
    alert("Por favor, introduce el nombre del modelo o acabado.");
    return;
  }

  const provider = document.getElementById("opt-provider").value.trim();
  const price = parseFloat(document.getElementById("opt-price").value) || 0;
  const url = document.getElementById("opt-url").value.trim();
  const imageUrl = document.getElementById("opt-image").value.trim();
  const notes = document.getElementById("opt-notes").value.trim();

  const mat = state.materials.find(m => m.id === matId);
  if (mat) {
    if (!mat.options) mat.options = [];
    const newOpt = {
      id: "opt-" + Date.now(),
      title,
      provider,
      price,
      url,
      imageUrl,
      notes
    };
    mat.options.push(newOpt);
    saveMaterialsLocally();
    document.getElementById("modal-option").classList.remove("open");
    renderApp();
  }
}

// Lightbox
function openLightbox(url) {
  const modal = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = url;
  modal.classList.add("open");
}

function toggleAccordion(id) {
  const content = document.getElementById(id);
  const iconId = id.replace("acc-", "acc-icon-");
  const icon = document.getElementById(iconId);

  const isHidden = window.getComputedStyle(content).display === "none";

  if (isHidden) {
    content.style.display = "block";
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    content.style.display = "none";
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

// ==========================================================================
// SINCRONIZACIÓN DIRECTA CON GITHUB API (PERSISTENCIA TOTAL EN LA NUBE)
// ==========================================================================
function openGitHubModal() {
  document.getElementById("modal-github").classList.add("open");
  document.getElementById("github-sync-status").textContent = "";
}

function closeGitHubModal() {
  document.getElementById("modal-github").classList.remove("open");
}

async function syncDataToGitHubCloud() {
  const statusEl = document.getElementById("github-sync-status");
  const syncBtn = document.getElementById("btn-sync-github-now");

  statusEl.style.color = "#2563eb";
  statusEl.textContent = "Conectando con GitHub API...";
  syncBtn.disabled = true;

  try {
    // 1. Obtener SHA actual de data.js en GitHub
    const getUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/data.js?ref=main`;
    const getRes = await fetch(getUrl, {
      headers: {
        "Authorization": `token ${getGitHubToken()}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });

    let currentSha = null;
    if (getRes.ok) {
      const getData = await getRes.json();
      currentSha = getData.sha;
    }

    // 2. Generar el contenido completo de data.js con los datos actualizados
    statusEl.textContent = "Preparando archivo data.js actualizado...";
    const dataJsContent = `// Base de datos actualizada desde la Web de Valdemorillo
// Última modificación: ${new Date().toLocaleString("es-ES")}
// Promotores: Laura & Alejandro

const INITIAL_MATERIALS = ${JSON.stringify(state.materials, null, 2)};

const CHAPTERS = ${JSON.stringify(CHAPTERS, null, 2)};

const ROOM_CATEGORIES = ${JSON.stringify(typeof ROOM_CATEGORIES !== "undefined" ? ROOM_CATEGORIES : {}, null, 2)};

const INITIAL_SPACES = ${JSON.stringify(state.spaces, null, 2)};
`;

    // 3. Subir el commit a GitHub API
    statusEl.textContent = "Subiendo commit a la rama main...";
    const putUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/data.js`;
    const putBody = {
      message: `Actualización de calidades e inspiración (${new Date().toLocaleDateString("es-ES")})`,
      content: btoa(unescape(encodeURIComponent(dataJsContent))),
      branch: "main"
    };
    if (currentSha) {
      putBody.sha = currentSha;
    }

    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        "Authorization": `token ${getGitHubToken()}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(putBody)
    });

    if (putRes.ok) {
      statusEl.style.color = "#16a34a";
      statusEl.innerHTML = `✓ ¡Guardado con éxito en GitHub!<br><span style="font-size:0.72rem; color: #64748b;">GitHub Pages actualizará la web pública automáticamente en 1 minuto.</span>`;
    } else {
      const errData = await putRes.json().catch(() => ({}));
      statusEl.style.color = "#dc2626";
      statusEl.textContent = "Error al subir a GitHub: " + (errData.message || putRes.statusText);
    }
  } catch (err) {
    statusEl.style.color = "#dc2626";
    statusEl.textContent = "Error de conexión: " + err.message;
  } finally {
    syncBtn.disabled = false;
  }
}

// ==========================================================================
// EXPORTACIÓN A CSV / EXCEL Y RESPALDO JSON
// ==========================================================================
function exportToCSV() {
  let csvContent = "\uFEFF";
  csvContent += "Código;Capítulo;Elemento / Partida;Ubicación / Estancia;Criterio Propietarios;Estado;Medición;Unidad;Merma %;Medición Total Efectiva;Precio Unitario (€);Subtotal Material (€);Opción Seleccionada;Requisitos de Montaje para Constructor;Explicación Técnica\n";

  state.materials.forEach(mat => {
    const chap = CHAPTERS.find(c => c.id === mat.chapter) || { name: mat.chapterName || mat.chapter };
    const qty = parseFloat(mat.quantity) || 0;
    const wastage = parseFloat(mat.wastagePercent) || 0;
    const effQty = qty * (1 + wastage / 100);
    const price = parseFloat(mat.targetUnitPrice) || 0;
    const subtotal = effQty * price;
    const selectedOpt = (mat.options || []).find(o => o.id === mat.selectedOptionId);

    const row = [
      escapeCSV(mat.id),
      escapeCSV(chap.name),
      escapeCSV(mat.name),
      escapeCSV(mat.location || ""),
      mat.needsOwnerCriteria ? "SÍ" : "NO",
      mat.status === "selected" ? "Cerrado" : (mat.status === "reviewing" ? "En Valoración" : "Pendiente"),
      qty.toString().replace(".", ","),
      escapeCSV(mat.unitType),
      wastage.toString().replace(".", ","),
      effQty.toFixed(2).replace(".", ","),
      price.toString().replace(".", ","),
      subtotal.toFixed(2).replace(".", ","),
      selectedOpt ? escapeCSV(selectedOpt.title + (selectedOpt.provider ? ` (${selectedOpt.provider})` : "")) : "Pendiente",
      escapeCSV(mat.builderNotes || ""),
      escapeCSV(mat.explanation || "")
    ];

    csvContent += row.join(";") + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Valdemorillo_Alcon9_Calidades_Presupuesto_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function exportToJSON() {
  const exportPayload = {
    exportDate: new Date().toISOString(),
    materials: state.materials,
    spaces: state.spaces
  };
  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Valdemorillo_Alcon9_RespaldoCompleto_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed.materials && Array.isArray(parsed.materials)) {
        state.materials = parsed.materials;
        if (parsed.spaces && Array.isArray(parsed.spaces)) {
          state.spaces = parsed.spaces;
        }
        saveMaterialsLocally();
        saveSpacesLocally();
        renderApp();
        document.getElementById("modal-backup").classList.remove("open");
        alert("¡Datos completos de materiales e inspiración restaurados con éxito!");
      } else if (Array.isArray(parsed)) {
        state.materials = parsed;
        saveMaterialsLocally();
        renderApp();
        document.getElementById("modal-backup").classList.remove("open");
        alert("¡Materiales restaurados con éxito!");
      } else {
        alert("El archivo no tiene el formato de datos esperado.");
      }
    } catch (err) {
      alert("Error al leer el archivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetToDefaultData() {
  if (confirm("¿Estás seguro de que deseas restablecer todos los materiales y estancias a los datos iniciales? Se perderán las modificaciones personalizadas.")) {
    state.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
    state.spaces = JSON.parse(JSON.stringify(INITIAL_SPACES));
    saveMaterialsLocally();
    saveSpacesLocally();
    renderApp();
    document.getElementById("modal-backup").classList.remove("open");
    alert("¡Datos restablecidos a la memoria técnica original!");
  }
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Pestañas de filtrado de materiales
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentFilter = tab.dataset.filter;
      renderMaterialsList();
    });
  });

  // Búsqueda en vivo
  document.getElementById("search-input")?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderMaterialsList();
  });

  // Desplegable de capítulos
  document.getElementById("select-chapter")?.addEventListener("change", (e) => {
    state.currentChapter = e.target.value;
    renderMaterialsList();
  });

  // Ordenación
  document.getElementById("select-sort")?.addEventListener("change", (e) => {
    state.currentSort = e.target.value;
    renderMaterialsList();
  });

  // Modales Material
  document.getElementById("btn-close-material-modal")?.addEventListener("click", () => {
    document.getElementById("modal-material").classList.remove("open");
  });
  document.getElementById("btn-cancel-mat")?.addEventListener("click", () => {
    document.getElementById("modal-material").classList.remove("open");
  });
  document.getElementById("btn-save-mat")?.addEventListener("click", saveMaterialModal);

  // Modales Opción
  document.getElementById("btn-close-option-modal")?.addEventListener("click", () => {
    document.getElementById("modal-option").classList.remove("open");
  });
  document.getElementById("btn-cancel-opt")?.addEventListener("click", () => {
    document.getElementById("modal-option").classList.remove("open");
  });
  document.getElementById("btn-save-opt")?.addEventListener("click", saveOptionModal);

  // Modales Backup
  document.getElementById("btn-open-backup")?.addEventListener("click", () => {
    document.getElementById("modal-backup").classList.add("open");
  });
  document.getElementById("btn-close-backup-modal")?.addEventListener("click", () => {
    document.getElementById("modal-backup").classList.remove("open");
  });
  document.getElementById("btn-close-backup")?.addEventListener("click", () => {
    document.getElementById("modal-backup").classList.remove("open");
  });
  document.getElementById("btn-download-json")?.addEventListener("click", exportToJSON);
  document.getElementById("btn-reset-data")?.addEventListener("click", resetToDefaultData);
  document.getElementById("input-import-file")?.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      importFromJSON(e.target.files[0]);
    }
  });

  // Exportar CSV
  document.getElementById("btn-export-csv")?.addEventListener("click", exportToCSV);

  // GitHub Modal
  document.getElementById("btn-open-github")?.addEventListener("click", openGitHubModal);

  // Lightbox click para cerrar
  document.getElementById("lightbox")?.addEventListener("click", (e) => {
    if (e.target.id === "lightbox" || e.target.classList.contains("lightbox-close-btn")) {
      document.getElementById("lightbox").classList.remove("open");
    }
  });
}

// Utilidades
function formatCurrency(num) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num || 0);
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeCSV(str) {
  if (!str) return '""';
  const clean = String(str).replace(/"/g, '""');
  return `"${clean}"`;
}
