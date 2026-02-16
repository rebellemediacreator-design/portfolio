(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);

      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const topic = String(fd.get("topic") || "").trim();
      const message = String(fd.get("message") || "").trim();

      const subjectMap = {
        foto: "Anfrage: Fotografie",
        story: "Anfrage: Storytelling",
        design: "Anfrage: Design / Print",
        wl: "Anfrage: White-Label / Lizenz",
      };

      const subject = subjectMap[topic] || "Anfrage: RE:BELLE™ Media";
      const body =
`Name: ${name}
E-Mail: ${email}
Thema: ${subject}

Nachricht:
${message}
`;

      window.location.href =
        `mailto:rebelle.media.creator@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const dots = Array.from(document.querySelectorAll(".dot"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  if (!dots.length || !panels.length) return;

  panels.forEach(panel => {
    const url = panel.getAttribute("data-bg");
    const bg = panel.querySelector(".panel__bg");
    if (bg && url) bg.style.backgroundImage = `url("${url}")`;
  });

  const setActive = (id) => {
    dots.forEach(d => d.classList.toggle("is-active", d.dataset.to === id));
  };

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const id = dot.dataset.to;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setActive(entry.target.id);
      entry.target.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));
    });
  }, { threshold: 0.55 });

  panels.forEach(p => io.observe(p));

  requestAnimationFrame(() => {
    const first = document.getElementById("panel-1");
    if (first) first.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));
  });

  const getCurrentPanelId = () => {
    const rects = panels.map(p => ({ id: p.id, top: Math.abs(p.getBoundingClientRect().top) }));
    rects.sort((a,b) => a.top - b.top);
    return rects[0]?.id || panels[0]?.id;
  };

  window.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();

    const currentId = getCurrentPanelId();
    const idx = panels.findIndex(p => p.id === currentId);
    if (idx < 0) return;

    if (e.key === "Home") { panels[0].scrollIntoView({ behavior:"smooth", block:"start" }); return; }
    if (e.key === "End")  { panels[panels.length-1].scrollIntoView({ behavior:"smooth", block:"start" }); return; }

    const nextIdx =
      (e.key === "ArrowDown" || e.key === "PageDown")
        ? Math.min(panels.length - 1, idx + 1)
        : Math.max(0, idx - 1);

    panels[nextIdx].scrollIntoView({ behavior:"smooth", block:"start" });
  }, { passive:false });
})();
