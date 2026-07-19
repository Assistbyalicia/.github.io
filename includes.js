async function loadInclude(id, file) {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(res.statusText);
    const html = await res.text();
    container.innerHTML = html;

    if (id === "site-header") {
      initMenuToggle();
      setActiveNavLink();
    }
  } catch (e) {
    console.error("Erreur include", file, e);
  }
}

function initMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    });
  });
}

function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const selectors = [
    ".nav-links a",
    ".mobile-menu a"
  ];

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (href === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
}

// Charger header + footer
loadInclude("site-header", "partials/header.html");
loadInclude("site-footer", "partials/footer.html");
