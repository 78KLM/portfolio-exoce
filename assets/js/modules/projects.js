// ============================================================
//  PROJECTS.JS — Rendu dynamique + filtres de la section Projets
// ============================================================

import { observeElements } from "./animations.js";

// ── Builder : badge de statut ─────────────────────────────

function buildStatusBadge(status, statusLabel) {
  return `
    <span class="project-status ${status}" role="status" aria-label="Statut : ${statusLabel}">
      <span class="status-dot" aria-hidden="true"></span>
      ${statusLabel}
    </span>
  `;
}

// ── Builder : image ou placeholder ───────────────────────

function buildImage(project) {
  if (project.image) {
    return `
      <div class="project-image-wrapper">
        <img
          src="${project.image}"
          alt="Aperçu du projet ${project.title}"
          class="project-image"
          loading="lazy"
          onerror="this.parentElement.innerHTML = buildPlaceholder('${project.title}')"
        />
      </div>
    `;
  }
  return `
    <div class="project-image-wrapper">
      <div class="project-image-placeholder">
        <span>$</span> ${project.title.toLowerCase().replace(/\s+/g, "-")}
      </div>
    </div>
  `;
}

// ── Builder : liens GitHub / Live ────────────────────────

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

// ── Builder : card complète ───────────────────────────────

function buildProjectCard(project) {
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
      class="project-card"
      data-status="${project.status}"
      role="listitem"
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

        ${buildLinks(project)}
      </div>
    </article>
  `;
}

// ── Système de filtres ────────────────────────────────────

function initFilters(containerId) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const grid       = document.getElementById(containerId);
  if (!filterBtns.length || !grid) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

      // Mise à jour des boutons actifs
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

      // Message si aucun projet dans ce filtre
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

/**
 * Injecte les projets dans le DOM et active filtres + animations.
 * @param {Array}  projectsData - depuis portfolio.js
 * @param {string} containerId  - id du div cible dans index.html
 */
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

  // 1. Injection HTML
  container.innerHTML = projectsData.map(buildProjectCard).join("");

  // 2. Scroll reveal
  observeElements(".project-card");

  // 3. Filtres
  initFilters(containerId);
}
