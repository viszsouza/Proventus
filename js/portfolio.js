// ==========================================================================
// PROVENTUS PORTFÓLIO — portfolio.js
// Carrosséis com: setas prev/next, dots, drag-to-scroll, nav sticky ativa
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initAllCarousels();
  initStickyNav();
});

// ── Inicializa todos os carrosséis da página ──────────────────────────────
function initAllCarousels() {
  // Encontra cada grupo de controles e inicializa o carrossel correspondente
  document.querySelectorAll(".carousel-controls").forEach(controls => {
    const trackId = controls.dataset.carousel;
    const track   = document.getElementById(trackId);
    const dotsEl  = document.querySelector(`.carousel-dots[data-dots="${trackId}"]`);
    if (!track) return;

    const carousel = new Carousel(track, controls, dotsEl);
    carousel.init();
  });
}

// ── Classe Carousel ───────────────────────────────────────────────────────
class Carousel {
  constructor(track, controls, dotsEl) {
    this.track    = track;
    this.controls = controls;
    this.dotsEl   = dotsEl;
    this.cards    = Array.from(track.querySelectorAll(".carousel-card"));
    this.current  = 0;
    this.isDragging = false;
    this.startX   = 0;
    this.scrollStart = 0;
    this.cardWidth  = 0;
    this.gap        = 16; // px — deve bater com o CSS
    this.visibleCount = 1;
  }

  init() {
    if (!this.cards.length) return;

    this.updateDimensions();
    this.buildDots();
    this.bindArrows();
    this.bindDrag();
    this.bindResize();
    this.update(0, false);
  }

  // Calcula quantos cards são visíveis e a largura de cada um
  updateDimensions() {
    const card = this.cards[0];
    this.cardWidth = card.offsetWidth;
    const wrapperWidth = this.track.parentElement.offsetWidth;
    this.visibleCount = Math.max(1, Math.floor((wrapperWidth + this.gap) / (this.cardWidth + this.gap)));
  }

  // Cria os dots dinamicamente
  buildDots() {
    if (!this.dotsEl) return;
    this.dotsEl.innerHTML = "";

    const dotCount = Math.max(1, this.cards.length - this.visibleCount + 1);
    for (let i = 0; i < dotCount; i++) {
      const btn = document.createElement("button");
      btn.className = "carousel-dot" + (i === 0 ? " active" : "");
      btn.setAttribute("aria-label", `Ir para item ${i + 1}`);
      btn.setAttribute("role", "tab");
      btn.addEventListener("click", () => this.update(i));
      this.dotsEl.appendChild(btn);
    }
  }

  // Conecta setas prev/next
  bindArrows() {
    const prev = this.controls.querySelector(".btn-prev");
    const next = this.controls.querySelector(".btn-next");

    prev?.addEventListener("click", () => {
      this.update(Math.max(0, this.current - 1));
    });

    next?.addEventListener("click", () => {
      const max = Math.max(0, this.cards.length - this.visibleCount);
      this.update(Math.min(max, this.current + 1));
    });
  }

  // Drag-to-scroll (mouse + touch)
  bindDrag() {
    const track = this.track;

    // Mouse
    track.addEventListener("mousedown", e => {
      this.isDragging = true;
      this.startX = e.clientX;
      this.scrollStart = this.currentOffset();
      track.style.transition = "none";
      track.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", e => {
      if (!this.isDragging) return;
      const delta = e.clientX - this.startX;
      const newOffset = this.scrollStart - delta;
      this.setTrackOffset(newOffset, false);
    });

    window.addEventListener("mouseup", e => {
      if (!this.isDragging) return;
      this.isDragging = false;
      track.style.cursor = "";
      const delta = e.clientX - this.startX;
      const threshold = this.cardWidth * 0.25;

      if (Math.abs(delta) > threshold) {
        const max = Math.max(0, this.cards.length - this.visibleCount);
        const next = delta < 0
          ? Math.min(max, this.current + 1)
          : Math.max(0, this.current - 1);
        this.update(next);
      } else {
        this.update(this.current); // snap back
      }
    });

    // Touch
    track.addEventListener("touchstart", e => {
      this.startX = e.touches[0].clientX;
      this.scrollStart = this.currentOffset();
      track.style.transition = "none";
    }, { passive: true });

    track.addEventListener("touchmove", e => {
      const delta = e.touches[0].clientX - this.startX;
      this.setTrackOffset(this.scrollStart - delta, false);
    }, { passive: true });

    track.addEventListener("touchend", e => {
      const delta = e.changedTouches[0].clientX - this.startX;
      const threshold = 50;
      const max = Math.max(0, this.cards.length - this.visibleCount);

      if (Math.abs(delta) > threshold) {
        const next = delta < 0
          ? Math.min(max, this.current + 1)
          : Math.max(0, this.current - 1);
        this.update(next);
      } else {
        this.update(this.current);
      }
    });
  }

  // Recalcula em resize
  bindResize() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.updateDimensions();
        this.buildDots();
        this.update(Math.min(this.current, Math.max(0, this.cards.length - this.visibleCount)), false);
      }, 180);
    });
  }

  // Retorna o offset atual do track em px
  currentOffset() {
    const matrix = window.getComputedStyle(this.track).transform;
    if (!matrix || matrix === "none") return 0;
    const m = new DOMMatrix(matrix);
    return -m.m41;
  }

  // Define o transform do track
  setTrackOffset(offset, animate = true) {
    const max = Math.max(0, (this.cards.length - this.visibleCount) * (this.cardWidth + this.gap));
    const clamped = Math.max(0, Math.min(max, offset));
    this.track.style.transition = animate ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
    this.track.style.transform  = `translateX(-${clamped}px)`;
  }

  // Vai para um índice específico
  update(index, animate = true) {
    const max = Math.max(0, this.cards.length - this.visibleCount);
    this.current = Math.max(0, Math.min(max, index));

    const offset = this.current * (this.cardWidth + this.gap);
    this.setTrackOffset(offset, animate);

    this.updateCounter();
    this.updateDots();
    this.updateArrows();
  }

  updateCounter() {
    const curr = this.controls.querySelector(".carousel-counter .current");
    if (curr) curr.textContent = this.current + 1;
    const total = this.controls.querySelector(".carousel-counter .total");
    if (total) total.textContent = this.cards.length;
  }

  updateDots() {
    if (!this.dotsEl) return;
    this.dotsEl.querySelectorAll(".carousel-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.current);
      dot.setAttribute("aria-selected", i === this.current);
    });
  }

  updateArrows() {
    const max  = Math.max(0, this.cards.length - this.visibleCount);
    const prev = this.controls.querySelector(".btn-prev");
    const next = this.controls.querySelector(".btn-next");
    if (prev) prev.disabled = this.current === 0;
    if (next) next.disabled = this.current >= max;
  }
}


// ── Nav sticky — marca o link ativo conforme a seção visível ─────────────
function initStickyNav() {
  const navLinks = document.querySelectorAll(".portfolio-nav-link");
  const sections = document.querySelectorAll(".portfolio-category[id]");
  if (!navLinks.length || !sections.length) return;

  const headerH = document.querySelector(".site-header")?.offsetHeight || 84;
  const navH    = document.querySelector(".portfolio-nav")?.offsetHeight  || 56;
  const offset  = headerH + navH + 32;

  function setActive(id) {
    navLinks.forEach(link => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  }

  // IntersectionObserver para marcar a seção visível
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, {
    rootMargin: `-${offset}px 0px -50% 0px`,
    threshold: 0,
  });

  sections.forEach(sec => obs.observe(sec));

  // Click suave com offset para não ficar atrás do header+nav
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 16;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}
