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

const experienceToggles = Array.from(document.querySelectorAll(".experience-toggle"));

const setExperienceExpanded = (toggle, expanded) => {
  const detail = document.getElementById(toggle.getAttribute("aria-controls"));
  const card = toggle.closest(".experience-card");

  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.querySelector("span").textContent = expanded ? "收起详情" : "查看详情";
  card.classList.toggle("is-expanded", expanded);
  detail.setAttribute("aria-hidden", String(!expanded));
};

experienceToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const shouldExpand = toggle.getAttribute("aria-expanded") !== "true";

    experienceToggles.forEach((otherToggle) => {
      setExperienceExpanded(otherToggle, otherToggle === toggle && shouldExpand);
    });
  });
});

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
