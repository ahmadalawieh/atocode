const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenuToggle = document.querySelector(".mobile-header-actions .menu-toggle");
const revealItems = document.querySelectorAll("[data-reveal]");

if (siteHeader) {
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
    lastScroll = currentScroll;
  });
}

const toggleMobileMenu = () => {
  siteHeader?.classList.toggle("is-open");
};

menuToggle?.addEventListener("click", toggleMobileMenu);
mobileMenuToggle?.addEventListener("click", toggleMobileMenu);

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader?.classList.remove("is-open");
  });
});

const themeToggle = document.querySelector(".theme-toggle");
const mobileThemeToggle = document.querySelector(".mobile-header-actions .theme-toggle");

const applyTheme = (isLight) => {
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  applyTheme(true);
}

[themeToggle, mobileThemeToggle].forEach((toggle) => {
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-mode");
    applyTheme(isLight);
  });
});

const revealVisible = (item) => {
  item.classList.add("is-visible");
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealVisible(entry.target);
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 8, 5) * 60}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(revealVisible);
}

const contactForm = document.querySelector("#contactForm");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const service = formData.get("service")?.toString().trim();
  const budget = formData.get("budget")?.toString().trim() || "Not sure yet";
  const message = formData.get("message")?.toString().trim();

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${service}`,
    `Budget: ${budget}`,
    "",
    "Project details:",
    message,
  ].join("\n");

  const subject = `ATOCODE project inquiry from ${name}`;
  const mailto = `mailto:ahmad.alawieh77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});