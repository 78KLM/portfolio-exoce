// ============================================================
//  PROJECTS.JS — Rendu dynamique + filtres + modale projet
// ============================================================

import { observeElements } from "./animations.js";

// ── Status badge ───────────────────────────────────────────

function buildStatusBadge(status, statusLabel) {
  return `
    <span class="project-status ${status}" role="status" aria-label="Statut : ${statusLabel}">
      <span class="status-dot" aria-hidden="true"></span>
      ${statusLabel}
    </span>
  `;
}

// ── Image helper ───────────────────────────────────────────

function buildImage(project, extraClass = "") {
  if (project.image) {
    return `
      <div class="project-image-wrapper ${extraClass}">
        <img
          src="${project.image}"
          alt="Aperçu du projet ${project.title}"
          class="project-image"
          loading="lazy"
        />
      </div>
    `;
  }
  return `
    <div class="project-image-wrapper project-image-placeholder ${extraClass}">
      <span>$</span> ${project.title.toLowerCase().replace(/\s+/g, "-")}
    </div>
  `;
}

// ── (Désactivé) Liens GitHub / Live ────────────────────────

/*
function buildLinks(project) {
  const links = [];

  if (project.github && project.github !== "#") {
    links.push(`
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Voir le code source sur GitHub">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        Code source
      </a>
    `);
  }

  if (project.live && project.live !== "#" && project.live !== null) {
    if (links.length) links.push(`<span class="project-links-sep" aria-hidden="true"></span>`);
    links.push(`
      <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Voir le projet en ligne">
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        Voir en ligne
      </a>
    `);
  }

  if (!links.length) return "";

  return `<div class="project-links">${links.join("")}</div>`;
}
*/

// ── Card HTML ──────────────────────────────────────────────

function buildProjectCard(project, index) {
  const featuredBadge = project.highlight
    ? `<span class="project-featured-badge" aria-label="Projet mis en avant">✦ Featured</span>`
    : "";

  const tagsHTML = project.technologies
    .map(tech => `<span class="project-tag">${tech}</span>`)
    .join("");

  const datesHTML = project.endDate && project.endDate !== "—"
    ? `${project.startDate} → ${project.endDate}`
    : `${project.startDate} → en cours`;

  return `
    <article
      class="project-card project-card-clickable"
      data-status="${project.status}"
      data-project-index="${index}"
      role="listitem"
      tabindex="0"
      aria-label="Projet : ${project.title}"
    >
      ${featuredBadge}
      ${buildImage(project)}

      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          ${buildStatusBadge(project.status, project.statusLabel)}
        </div>

        <p class="project-description">${project.description}</p>

        <p class="project-dates">
          <i class="fa-regular fa-calendar" aria-hidden="true"></i>
          ${datesHTML}
        </p>

        <div class="project-tags" role="list" aria-label="Technologies utilisées">
          ${tagsHTML}
        </div>

        <!-- Liens GitHub / Live masqués pour le moment -->
        <!-- ${"buildLinks(project)"} -->
      </div>
    </article>
  `;
}

// ── Modale : construction et logique ───────────────────────

function ensureModalContainer() {
  let backdrop = document.querySelector(".project-modal-backdrop");
  if (backdrop) return backdrop;

  const html = `
    <div class="project-modal-backdrop" aria-hidden="true">
      <div class="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <header class="project-modal-header">
          <div>
            <h2 class="project-modal-title" id="project-modal-title"></h2>
          </div>
          <div class="project-modal-status-wrapper">
            <span class="project-modal-status-slot"></span>
            <button class="project-modal-close" type="button" aria-label="Fermer la fenêtre">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
        </header>
        <div class="project-modal-body">
          <div class="project-modal-image-wrapper"></div>
          <div class="project-modal-description"></div>
          <div class="project-modal-tags"></div>
          <!-- Liens potentiels plus tard -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
  return document.querySelector(".project-modal-backdrop");
}

function openProjectModal(project) {
  const backdrop = ensureModalContainer();
  const modal     = backdrop.querySelector(".project-modal");

  // Titre
  backdrop.querySelector(".project-modal-title").textContent = project.title;

  // Statut
  const statusSlot = backdrop.querySelector(".project-modal-status-slot");
  statusSlot.innerHTML = buildStatusBadge(project.status, project.statusLabel);

  // Image
  const imageWrapper = backdrop.querySelector(".project-modal-image-wrapper");
  imageWrapper.innerHTML = buildImage(project, "project-modal-image");

  // Description complète (sans clamp)
  const descEl = backdrop.querySelector(".project-modal-description");
  descEl.textContent = project.description;

  // Tags
  const tagsEl = backdrop.querySelector(".project-modal-tags");
  tagsEl.innerHTML = project.technologies
    .map(tech => `<span class="project-tag">${tech}</span>`)
    .join("");

  // Afficher
  backdrop.classList.add("is-open");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // lock scroll

  // Gestion fermeture
  const closeBtn = backdrop.querySelector(".project-modal-close");

  function close() {
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    backdrop.removeEventListener("click", backdropClick);
    document.removeEventListener("keydown", escHandler);
    closeBtn.removeEventListener("click", close);
  }

  function escHandler(e) {
    if (e.key === "Escape") close();
  }

  function backdropClick(e) {
    if (e.target === backdrop) close();
  }

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", backdropClick);
  document.addEventListener("keydown", escHandler);

  // Focus titre pour l’accessibilité
  modal.querySelector(".project-modal-title").focus?.();
}

function initModalTriggers(projectsData, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card-clickable");
    if (!card) return;
    const index = Number(card.dataset.projectIndex);
    const project = projectsData[index];
    if (project) openProjectModal(project);
  });

  // Activation au clavier (entrée/space)
  container.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".project-card-clickable");
    if (!card) return;
    e.preventDefault();
    const index = Number(card.dataset.projectIndex);
    const project = projectsData[index];
    if (project) openProjectModal(project);
  });
}

// ── Filtres ────────────────────────────────────────────────

function initFilters(containerId) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const grid       = document.getElementById(containerId);
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      const cards  = grid.querySelectorAll(".project-card");
      let visibleCount = 0;

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.status === filter;
        card.classList.toggle("is-hidden", !match);
        if (match) visibleCount++;
      });

      const existing = grid.querySelector(".projects-empty");
      if (existing) existing.remove();

      if (visibleCount === 0) {
        grid.insertAdjacentHTML("beforeend", `
          <p class="projects-empty" role="status">
            <span>#</span> Aucun projet dans cette catégorie pour le moment.
          </p>
        `);
      }
    });
  });
}

// ── Point d'entrée ────────────────────────────────────────

export function renderProjects(projectsData, containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`[renderProjects] #${containerId} introuvable.`);
    return;
  }
  if (!Array.isArray(projectsData) || projectsData.length === 0) {
    console.warn("[renderProjects] Données manquantes.");
    return;
  }

  container.innerHTML = projectsData
    .map((project, index) => buildProjectCard(project, index))
    .join("");

  observeElements(".project-card");
  initFilters(containerId);
  initModalTriggers(projectsData, containerId);
}
