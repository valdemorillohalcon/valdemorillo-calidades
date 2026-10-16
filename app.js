// ==========================================================================
// APLICACIÓN DE CONTROL DE MATERIALES Y CALIDADES
// CALLE ALCÓN N.º 9 · VALDEMORILLO (Laura & Alejandro)
// ==========================================================================

const STORAGE_KEY = "valdemorillo_materials_v1";

// Estado global de la aplicación
let state = {
  materials: [],
  currentFilter: "criteria", // 'criteria' por defecto para destacar lo que requiere decisión
  currentChapter: "todos",
  searchQuery: "",
  currentSort: "default",
  dossierMode: false
};

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  populateChapterSelects();
  renderApp();
  if (window.lucide) {
    lucide.createIcons();
  }
});

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state.materials = JSON.parse(saved);
    } catch (e) {
      console.error("Error al cargar datos guardados, usando memoria inicial", e);
      state.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
    }
  } else {
    state.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.materials));
  updateKPIs();
}

// ==========================================================================
// RENDERIZADO PRINCIPAL
// ==========================================================================
function renderApp() {
  updateKPIs();
  updateFilterCounts();
  renderMaterialsList();
  renderDossierTable();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Cálculo y actualización de indicadores clave (KPIs)
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
}

// Actualización de contadores en pestañas de filtrado
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

// Poblar desplegables de capítulos
function populateChapterSelects() {
  const selectFilter = document.getElementById("select-chapter");
  const selectModal = document.getElementById("mat-chapter");

  selectFilter.innerHTML = `<option value="todos">Todos los Capítulos (${state.materials.length})</option>`;
  selectModal.innerHTML = "";

  CHAPTERS.forEach(chap => {
    if (chap.id !== "todos") {
      const optFilter = document.createElement("option");
      optFilter.value = chap.id;
      optFilter.textContent = chap.name;
      selectFilter.appendChild(optFilter);

      const optModal = document.createElement("option");
      optModal.value = chap.id;
      optModal.textContent = chap.name;
      selectModal.appendChild(optModal);
    }
  });
}

// ==========================================================================
// RENDERIZADO DE TARJETAS DE MATERIALES
// ==========================================================================
function renderMaterialsList() {
  const container = document.getElementById("materials-container");
  container.innerHTML = "";

  let filtered = state.materials.filter(mat => {
    // Filtro por pestaña
    if (state.currentFilter === "criteria" && !mat.needsOwnerCriteria) return false;
    if (state.currentFilter === "pending" && mat.status !== "pending") return false;
    if (state.currentFilter === "reviewing" && mat.status !== "reviewing") return false;
    if (state.currentFilter === "selected" && mat.status !== "selected") return false;

    // Filtro por capítulo
    if (state.currentChapter !== "todos" && mat.chapter !== state.currentChapter) return false;

    // Filtro por búsqueda de texto
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

  // Ordenación
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
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <i data-lucide="inbox" style="width: 48px; height: 48px; color: var(--text-light); margin-bottom: 0.75rem;"></i>
        <h3 style="font-size: 1.1rem; color: var(--text-main);">No se encontraron materiales</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Prueba a cambiar el filtro, el capítulo o borra la búsqueda.</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 1rem;" onclick="resetFilters()">Restablecer Filtros</button>
      </div>
    `;
    return;
  }

  filtered.forEach(mat => {
    const card = createMaterialCard(mat);
    container.appendChild(card);
  });
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
          <i data-lucide="tag" style="width: 12px; height: 12px;"></i>
          ${escapeHtml(chap.name)}
        </span>

        ${mat.needsOwnerCriteria ? `
          <span class="criteria-pill" title="Requiere selección y criterio por parte de Laura y Alejandro">
            <i data-lucide="sparkles" style="width: 12px; height: 12px;"></i>
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
        <i data-lucide="map-pin" style="width: 13px; height: 13px;"></i>
        <span>${escapeHtml(mat.location || 'Vivienda general')}</span>
      </div>
    </div>

    <div class="card-body">
      <!-- Explicación didáctica y notas de obra -->
      <div class="info-accordion">
        <button class="accordion-header" onclick="toggleAccordion('acc-${mat.id}')">
          <span style="display: flex; align-items: center; gap: 0.4rem;">
            <i data-lucide="lightbulb" style="width: 14px; height: 14px; color: var(--accent);"></i>
            <strong>¿Qué es y qué se busca?</strong>
          </span>
          <i data-lucide="chevron-down" id="acc-icon-${mat.id}" style="width: 14px; height: 14px;"></i>
        </button>
        <div class="accordion-content" id="acc-${mat.id}">
          <p style="margin-bottom: 0.5rem;">${escapeHtml(mat.explanation || 'Sin explicación.')}</p>
          
          ${mat.needsOwnerCriteria && mat.criteriaNotes ? `
            <div class="callout-criteria" style="margin-top: 0.5rem;">
              <strong>🎯 Criterio de Selección:</strong> ${escapeHtml(mat.criteriaNotes)}
            </div>
          ` : ''}

          ${mat.builderNotes ? `
            <div class="callout-builder" style="margin-top: 0.5rem;">
              <strong>👷‍♂️ Requisito Montaje (Constructor):</strong> ${escapeHtml(mat.builderNotes)}
            </div>
          ` : ''}

          ${mat.specMemoria ? `
            <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.5rem;">
              <em>Memoria original: "${escapeHtml(mat.specMemoria)}"</em>
            </p>
          ` : ''}
        </div>
      </div>

      <!-- Calculadora de medición y precio de materiales -->
      <div class="calc-box">
        <div class="calc-row">
          <div class="calc-inputs">
            <span style="color: var(--text-muted); font-size: 0.75rem;">Medición:</span>
            <input type="number" class="calc-input-small" value="${qty}" step="0.5" onchange="updateMatQuantity('${mat.id}', this.value)" title="Cantidad o superficie">
            
            <select class="calc-input-unit" onchange="updateMatUnit('${mat.id}', this.value)">
              <option value="m2" ${mat.unitType === 'm2' ? 'selected' : ''}>m²</option>
              <option value="ml" ${mat.unitType === 'ml' ? 'selected' : ''}>ml</option>
              <option value="ud" ${mat.unitType === 'ud' ? 'selected' : ''}>ud</option>
              <option value="pa" ${mat.unitType === 'pa' ? 'selected' : ''}>pa</option>
            </select>

            <span style="color: var(--text-muted); font-size: 0.75rem; margin-left: 0.2rem;" title="Merma o desperdicio habitual para cortes">+</span>
            <input type="number" class="calc-input-small" style="width: 45px;" value="${wastage}" onchange="updateMatWastage('${mat.id}', this.value)" title="% de merma en cortes">%

            <span style="color: var(--text-muted); font-size: 0.75rem;">×</span>
            <input type="number" class="calc-input-small" style="width: 70px;" value="${price}" step="0.5" onchange="updateMatPrice('${mat.id}', this.value)" title="Precio unitario estimado">
            <span style="font-size: 0.75rem; color: var(--text-muted);">€</span>
          </div>

          <div class="calc-total">
            <div class="calc-total-label">Subtotal Material</div>
            <div class="calc-total-amount">${formatCurrency(subtotal)}</div>
          </div>
        </div>

        ${wastage > 0 ? `
          <div style="font-size: 0.72rem; color: var(--text-muted);">
            * Medición efectiva con merma del ${wastage}%: <strong>${effQty.toFixed(1)} ${mat.unitType}</strong>
          </div>
        ` : ''}
      </div>

      <!-- Opciones y referencias de compra / marcas -->
      <div class="options-section">
        <div class="options-header">
          <span class="options-title">
            <i data-lucide="tag" style="width: 13px; height: 13px;"></i>
            Referencias y Opciones (${(mat.options || []).length})
          </span>
          <button class="btn btn-outline btn-sm" onclick="openAddOptionModal('${mat.id}')">
            <i data-lucide="plus" style="width: 12px; height: 12px;"></i> Añadir Referencia
          </button>
        </div>

        <div class="options-list">
          ${(mat.options && mat.options.length > 0) ? mat.options.map(opt => `
            <div class="option-card ${mat.selectedOptionId === opt.id ? 'option-selected' : ''}">
              <input type="radio" name="opt-${mat.id}" class="option-radio" 
                ${mat.selectedOptionId === opt.id ? 'checked' : ''} 
                onchange="selectMaterialOption('${mat.id}', '${opt.id}')"
                title="Marcar como la opción elegida para el presupuesto">

              ${opt.imageUrl ? `
                <img src="${escapeHtml(opt.imageUrl)}" class="option-thumb" alt="Foto referencia" onclick="openLightbox('${escapeHtml(opt.imageUrl)}')">
              ` : `
                <div class="option-thumb" style="display: flex; align-items: center; justify-content: center; color: var(--text-light);">
                  <i data-lucide="image" style="width: 20px; height: 20px;"></i>
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
                      <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> Ver en Tienda / Catálogo
                    </a>
                  ` : ''}

                  <button class="btn btn-sm" style="margin-left: auto; padding: 0.1rem 0.4rem; color: #ef4444; background: transparent; border: none; font-size: 0.72rem; cursor: pointer;" 
                    onclick="deleteOption('${mat.id}', '${opt.id}')" title="Eliminar opción">
                    <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('') : `
            <div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; padding: 0.5rem 0;">
              No hay opciones añadidas todavía. Haz clic en "+ Añadir Referencia" para guardar enlaces de IKEA, Leroy Merlin, Porcelanosa, etc.
            </div>
          `}
        </div>
      </div>

      <!-- Cuaderno de notas y comentarios conjuntos (Laura & Alejandro) -->
      <div class="comments-box">
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.35rem;">
          <i data-lucide="message-square" style="width: 12px; height: 12px;"></i>
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
            <div style="font-size: 0.75rem; color: var(--text-light); font-style: italic;">Sin notas todavía.</div>
          `}
        </div>

        <div class="add-comment-row">
          <select id="comment-author-${mat.id}" style="padding: 0.25rem; font-size: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
            <option value="Laura">Laura</option>
            <option value="Alejandro">Alejandro</option>
            <option value="Aparejador">Aparejador</option>
          </select>
          <input type="text" id="comment-input-${mat.id}" class="comment-input" placeholder="Escribir una nota rápida..." onkeydown="if(event.key === 'Enter') addComment('${mat.id}')">
          <button class="btn btn-outline btn-sm" onclick="addComment('${mat.id}')">
            <i data-lucide="send" style="width: 12px; height: 12px;"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <button class="btn btn-outline btn-sm" onclick="openEditMaterialModal('${mat.id}')">
        <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i> Editar Detalle
      </button>

      <button class="btn btn-outline btn-sm" style="color: #ef4444;" onclick="deleteMaterial('${mat.id}')" title="Eliminar partida">
        <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
      </button>
    </div>
  `;

  return card;
}

// ==========================================================================
// RENDERIZADO DEL DOSSIER TÉCNICO (MODO APAREJADOR & CONSTRUCTOR)
// ==========================================================================
function renderDossierTable() {
  const tbody = document.getElementById("dossier-tbody");
  tbody.innerHTML = "";

  document.getElementById("dossier-date").textContent = new Date().toLocaleDateString("es-ES", {
    year: "numeric", month: "long", day: "numeric"
  });

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
        <span style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(mat.location || 'General')}</span>
      </td>
      <td>
        <strong>${escapeHtml(mat.name)}</strong><br>
        ${selectedOpt ? `
          <div style="font-size: 0.8rem; color: #047857; margin-top: 0.2rem;">
            ✓ <strong>Selección:</strong> ${escapeHtml(selectedOpt.title)} (${escapeHtml(selectedOpt.provider || '')})
            ${selectedOpt.url ? `<br><a href="${escapeHtml(selectedOpt.url)}" target="_blank" style="color: #2563eb; text-decoration: underline;">Ficha / Catálogo</a>` : ''}
          </div>
        ` : `
          <div style="font-size: 0.8rem; color: #b45309; margin-top: 0.2rem;">
            <em>* Selección en curso / criterio propietarios</em>
          </div>
        `}
      </td>
      <td>
        <strong>${qty} ${mat.unitType}</strong><br>
        ${wastage > 0 ? `<span style="font-size: 0.75rem; color: var(--text-muted);">(con ${wastage}% merma: ${effQty.toFixed(1)} ${mat.unitType})</span>` : ''}
      </td>
      <td>
        <strong>${formatCurrency(subtotal)}</strong><br>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${formatCurrency(price)}/${mat.unitType}</span>
      </td>
      <td>
        <div style="line-height: 1.45;">
          ${mat.builderNotes ? `<strong>Ejecución y montaje:</strong> ${escapeHtml(mat.builderNotes)}<br>` : ''}
          ${mat.explanation ? `<span style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(mat.explanation)}</span>` : ''}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================================================
// ACCIONES Y MODIFICACIONES DE DATOS
// ==========================================================================
function changeMaterialStatus(id, newStatus) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.status = newStatus;
    saveData();
    updateFilterCounts();
    // Actualizar clase del dropdown en tiempo real
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
    saveData();
    renderMaterialsList();
  }
}

function updateMatUnit(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.unitType = val;
    saveData();
    renderMaterialsList();
  }
}

function updateMatWastage(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.wastagePercent = parseFloat(val) || 0;
    saveData();
    renderMaterialsList();
  }
}

function updateMatPrice(id, val) {
  const mat = state.materials.find(m => m.id === id);
  if (mat) {
    mat.targetUnitPrice = parseFloat(val) || 0;
    saveData();
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
    mat.status = "selected"; // Al elegir la opción, se marca como cerrado automáticamente
    saveData();
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
    saveData();
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
    saveData();
    renderApp();
  }
}

function deleteMaterial(id) {
  if (!confirm("¿Seguro que deseas eliminar esta partida de la memoria?")) return;
  state.materials = state.materials.filter(m => m.id !== id);
  saveData();
  renderApp();
}

function resetFilters() {
  state.currentFilter = "criteria";
  state.currentChapter = "todos";
  state.searchQuery = "";
  state.currentSort = "default";
  document.getElementById("search-input").value = "";
  document.getElementById("select-chapter").value = "todos";
  document.getElementById("select-sort").value = "default";
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.filter === "criteria");
  });
  renderMaterialsList();
}

// ==========================================================================
// GESTIÓN DE MODALES
// ==========================================================================
function openAddMaterialModal() {
  document.getElementById("modal-material-title").textContent = "Añadir Nuevo Material / Partida";
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
    // Edición
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
    // Creación
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

  saveData();
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
    saveData();
    document.getElementById("modal-option").classList.remove("open");
    renderApp();
  }
}

// Lightbox para fotos
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

  if (content.style.display === "none") {
    content.style.display = "block";
    if (icon) icon.style.transform = "rotate(0deg)";
  } else {
    content.style.display = "none";
    if (icon) icon.style.transform = "rotate(-90deg)";
  }
}

// ==========================================================================
// EXPORTACIÓN A CSV / EXCEL Y RESPALDO JSON
// ==========================================================================
function exportToCSV() {
  let csvContent = "\uFEFF"; // BOM para acentos en Excel
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
  const jsonStr = JSON.stringify(state.materials, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Valdemorillo_Respaldo_Calidades_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (confirm(`Se cargarán ${parsed.length} materiales. ¿Deseas reemplazar los datos actuales?`)) {
          state.materials = parsed;
          saveData();
          renderApp();
          document.getElementById("modal-backup").classList.remove("open");
          alert("¡Datos restaurados con éxito!");
        }
      } else {
        alert("El archivo no tiene el formato de materiales esperado.");
      }
    } catch (err) {
      alert("Error al leer el archivo JSON: " + err.message);
    }
  };
  reader.readAsText(file);
}

function resetToDefaultData() {
  if (confirm("¿Estás seguro de que deseas restablecer todos los materiales a la memoria inicial del 30/7/2026? Se perderán las opciones personalizadas.")) {
    state.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
    saveData();
    renderApp();
    document.getElementById("modal-backup").classList.remove("open");
    alert("¡Memoria inicial restaurada!");
  }
}

// ==========================================================================
// CONFIGURACIÓN DE EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Pestañas de filtrado
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentFilter = tab.dataset.filter;
      renderMaterialsList();
    });
  });

  // Búsqueda en vivo
  document.getElementById("search-input").addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderMaterialsList();
  });

  // Desplegable de capítulos
  document.getElementById("select-chapter").addEventListener("change", (e) => {
    state.currentChapter = e.target.value;
    renderMaterialsList();
  });

  // Ordenación
  document.getElementById("select-sort").addEventListener("change", (e) => {
    state.currentSort = e.target.value;
    renderMaterialsList();
  });

  // Botón añadir material
  document.getElementById("btn-add-material").addEventListener("click", openAddMaterialModal);
  document.getElementById("btn-close-material-modal").addEventListener("click", () => {
    document.getElementById("modal-material").classList.remove("open");
  });
  document.getElementById("btn-cancel-mat").addEventListener("click", () => {
    document.getElementById("modal-material").classList.remove("open");
  });
  document.getElementById("btn-save-mat").addEventListener("click", saveMaterialModal);

  // Botón modal de opciones
  document.getElementById("btn-close-option-modal").addEventListener("click", () => {
    document.getElementById("modal-option").classList.remove("open");
  });
  document.getElementById("btn-cancel-opt").addEventListener("click", () => {
    document.getElementById("modal-option").classList.remove("open");
  });
  document.getElementById("btn-save-opt").addEventListener("click", saveOptionModal);

  // Modo Aparejador / Dossier toggle
  document.getElementById("btn-toggle-dossier").addEventListener("click", toggleDossierView);
  document.getElementById("btn-close-dossier").addEventListener("click", toggleDossierView);

  // Backup / Respaldo modal
  document.getElementById("btn-open-backup").addEventListener("click", () => {
    document.getElementById("modal-backup").classList.add("open");
  });
  document.getElementById("btn-close-backup-modal").addEventListener("click", () => {
    document.getElementById("modal-backup").classList.remove("open");
  });
  document.getElementById("btn-close-backup").addEventListener("click", () => {
    document.getElementById("modal-backup").classList.remove("open");
  });
  document.getElementById("btn-download-json").addEventListener("click", exportToJSON);
  document.getElementById("btn-reset-data").addEventListener("click", resetToDefaultData);
  document.getElementById("input-import-file").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      importFromJSON(e.target.files[0]);
    }
  });

  // Exportar CSV
  document.getElementById("btn-export-csv").addEventListener("click", exportToCSV);

  // Modal GitHub
  document.getElementById("btn-open-github").addEventListener("click", () => {
    document.getElementById("modal-github").classList.add("open");
  });
  document.getElementById("btn-close-github-modal").addEventListener("click", () => {
    document.getElementById("modal-github").classList.remove("open");
  });
  document.getElementById("btn-close-github").addEventListener("click", () => {
    document.getElementById("modal-github").classList.remove("open");
  });

  // Lightbox click para cerrar
  document.getElementById("lightbox").addEventListener("click", () => {
    document.getElementById("lightbox").classList.remove("open");
  });
}

function toggleDossierView() {
  state.dossierMode = !state.dossierMode;
  const dossierView = document.getElementById("dossier-view");
  const mainContent = document.getElementById("content-section");
  const controls = document.getElementById("controls-section");
  const kpis = document.getElementById("kpi-section");
  const toggleBtn = document.getElementById("btn-toggle-dossier");

  if (state.dossierMode) {
    dossierView.style.display = "block";
    mainContent.style.display = "none";
    controls.style.display = "none";
    kpis.style.display = "none";
    toggleBtn.innerHTML = `<i data-lucide="arrow-left"></i> Volver a App`;
    renderDossierTable();
  } else {
    dossierView.style.display = "none";
    mainContent.style.display = "block";
    controls.style.display = "block";
    kpis.style.display = "block";
    toggleBtn.innerHTML = `<i data-lucide="file-text"></i> Modo Aparejador`;
    renderMaterialsList();
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// ==========================================================================
// UTILIDADES
// ==========================================================================
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
