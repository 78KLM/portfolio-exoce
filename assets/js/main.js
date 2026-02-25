// assets/js/main.js
import { initScrollReveal, initTypewriter, initLoader, initActiveNavLink } from "./modules/animations.js";
import { initNavbar }     from "./modules/navbar.js";
import { renderSkills }   from "./modules/skills.js";
import { renderProjects } from "./modules/projects.js";
import { skills, projects } from "./data/portfolio.js";

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initActiveNavLink();
  initScrollReveal();
  initTypewriter("typewriter", [
    "Futur Ingénieur DevOps",
    "Cloud & Automation",
    "CI/CD · Docker · Linux",
    "Alternant @ ESIEE-IT",
  ]);
  renderSkills(skills, "skills-container");
  renderProjects(projects, "projects-grid");
});
