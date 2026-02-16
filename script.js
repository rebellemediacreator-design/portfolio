(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById("leadForm");
  form?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const topic = String(fd.get("topic") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subjectMap = {
      digital: "Anfrage: Digitales Produkt / System",
      whitelabel: "Anfrage: White-Label / Lizenz",
      story: "Anfrage: Storytelling / Positionierung",
      photo: "Anfrage: Fotografie / UGC",
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
})();
