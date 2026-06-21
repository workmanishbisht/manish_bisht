gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-tag", {
  y: -20,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
});
gsap.from(".intro", {
  y: 28,
  opacity: 0,
  duration: 0.9,
  delay: 0.1,
  ease: "power3.out",
});
gsap.from(".title", {
  y: 70,
  opacity: 0,
  duration: 1.1,
  delay: 0.2,
  ease: "power4.out",
});
gsap.from(".subtitle", {
  y: 32,
  opacity: 0,
  duration: 0.9,
  delay: 0.35,
  ease: "power3.out",
});
gsap.from(".follow-wrap", {
  y: 26,
  opacity: 0,
  duration: 0.9,
  delay: 0.5,
  ease: "power3.out",
});
gsap.from(".hero-right", {
  scale: 0.94,
  opacity: 0,
  duration: 1.1,
  delay: 0.3,
  ease: "power3.out",
});

gsap.to(".hero-left", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
  },
  y: -60,
  ease: "none",
});

gsap.to(".hero-right", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
  },
  y: 40,
  ease: "none",
});

gsap.from(".about-pill", {
  scrollTrigger: { trigger: ".about", start: "top 85%" },
  y: 18,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
});

const aboutText = document.querySelector(".scroll-text");
if (aboutText) {
  const words = aboutText.innerText.trim().split(/\s+/);
  aboutText.innerHTML = words
    .map((w) => `<span class="word">${w}</span>`)
    .join(" ");

  gsap.from(".scroll-text .word", {
    scrollTrigger: {
      trigger: ".scroll-text",
      start: "top 85%",
      end: "bottom 60%",
      scrub: 1.2,
    },
    y: 24,
    opacity: 0,
    stagger: 0.05,
    ease: "power2.out",
  });
}

gsap.from(".skill-card", {
  scrollTrigger: { trigger: ".about-skills", start: "top 88%" },
  y: 36,
  opacity: 0,
  stagger: 0.07,
  duration: 0.65,
  ease: "power3.out",
});

gsap.from(".services-head h2", {
  scrollTrigger: { trigger: ".services", start: "top 85%" },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".services-head p", {
  scrollTrigger: { trigger: ".services", start: "top 85%" },
  y: 24,
  opacity: 0,
  duration: 0.7,
  delay: 0.12,
  ease: "power3.out",
});

gsap.from(".svc-card", {
  scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
  y: 70,
  opacity: 0,
  stagger: 0.12,
  duration: 0.85,
  ease: "power4.out",
});

gsap.from(".timeline-head h2", {
  scrollTrigger: { trigger: ".timeline-head", start: "top 85%" },
  y: 36,
  opacity: 0,
  duration: 0.85,
  ease: "power3.out",
});

gsap.from(".timeline-head p", {
  scrollTrigger: { trigger: ".timeline-head", start: "top 85%" },
  y: 20,
  opacity: 0,
  duration: 0.75,
  delay: 0.14,
  ease: "power3.out",
});

const isMobile = window.innerWidth <= 576;

if (!isMobile) {
  document.querySelectorAll(".timeline-row").forEach((row) => {
    const dot = row.querySelector(".tl-dot");
    const content = row.querySelector(".tl-content");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: row, start: "top 82%" },
    });

    tl.to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
    tl.to(
      content,
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.1",
    );
    tl.to(
      content,
      {
        scale: 1.015,
        duration: 0.18,
        ease: "power1.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.05",
    );
  });
}

const carouselWrapper = document.querySelector(".carousel-wrapper");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

const allCards = Array.from(document.querySelectorAll(".work-card"));

function getCardsPerSlide() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

let current = 0;
let slides = [];

function buildCarousel() {
  const perSlide = getCardsPerSlide();
  const track = document.getElementById("carouselTrack");

  track.innerHTML = "";
  slides = [];

  for (let i = 0; i < allCards.length; i += perSlide) {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    allCards.slice(i, i + perSlide).forEach((card) => slide.appendChild(card));
    track.appendChild(slide);
    slides.push(slide);
  }

  const total = slides.length;
  track.style.width = total * 100 + "%";
  slides.forEach((s) => (s.style.width = 100 / total + "%"));

  dotsContainer.innerHTML = "";
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "cdot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  current = 0;
  goTo(0);
}

function goTo(index) {
  const total = slides.length;
  current = ((index % total) + total) % total;
  const track = document.getElementById("carouselTrack");
  track.style.transform = `translateX(-${current * (100 / slides.length)}%)`;
  document
    .querySelectorAll(".cdot")
    .forEach((d, i) => d.classList.toggle("active", i === current));
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

let touchStartX = 0;
carouselWrapper.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);
carouselWrapper.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (diff > 50) goTo(current + 1);
  if (diff < -50) goTo(current - 1);
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildCarousel, 200);
});

buildCarousel();

gsap.from(".work-pill", {
  scrollTrigger: { trigger: ".latest-work", start: "top 85%" },
  y: 16,
  opacity: 0,
  duration: 0.6,
});
gsap.from(".work-head h2", {
  scrollTrigger: { trigger: ".latest-work", start: "top 85%" },
  y: 32,
  opacity: 0,
  duration: 0.8,
});
gsap.from(".work-head p", {
  scrollTrigger: { trigger: ".latest-work", start: "top 85%" },
  y: 20,
  opacity: 0,
  duration: 0.75,
  delay: 0.18,
});
gsap.from(".carousel-controls", {
  scrollTrigger: { trigger: ".latest-work", start: "top 85%" },
  y: 16,
  opacity: 0,
  duration: 0.7,
  delay: 0.26,
});

gsap.from(".cta-tag", {
  scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
  y: 22,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
});
gsap.from(".cta-title", {
  scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
  y: 56,
  opacity: 0,
  duration: 1,
  delay: 0.1,
  ease: "power4.out",
});
gsap.from(".cta-newsletter", {
  scrollTrigger: { trigger: ".cta-section", start: "top 70%" },
  y: 36,
  opacity: 0,
  duration: 0.85,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".contact-header", {
  scrollTrigger: { trigger: ".contact-section", start: "top 82%" },
  y: 44,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
});
gsap.from(".contact-info-card", {
  scrollTrigger: { trigger: ".contact-grid", start: "top 84%" },
  x: -36,
  opacity: 0,
  stagger: 0.1,
  duration: 0.75,
  ease: "power3.out",
});
gsap.from(".contact-socials a", {
  scrollTrigger: { trigger: ".contact-socials", start: "top 90%" },
  scale: 0,
  opacity: 0,
  stagger: 0.07,
  duration: 0.45,
  ease: "back.out(1.7)",
});
gsap.from(".contact-form", {
  scrollTrigger: { trigger: ".contact-section", start: "top 77%" },
  y: 80,
  opacity: 0,
  duration: 0.95,
  ease: "power4.out",
});

let lastScrollY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener(
  "scroll",
  () => {
    const currentY = window.scrollY;
    const shouldHide = currentY > lastScrollY && currentY > 100;

    gsap.to(header, {
      y: shouldHide ? -100 : 0,
      duration: 0.7,
      ease: "power3.out",
    });

    lastScrollY = currentY;
  },
  { passive: true },
);

document.querySelectorAll(".follow-icon i").forEach((icon) => {
  icon.addEventListener("mouseenter", () =>
    motion.animate(icon, { scale: 1.2 }, { duration: 0.22 }),
  );
  icon.addEventListener("mouseleave", () =>
    motion.animate(icon, { scale: 1 }, { duration: 0.22 }),
  );
});

// Theme: always open with dark theme by default on every page load
const themeToggle = document.getElementById("themeToggle");

document.body.dataset.theme = "dark";
localStorage.setItem("theme", "dark");
if (themeToggle) {
  themeToggle.querySelector("i").className = "ri-sun-line";
}

themeToggle?.addEventListener("click", () => {
  const body = document.body;
  const icon = themeToggle.querySelector("i");
  const newTheme = body.dataset.theme === "light" ? "dark" : "light";

  body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  icon.className = newTheme === "dark" ? "ri-sun-line" : "ri-moon-line";
});

new Typed("#element", {
  strings: ["UI / UX", "WEB"],
  typeSpeed: 180,
  backSpeed: 90,
  loop: true,
  cursorChar: "|",
});

const toastContainer = document.getElementById("toastContainer");
const toastIcon = document.getElementById("toastIcon");
const toastIconI = document.getElementById("toastIconI");
const toastText = document.getElementById("toastText");
const toastProgress = document.getElementById("toastProgress");

let toastTimer = null;

function showToast(message, type = "success") {
  const config = {
    success: { icon: "ri-check-line", cls: "success" },
    error: { icon: "ri-error-warning-line", cls: "error" },
    sending: { icon: "ri-loader-4-line", cls: "sending" },
  };

  const { icon, cls } = config[type] || config.success;

  toastIcon.className = `toast-icon ${cls}`;
  toastIconI.className = icon;
  toastText.textContent = message;
  toastProgress.className = "toast-progress";

  if (type !== "sending") {
    requestAnimationFrame(() => toastProgress.classList.add("running"));
  }

  toastContainer.classList.remove("hide");
  toastContainer.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);

  if (type !== "sending") {
    toastTimer = setTimeout(hideToast, 5500);
  }
}

function hideToast() {
  toastContainer.classList.remove("show");
  toastContainer.classList.add("hide");
}

function handleNewsletter() {
  const input = document.getElementById("newsletterEmail");
  const form = document.getElementById("newsletterForm");
  const success = document.getElementById("newsletterSuccess");
  const email = input?.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("Please enter a valid email address.", "error");
    input?.focus();
    return;
  }

  form.style.display = "none";
  success.style.display = "flex";
  showToast("You're subscribed! Welcome aboard 🎉", "success");
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof emailjs === "undefined") return;

  emailjs.init("DvCYfMXXT-xWCa2Uz");

  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const btn = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      if (input.required && !input.value.trim()) {
        valid = false;
        input.style.borderColor = "#ef4444";
        gsap.fromTo(
          input,
          { x: -5 },
          { x: 5, duration: 0.08, yoyo: true, repeat: 4 },
        );
      } else {
        input.style.borderColor = "";
      }
    });

    if (!valid) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    showToast("Sending your message…", "sending");
    btn.disabled = true;

    emailjs
      .sendForm("service_i6x117q", "template_jsm8xrf", contactForm)
      .then(() => {
        showToast("Message sent! I'll reply soon.", "success");
        contactForm.reset();
        btn.disabled = false;
      })
      .catch(() => {
        showToast("Failed to send. Please try again.", "error");
        btn.disabled = false;
      });
  });

  contactForm.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
    });
  });
});

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}
