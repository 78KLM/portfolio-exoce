// assets/js/data/portfolio.js

export const skills = [
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    items: [
      {
        name: "AWS",
        icon: "fab fa-aws",
        url: "https://aws.amazon.com/",
        description: "Cloud public (compute, storage, IAM) et bonnes pratiques de déploiement.",
      },
      {
        name: "Terraform",
        icon: "fas fa-cubes",
        url: "https://www.terraform.io/",
        description: "Infrastructure as Code : provisioning reproductible et versionné.",
      },
      {
        name: "Linux",
        icon: "fab fa-linux",
        url: "https://www.kernel.org/",
        description: "Admin système, services, permissions, troubleshooting et outils CLI.",
      },
      {
        name: "Docker",
        icon: "fab fa-docker",
        url: "https://www.docker.com/",
        description: "Conteneurisation, Dockerfile, images, réseaux, volumes, compose.",
      },
      {
        name: "Kubernetes (en cours)",
        icon: "fas fa-dharmachakra",
        url: "https://kubernetes.io/",
        description: "Notions : pods, services, deployments, configmaps, secrets.",
      },
      {
        name: "VMware",
        icon: "fas fa-server",
        url: "https://www.vmware.com/",
        description: "Virtualisation : gestion de VMs et environnements de test.",
      },
    ],
  },

  {
    category: "Scripting & Automatisation",
    icon: "⚡",
    items: [
      {
        name: "Bash (en cours)",
        icon: "fas fa-terminal",
        url: "https://www.gnu.org/software/bash/",
        description: "Scripts d’automatisation, tâches cron, tooling CLI.",
      },
      {
        name: "Python",
        icon: "fab fa-python",
        url: "https://www.python.org/",
        description: "Scripting, automatisation, appels API, tooling interne.",
      },
      {
        name: "Git",
        icon: "fab fa-git-alt",
        url: "https://git-scm.com/",
        description: "Branching, PR, merges, workflows (Conventional Commits).",
      },
      {
        name: "YAML",
        icon: "fas fa-file-code",
        url: "https://yaml.org/",
        description: "Config : pipelines, compose, manifests.",
      },
      {
        name: "JSON",
        icon: "fas fa-code",
        url: "https://www.json.org/",
        description: "Échanges de données, payloads API, configuration.",
      },
    ],
  },

  {
    category: "Software & Back-end",
    icon: "🔧",
    items: [
      {
        name: "Java",
        icon: "fab fa-java",
        url: "https://www.java.com/",
        description: "POO, backend et bases de conception logicielle.",
      },
      {
        name: "C#",
        icon: "fas fa-code",
        url: "https://learn.microsoft.com/fr-fr/dotnet/csharp/",
        description: "Développement .NET côté backend et services.",
      },
      {
        name: "C (en cours)",
        icon: "fas fa-microchip",
        url: "https://www.cprogramming.com/",
        description: "Bases du langage C, logique bas niveau et performance.",
      },
      {
        name: "PHP",
        icon: "fab fa-php",
        url: "https://www.php.net/",
        description: "Backend PHP, bonnes pratiques et écosystème.",
      },
      {
        name: "Symfony",
        icon: "fas fa-sync-alt",
        url: "https://symfony.com/",
        description: "MVC, services, ORM, API, architecture propre.",
      },
      {
        name: "JavaScript",
        icon: "fab fa-js",
        url: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
        description: "JS pour l’UI, DOM, fetch, modules.",
      },
    ],
  },

  {
    category: "Data & Outils",
    icon: "🗄️",
    items: [
      {
        name: "SQL",
        icon: "fas fa-database",
        url: "https://www.mysql.com/",
        description: "Requêtes, jointures, modélisation relationnelle.",
      },
      {
        name: "MySQL",
        icon: "fas fa-database",
        url: "https://www.mysql.com/",
        description: "Administration et optimisation basique.",
      },
      {
        name: "PostgreSQL",
        icon: "fas fa-database",
        url: "https://www.postgresql.org/",
        description: "Base de données relationnelle avancée, couplée avec des ORM.",
      },
      {
        name: "Postman",
        icon: "fas fa-paper-plane",
        url: "https://www.postman.com/",
        description: "Tests API REST, collections, environnements.",
      },
      {
        name: "GitHub",
        icon: "fab fa-github",
        url: "https://github.com/",
        description: "Repo, PR, issues, GitHub Actions (CI/CD).",
      },
    ],
  },
];

export const projects = [
  {
    title: "Containerized Java Microservice (Spring Boot / Docker)",
    description: "Designed a REST API in Java integrating diagnostic routes (Healthcheck) for monitoring. Containerized the application using an optimized multi-stage Dockerfile. Orchestrated the backend and a PostgreSQL database using Docker Compose to establish a secure internal network. Source code is rigorously versioned following the Conventional Commits standard.",
    image: "assets/images/projects/java-docker.png",
    technologies: ["Java", "Spring Boot", "Docker", "Docker Compose", "PostgreSQL", "Git"],
    status: "termine",
    statusLabel: "Terminé",
    startDate: "Mars 2026",
    endDate: "Mars 2026",
    github: "https://github.com/votreprofil/containerized-java-microservice", // N'oublie pas de mettre ton vrai lien !
    live: null,
    highlight: true,
  },

  {
    title: "Architecture de Sauvegarde Automatisée AWS",
    description: "Déploiement 'Zero Touch' d'une infrastructure Cloud via Terraform. Sécurisation EC2 vers S3 via Rôle IAM (principe du Zero Trust) et automatisation des backups via script Bash et Cron.",
    image: "assets/images/projects/aws-terraform.png",
    technologies: ["AWS", "Terraform", "Linux", "Bash", "IAM", "Cron"],
    status: "termine",
    statusLabel: "Terminé",
    startDate: "Mars 2026",
    endDate: "Mars 2026",
    github: "", // Mets le lien GitHub de ton Terraform si tu l'as
    live: null,
    highlight: true,
  },

  {
    title: "Portfolio & Pipeline CI/CD",
    description: "Développement d'un portfolio statique ultra-performant et mise en place d'un pipeline CI/CD via GitHub Actions pour automatiser les mises en production lors des pushs sur la branche main.",
    image: "assets/images/projects/portfolio.webp",
    technologies: ["GitHub Actions", "HTML", "CSS", "JavaScript", "Git"],
    status: "termine",
    statusLabel: "Terminé",
    startDate: "Jan 2026",
    endDate: "Fév 2026",
    github: "https://github.com/votreprofil/portfolio",
    live: null,
    highlight: true,
  },

  {
    title: "Environnement de Dev Dockerisé",
    description: "Stack locale conteneurisée (Nginx, PHP-FPM, MySQL) via Docker Compose pour standardiser l'environnement de dev et éliminer les problèmes de compatibilité entre machines.",
    image: "assets/images/projects/docker-env.webp",
    technologies: ["Docker", "Docker Compose", "Linux", "Bash", "Nginx"],
    status: "termine",
    statusLabel: "Terminé",
    startDate: "Fév 2026",
    endDate: "Mars 2026",
    github: "",
    live: null,
    highlight: false,
  },

  {
    title: "Architecture Web Dimawork",
    description: "Plateforme de mise en relation ESN / Freelances. Architecture backend MVC, gestion de BDD relationnelle, et préparation de l'environnement pour une future conteneurisation Docker.",
    image: "assets/images/projects/dimawork.webp",
    technologies: ["PHP", "Symfony", "MySQL", "Architecture Web"],
    status: "en-pause",
    statusLabel: "En pause",
    startDate: "Mai 2024",
    endDate: "—",
    github: "",
    live: null,
    highlight: false,
  },
];