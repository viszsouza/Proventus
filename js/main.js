// ==========================================================================
// PROVENTUS — main.js v2
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollReveal();
  initHeaderState();
  initFaqAccordion();
  initContactForm();
  initActiveNavLink();
  initVideoTabs();
  initHeroVideoPlay();
  initDailyQuote();
});

/* ---- Menu mobile ---- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav    = document.querySelector(".main-nav");
  const overlay = document.querySelector(".nav-overlay");
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove("open");
    toggle.classList.remove("is-open");
    overlay?.classList.remove("show");
    document.body.style.overflow = "";
    toggle.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    nav.classList.add("open");
    toggle.classList.add("is-open");
    overlay?.classList.add("show");
    document.body.style.overflow = "hidden";
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () =>
    nav.classList.contains("open") ? close() : open()
  );
  overlay?.addEventListener("click", close);
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  window.addEventListener("keydown", e => e.key === "Escape" && close());
}

/* ---- Scroll reveal ---- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in-view"); obs.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach(el => obs.observe(el));
}

/* ---- Header shadow on scroll ---- */
function initHeaderState() {
  const h = document.querySelector(".site-header");
  if (!h) return;
  const update = () => {
    h.style.boxShadow = window.scrollY > 24 ? "0 8px 24px rgba(0,0,0,0.4)" : "none";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ---- Marca link ativo ---- */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html"))
      link.classList.add("active");
  });
}

/* ---- FAQ accordion ---- */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    const a = item.querySelector(".faq-answer");
    q?.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("open");
        const ans = i.querySelector(".faq-answer");
        if (ans) ans.style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        if (a) a.style.maxHeight = a.scrollHeight + "px";
      }
    });
    q?.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); q.click(); }
    });
  });
}

/* ---- Formulário de contato ---- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name    = form.querySelector("#name");
    const email   = form.querySelector("#email");
    const message = form.querySelector("#message");
    let valid = true;

    [name, email, message].forEach(f => {
      if (f && !f.value.trim()) { f.style.borderColor = "#e0282c"; valid = false; }
      else if (f)               { f.style.borderColor = ""; }
    });
    if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = "#e0282c"; valid = false;
    }

    if (!valid) {
      if (status) { status.textContent = "Preencha os campos obrigatórios."; status.className = "form-status error"; }
      return;
    }

    if (status) { status.textContent = "Enviando…"; status.className = "form-status"; }

    setTimeout(() => {
      if (status) {
        status.textContent = "Mensagem enviada! Nossa equipe entrará em contato em breve.";
        status.className = "form-status success";
      }
      form.reset();
    }, 900);
  });
}

/* ---- Tabs de vídeos Drive ---- */
function initVideoTabs() {
  const tabs    = document.querySelectorAll(".video-tab");
  const panels  = document.querySelectorAll(".video-panel");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.hidden = true);
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.target);
      if (target) target.hidden = false;
    });
  });
}

/* ---- Frase do dia (página de contato) ---- */
function initDailyQuote() {
  const el = document.querySelector("#daily-quote-text");
  if (!el) return;

  // Índice 0 = Domingo ... 6 = Sábado (Date.prototype.getDay)
  const frases = [
    "Todo evento é uma promessa. A nossa é entregar sem desculpas.", // Domingo
    "Segunda-feira é o dia certo para tirar seu projeto do papel.",  // Segunda
    "Estrutura não é detalhe — é a base que sustenta a experiência.", // Terça
    "Cada palco montado carrega 27 anos de execução sem improviso.", // Quarta
    "Grandes marcas não terceirizam o essencial. Elas escolhem quem entrega.", // Quinta
    "Faltam poucos dias para o seu evento? Nós já resolvemos casos assim.", // Sexta
    "Enquanto uns planejam o fim de semana, nós já estamos montando o próximo evento.", // Sábado
  ];

  const hoje = new Date().getDay();
  el.textContent = frases[hoje];

  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });
}

/* ---- Play de vídeo Drive (substituir thumb por iframe) ---- */
function initHeroVideoPlay() {
  document.querySelectorAll(".video-drive-overlay").forEach(overlay => {
    overlay.addEventListener("click", () => {
      const wrap  = overlay.closest(".video-drive-frame");
      const src   = overlay.dataset.src;
      if (!wrap || !src) return;

      const iframe = document.createElement("iframe");
      iframe.src = src + "?autoplay=1";
      iframe.allow = "autoplay; fullscreen";
      iframe.style.cssText = "width:100%;height:100%;border:0;position:absolute;inset:0;";
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
    });
  });
}
