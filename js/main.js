// ==========================================================================
// PROVENTUS — main.js
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollReveal();
  initHeaderState();
  initFaqAccordion();
  initContactForm();
  initActiveNavLink();
});

/* -------------------- Menu mobile -------------------- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const overlay = document.querySelector(".nav-overlay");
  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove("open");
    toggle.classList.remove("is-open");
    overlay && overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openMenu() {
    nav.classList.add("open");
    toggle.classList.add("is-open");
    overlay && overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  overlay && overlay.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* -------------------- Scroll reveal -------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* -------------------- Header dinâmico -------------------- */
function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function update() {
    if (window.scrollY > 24) {
      header.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
    } else {
      header.style.boxShadow = "none";
    }
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* -------------------- Marca link de navegação ativo -------------------- */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* -------------------- FAQ accordion -------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* -------------------- Formulário de contato -------------------- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");
    let valid = true;

    [name, email, message].forEach((field) => {
      if (field && !field.value.trim()) {
        field.style.borderColor = "#e0282c";
        valid = false;
      } else if (field) {
        field.style.borderColor = "";
      }
    });

    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = "#e0282c";
      valid = false;
    }

    if (!valid) {
      status.textContent = "Preencha os campos obrigatórios corretamente.";
      status.className = "form-status error";
      return;
    }

    status.textContent = "Enviando mensagem...";
    status.className = "form-status";

    // Simulação de envio — substituir por integração real (endpoint próprio, EmailJS, Formspree etc.)
    setTimeout(() => {
      status.textContent = "Mensagem enviada! Em breve nossa equipe entrará em contato.";
      status.className = "form-status success";
      form.reset();

      if (typeof dataLayer !== "undefined") {
        dataLayer.push({ event: "formulario_enviado", form_name: "contato_proventus" });
      }
    }, 900);
  });
}
