// ============================================================
//  ANIMATIONS.JS — IntersectionObserver scroll reveal
//                  + Typewriter Hero
//                  + Loader
// ============================================================

// ── Scroll Reveal ────────────────────────────────────────────
/**
 * Observe tous les éléments .reveal et ajoute .is-visible
 * quand ils entrent dans le viewport.
 * Les .about-block et .skill-card ont leur propre transition CSS,
 * ce système est universel et se contente d'ajouter la classe.
 */
export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // On unobserve pour ne déclencher l'animation qu'une fois
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}

// ── Reveal ciblé pour les éléments injectés dynamiquement ────
/**
 * À appeler APRÈS que le JS a injecté les skills/projets dans le DOM.
 * Observe les nouveaux éléments sans recréer l'observer global.
 */
export function observeElements(selector) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });
}

// ── Typewriter ───────────────────────────────────────────────
/**
 * @param {string} elementId  - id du span qui reçoit le texte
 * @param {string[]} phrases  - tableau de phrases à défiler
 * @param {number} speed      - délai en ms par caractère (défaut 75)
 */
export function initTypewriter(elementId, phrases, speed = 75) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  let paused      = false;

  const tick = () => {
    if (paused) return;

    const current = phrases[phraseIndex];

    if (deleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
    }

    let delay = deleting ? 35 : speed;

    // Fin de frappe → pause puis suppression
    if (!deleting && charIndex === current.length) {
      delay   = 2000;
      deleting = true;
    }

    // Fin de suppression → phrase suivante
    if (deleting && charIndex === 0) {
      deleting    = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay       = 350;
    }

    setTimeout(tick, delay);
  };

  // Légère pause au démarrage pour laisser le hero apparaître
  setTimeout(tick, 900);
}

// ── Loader ───────────────────────────────────────────────────
/**
 * Cache le loader une fois que la page est chargée.
 * Simule une commande terminal dans le loader avant de le cacher.
 */
export function initLoader() {
  const loader     = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");
  if (!loader) return;

  // Animation de texte dans le loader
  const commands = [
    "npm run build",
    "Compiling assets...",
    "✓ Done",
  ];
  let i = 0;
  const typeCommand = () => {
    if (!loaderText) return;
    if (i < commands.length) {
      loaderText.textContent = commands[i];
      i++;
      setTimeout(typeCommand, 380);
    }
  };
  typeCommand();

  // Masquage après chargement
  const hide = () => {
    setTimeout(() => {
      loader.style.opacity    = "0";
      loader.style.visibility = "hidden";
      loader.setAttribute("aria-hidden", "true");
    }, 400);
  };

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
  }
}

// ── Active nav link au scroll ────────────────────────────────
/**
 * Détecte la section visible et marque le lien nav correspondant.
 */
export function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".navbar-links a");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
