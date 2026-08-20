const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const galleryItems = document.querySelectorAll(".gallery__item img");
const lightbox = document.createElement("div");
lightbox.className = "lightbox hidden";
lightbox.innerHTML = '<img alt="Imagen ampliada">';
document.body.appendChild(lightbox);

galleryItems.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.querySelector("img").src = img.src;
    lightbox.classList.remove("hidden");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

// ---- Animaciones (borra este bloque para quitarlas) ----
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

const revealElements = document.querySelectorAll(
  ".card, .policy, .stat, .gallery__item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});