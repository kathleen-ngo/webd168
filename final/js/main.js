// main.js
// Handles nav toggle, portfolio filters, and GSAP animations

document.addEventListener("DOMContentLoaded", () => {
    // ----- Mobile navigation toggle -----
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
  
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        navMenu.classList.toggle("hidden");
      });
    }
  
    // ----- Portfolio filter buttons -----
    // Expecting buttons like:
    // <button class="filter-pill filter-pill--active" data-filter="all">All</button>
    // <button class="filter-pill" data-filter="research">Research</button>
    //
    // And project cards like:
    // <article class="project-card" data-category="research">...</article>
  
    const filterButtons = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll("[data-category]");
  
    if (filterButtons.length && projectCards.length) {
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.filter;
  
          // Update active state
          filterButtons.forEach((b) => {
            b.classList.toggle("filter-pill--active", b === btn);
          });
  
          // Show / hide cards
          projectCards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow = filter === "all" || category === filter;
            card.classList.toggle("hidden", !shouldShow);
          });
        });
      });
    }
  
    // ----- GSAP animations (optional, safe if GSAP missing) -----
    if (window.gsap) {
      const { gsap } = window;
  
      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
  
      // Hero intro animation (Home page)
      if (document.querySelector(".hero-heading")) {
        gsap.from(".hero-heading", {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out",
        });
      }
  
      if (document.querySelector(".hero-lead")) {
        gsap.from(".hero-lead", {
          opacity: 0,
          y: 26,
          duration: 0.9,
          delay: 0.1,
          ease: "power2.out",
        });
      }
  
      if (document.querySelector(".hero-card")) {
        gsap.from(".hero-card", {
          opacity: 0,
          y: 40,
          duration: 1.1,
          delay: 0.15,
          ease: "power2.out",
        });
      }
  
      // Shared scroll-reveal animations for fun cards, projects, and contact
      if (window.ScrollTrigger) {
        const revealOnScroll = (selector) => {
          if (!document.querySelector(selector)) return;
          gsap.from(selector, {
            scrollTrigger: {
              trigger: selector,
              start: "top 80%",
            },
            opacity: 0,
            y: 32,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
          });
        };
  
        revealOnScroll(".fun-card");
        revealOnScroll(".project-card");
        revealOnScroll(".contact-info-card");
        revealOnScroll(".contact-form-shell");
      }
    }
  });
  