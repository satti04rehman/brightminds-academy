(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navToggle = document.getElementById("navToggle");
  if (navToggle) {
    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const grids = [".course-grid", ".why-grid", ".tst-grid", ".mentor-grid", ".gal-grid", ".principle-grid", ".steps", ".info-grid", ".stat-grid"];
  document.querySelectorAll(grids.join(",")).forEach((g) => {
    [...g.children].forEach((el, i) => { if (el.classList.contains("reveal")) el.style.transitionDelay = (i * 80) + "ms"; });
  });

  const sp = document.getElementById("sp");
  const onScroll = () => {
    const h = document.documentElement;
    if (sp) sp.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const heroFx = document.querySelector(".hero-fx");
  let raf = 0;
  const parallax = () => { if (heroFx) heroFx.style.transform = "translateY(" + (window.scrollY * 0.22) + "px)"; raf = 0; };
  if (!reduceMotion && heroFx) {
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(parallax); }, { passive: true });
    parallax();
  }

  const counted = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        counted.unobserve(el);
        const target = +el.dataset.count, suf = el.dataset.suffix || "", dur = 1300, t0 = performance.now();
        (function tick(t) {
          const p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-count]").forEach((el) => {
    if (reduceMotion) {
      el.textContent = el.dataset.count + (el.dataset.suffix || "");
    } else {
      counted.observe(el);
    }
  });

  document.querySelectorAll(".course,.why,.tst,.mentor,.fac,.scard,.principle,.info,.stat,.fee-note").forEach((el) => el.classList.add("spot"));
  if (!reduceMotion) {
    document.querySelectorAll(".spot").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
      });
    });
  }

  const form = document.getElementById("applyForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const msg = [
        "New admission inquiry from the BrightMinds website",
        "",
        "Student name: " + fd.get("student"),
        "Grade/class: " + fd.get("grade"),
        "Preferred program: " + fd.get("program"),
        "Parent/guardian: " + fd.get("parent"),
        "Contact number: " + fd.get("phone"),
        "Message: " + (fd.get("notes") || "—")
      ].join("\n");
      window.open("https://wa.me/923165661622?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }
})();