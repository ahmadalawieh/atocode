/* ATOCODE Website — v2.7.0 */

document.documentElement.classList.add("js");

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".mobile-header-actions .menu-toggle");
const mobileNav = document.querySelector("#mobileNav");
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

const setMobileMenuOpen = (isOpen, { returnFocus = false } = {}) => {
  if (!siteHeader || !menuToggle || !mobileNav) return;

  siteHeader.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  if (isOpen) {
    mobileNav.hidden = false;
  } else {
    mobileNav.hidden = true;
    if (returnFocus) menuToggle.focus();
  }
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMobileMenuOpen(!isOpen);
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    setMobileMenuOpen(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && siteHeader?.classList.contains("is-open")) {
    setMobileMenuOpen(false, { returnFocus: true });
  }
});

document.addEventListener("click", (event) => {
  if (!siteHeader?.classList.contains("is-open")) return;
  if (siteHeader.contains(event.target)) return;
  setMobileMenuOpen(false);
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

/* ─── Active Nav Highlighting ─── */
const navLinks = document.querySelectorAll(".nav a[href^='#']");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a[href^='#']");
const allNavLinks = [...navLinks, ...mobileNavLinks];

const sections = [...document.querySelectorAll("section[id]")]
  .map((section) => section.id);

if (allNavLinks.length && sections.length && "IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        allNavLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((sid) => {
    const el = document.getElementById(sid);
    if (el) navObserver.observe(el);
  });
}

/* ─── Contact Form ─── */
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!formStatus) return;

  const submitBtn = contactForm.querySelector(".form-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const formData = new FormData(contactForm);
    formData.append("_subject", "ATOCODE free website audit request from " + formData.get("name"));

    const response = await fetch("https://formspree.io/f/mzdwydpa", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent = "Audit request sent. I'll reply within 24 hours with the next step.";
      formStatus.className = "form-status form-success";
      contactForm.reset();
    } else {
      const data = await response.json();
      throw new Error(data.error || "Something went wrong.");
    }
  } catch (error) {
    formStatus.textContent = error.message || "Failed to send. Please email me directly.";
    formStatus.className = "form-status form-error";
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Request a Free Audit";
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  });
});

/* ─── Animated Counters ─── */
const counters = document.querySelectorAll("[data-count]");

if (counters.length && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;
          
          el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        };
        
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((counter) => counterObserver.observe(counter));
}

/* ─── Back to Top Button ── */
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}
