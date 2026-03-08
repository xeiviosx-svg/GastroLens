const mobileNavQuery = window.matchMedia("(max-width: 47.999rem)");

document.querySelectorAll("[data-nav-root]").forEach((root) => {
  const toggle = root.querySelector("[data-nav-toggle]");
  const menu = root.querySelector("[data-nav-menu]");

  if (!toggle || !menu) {
    return;
  }

  const setOpen = (isOpen) => {
    root.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  const closeMenu = () => setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(!root.classList.contains("is-open"));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileNavQuery.matches || !root.classList.contains("is-open")) {
      return;
    }

    if (event.target instanceof Node && !root.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  const syncMenu = () => {
    if (!mobileNavQuery.matches) {
      closeMenu();
    }
  };

  if (typeof mobileNavQuery.addEventListener === "function") {
    mobileNavQuery.addEventListener("change", syncMenu);
  } else {
    mobileNavQuery.addListener(syncMenu);
  }

  syncMenu();
});
