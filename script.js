const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: [0.05, 0.2, 0.5],
  },
);

sections.forEach((section) => observer.observe(section));

document.querySelectorAll(".polaroid").forEach((polaroid) => {
  polaroid.addEventListener("click", () => {
    const revealed = polaroid.classList.toggle("revealed");
    polaroid.setAttribute("aria-pressed", String(revealed));
  });
});

const dialog = document.querySelector(".project-dialog");
const closeDialog = document.querySelector(".dialog-close");

document.querySelectorAll(".detail-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  });
});

closeDialog.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
