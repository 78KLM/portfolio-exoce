// assets/js/data/portfolio.js
export const personalInfo = {
  name:     "Exocé Kalemba wa Kamba",
  title:    "Étudiant Ingénierie Logicielle & DevOps",
  location: "Sartrouville, Île-de-France",
  email:    "kalembaexoce@gmail.com",
  github:   "https://github.com/votreprofil",
  linkedin: "https://linkedin.com/in/votreprofil",
};

export const skills = [

  // ── 1. Infrastructure & Cloud ─────────────────────────────
  // Card maîtresse → pleine largeur (grid-column: 1 / -1)
  {
    category: "Infrastructure & Cloud",
    icon: "🖥️",
    items: [
      {
        name: "Linux",
        icon: "fab fa-linux",
        url: "https://www.kernel.org/",
        description: "Administration système, commandes shell, gestion de services et permissions.",
      },
      {
        name: "Docker",
        icon: "fab fa-docker",
        url: "https://www.docker.com/",
        description: "Conteneurisation d'applications, Dockerfile, docker-compose, registry.",
      },
      {
        name: "Kubernetes (en cours)",
        icon: "fas fa-dharmachakra",
        url: "https://kubernetes.io/",
        description: "Orchestration de conteneurs, notions de pods, services et déploiements.",
      },
      {
        name: "VMware",
        icon: "fas fa-server",
        url: "https://www.vmware.com/",
        description: "Virtualisation d'infrastructure, gestion de machines virtuelles.",
      },
    ],
  },

  // ── 2. Scripting & Automatisation ────────────────────────
  {
    category: "Scripting & Automatisation",
    icon: "⚡",
    items: [
      {
        name: "Bash (en cours)",
        icon: "fas fa-terminal",
        url: "https://www.gnu.org/software/bash/",
        description: "Écriture de scripts shell pour l'automatisation de tâches système.",
      },
      {
        name: "Python",
        icon: "fab fa-python",
        url: "https://www.python.org/",
        description: "Scripting, automatisation, manipulation de données et appels API.",
      },
      {
        name: "Git",
        icon: "fab fa-git-alt",
        url: "https://git-scm.com/",
        description: "Versioning, branches, merge, rebase, workflows GitHub/GitLab.",
      },
      {
        name: "YAML",
        icon: "fas fa-file-code",
        url: "https://yaml.org/",
        description: "Fichiers de configuration : Docker Compose, CI/CD pipelines, Kubernetes.",
      },
      {
        name: "JSON",
        icon: "fas fa-code",
        url: "https://www.json.org/",
        description: "Échange de données, configuration d'APIs et de fichiers manifestes.",
      },
    ],
  },

  // ── 3. Software & Back-end ────────────────────────────────
  {
    category: "Software & Back-end",
    icon: "🔧",
    items: [
      {
        name: "Java",
        icon: "fab fa-java",
        url: "https://www.java.com/",
        description: "Programmation orientée objet, applications d'entreprise et backend.",
      },
      {
        name: "C#",
        icon: "fas fa-code",
        url: "https://docs.microsoft.com/fr-fr/dotnet/csharp/",
        description: "Développement .NET, applications Windows et services backend.",
      },
      {
      name: "C (en cours)",
      icon: "fas fa-microchip",  // Icône parfaite pour C
      url: "https://www.cprogramming.com/",
      description: "Langage système de bas niveau pour systèmes embarqués et performance.",
      },
      {
        name: "PHP",
        icon: "fab fa-php",
        url: "https://www.php.net/",
        description: "Développement web backend avec le framework Symfony.",
      },
      {
        name: "Symfony",
        icon: "fas fa-sync-alt",
        url: "https://symfony.com/",
        description: "Framework PHP MVC, architecture modulaire, API REST.",
      },
      {
        name: "JavaScript",
        icon: "fab fa-js",
        url: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
        description: "Scripts front-end, DOM, requêtes asynchrones (fetch/async-await).",
      },
    ],
  },

  // ── 4. Data & Outils ──────────────────────────────────────
  {
    category: "Data & Outils",
    icon: "🗄️",
    items: [
      {
        name: "SQL",
        icon: "fas fa-database",
        url: "https://www.mysql.com/",
        description: "Requêtes, jointures, procédures stockées, gestion de bases MySQL.",
      },
      {
        name: "MySQL",
        icon: "fas fa-database",
        url: "https://www.mysql.com/",
        description: "SGBD relationnel, modélisation de schémas, optimisation de requêtes.",
      },
      {
        name: "Postman",
        icon: "fas fa-paper-plane",
        url: "https://www.postman.com/",
        description: "Test et documentation d'APIs REST, collections, environnements.",
      },
      {
        name: "GitHub",
        icon: "fab fa-github",
        url: "https://github.com/",
        description: "Hébergement de code, pull requests, GitHub Actions pour CI/CD.",
      },
    ],
  },

];


export const projects = [

  {
    title:       "Portfolio & Pipeline CI/CD",
    description: "Développement d'un portfolio statique ultra-performant et mise en place d'un pipeline CI/CD via GitHub Actions pour automatiser les mises en production lors des pushs sur la branche main.",
    image:       "assets/images/projects/portfolio.webp",
    technologies: ["GitHub Actions", "HTML", "CSS", "JavaScript", "Git"],
    status:      "termine",
    statusLabel: "Terminé",
    startDate:   "Jan 2026",
    endDate:     "Fév 2026",
    github:      "https://github.com/votreprofil/portfolio",
    live:        "#",
    highlight:   true,   // carte mise en avant (badge "Featured")
  },

  {
    title:       "Architecture Web Dimawork",
    description: "Plateforme de mise en relation ESN / Freelances. Architecture backend MVC, gestion de BDD relationnelle, et préparation de l'environnement pour une future conteneurisation Docker.",
    image:       "assets/images/projects/dimawork.webp",
    technologies: ["PHP", "Symfony", "MySQL", "Architecture Web"],
    status:      "en-pause",
    statusLabel: "En pause",
    startDate:   "Mai 2024",
    endDate:     "—",
    github:      "https://github.com/votreprofil/dimawork",
    live:        null,
    highlight:   false,
  },

  {
    title:       "Environnement de Dev Dockerisé",
    description: "Stack locale conteneurisée (Nginx, PHP-FPM, MySQL) via Docker Compose pour standardiser l'environnement de dev et éliminer les problèmes de compatibilité entre machines.",
    image:       "assets/images/projects/docker-env.webp",
    technologies: ["Docker", "Docker Compose", "Linux", "Bash", "Nginx"],
    status:      "en-cours",
    statusLabel: "En cours",
    startDate:   "Fév 2026",
    endDate:     "—",
    github:      "https://github.com/votreprofil/docker-dev-env",
    live:        null,
    highlight:   false,
  },

];

