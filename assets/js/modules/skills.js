// ============================================================
//  SKILLS.JS — Rendu dynamique Premium
//  Effets : couleurs officielles par techno, spotlight souris
// ============================================================

import { observeElements } from "./animations.js";

// ── Carte des couleurs officielles par technologie ────────
const TECH_COLORS = {
  "linux":       "#fcc624",
  "docker":      "#2496ed",
  "git":         "#f34f29",
  "ci/cd":       "#64ffda",
  "yaml":        "#cb171e",
  "bash":        "#4eaa25",
  "kubernetes":  "#326ce5",
  "ansible":     "#ee0000",
  "terraform":   "#7b42bc",
  "nginx":       "#009900",
  "php":         "#7a86b8",
  "python":      "#4b8bbe",
  "javascript":  "#f0db4f",
  "typescript":  "#3178c6",
  "java":        "#f89820",
  "c#":          "#9b4f96",
  "sql":         "#00aff0",
  "html5":       "#e34c26",
  "css3":        "#264de4",
  "json":        "#5a5a5a",
  "xml":         "#f60",
  "symfony":     "#aaaaaa",
  ".net":        "#512bd4",
  "angular":     "#dd0031",
  "react":       "#61dafb",
  "vue":         "#42b883",
  "figma":       "#f24e1e",
  "wordpress":   "#21759b",
  "mysql":       "#00618a",
  "postgresql":  "#336791",
  "mongodb":     "#4db33d",
  "redis":       "#dc382d",
};

/**
 * Retourne la couleur officielle d'une techno (lowercase match).
 * @param {string} name
 * @returns {string} couleur hex ou fallback cyan
 */
function getTechColor(name) {
  const key = name.toLowerCase().trim();
  return TECH_COLORS[key] || "#64ffda";
}

// ── Builder : badge individuel ────────────────────────────

/**
 * @param {Object} skill - { name, icon, url?, description? }
 * @returns {string} HTML string
 */
function buildBadge(skill) {
  const isLearning  = skill.name.toLowerCase().includes("en cours");
  const cleanName   = skill.name.replace(/\s*\(en cours\)/i, "").trim();
  const hasUrl      = skill.url && skill.url !== "#";
  const tag         = hasUrl ? "a" : "span";
  const urlAttrs    = hasUrl
    ? `href="${skill.url}" target="_blank" rel="noopener noreferrer"`
    : "";
  const titleAttr   = skill.description
    ? `title="${skill.description}"`
    : "";
  const color       = getTechColor(cleanName);
  const learningCls = isLearning ? " is-learning" : "";

  // La couleur de l'icône est injectée via custom property CSS
  // → permet au CSS de l'utiliser dans var(--icon-color)
  return `
    <${tag}
      class="skill-badge${learningCls}"
      data-skill="${cleanName}"
      style="--icon-color: ${color};"
      ${urlAttrs}
      ${titleAttr}
      aria-label="${cleanName}${isLearning ? " — en cours d'apprentissage" : ""}"
    >
      <i class="${skill.icon}" aria-hidden="true"></i>
      <span>${cleanName}</span>
    </${tag}>
  `;
}

// ── Builder : bloc catégorie ──────────────────────────────

/**
 * @param {Object} category - { category, icon, items[] }
 * @returns {string} HTML string
 */
function buildCategoryBlock(category) {
  const badgesHTML = category.items.map(buildBadge).join("");

  return `
    <div class="skill-category-block" role="listitem">
      <div class="skill-category-header">
        <span class="skill-category-icon" aria-hidden="true">${category.icon}</span>
        <div>
          <h3 class="skill-category-name">${category.category}</h3>
        </div>
        <span class="skill-category-count">${category.items.length} outils</span>
      </div>
      <div class="skills-grid" role="list" aria-label="Compétences ${category.category}">
        ${badgesHTML}
      </div>
    </div>
  `;
}

// ── Effet Spotlight (curseur qui éclaire la card) ─────────

/**
 * Suit la position de la souris dans chaque card
 * et met à jour les CSS custom props --mouse-x / --mouse-y.
 * C'est ce qui alimente le radial-gradient ::after du CSS.
 */
function initCardSpotlight(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll(".skill-category-block").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width)  * 100;
      const y    = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    });
  });
}

// ── Point d'entrée ────────────────────────────────────────

/**
 * Injecte les compétences dans le DOM et active les effets.
 * @param {Array}  skillsData  - depuis portfolio.js
 * @param {string} containerId - id du conteneur cible
 */
export function renderSkills(skillsData, containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`[renderSkills] #${containerId} introuvable.`);
    return;
  }
  if (!Array.isArray(skillsData) || skillsData.length === 0) {
    console.warn("[renderSkills] Données manquantes.");
    return;
  }

  // 1. Injection HTML
  container.innerHTML = skillsData.map(buildCategoryBlock).join("");

  // 2. Scroll reveal sur les cards
  observeElements(".skill-category-block");

  // 3. Effet spotlight souris
  initCardSpotlight(containerId);
}
