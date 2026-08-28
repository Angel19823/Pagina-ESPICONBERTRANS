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
const certItems = document.querySelectorAll(".cert-img--zoom");
const lightbox = document.createElement("div");
lightbox.className = "lightbox hidden";
lightbox.innerHTML = '<img alt="Imagen ampliada">';
document.body.appendChild(lightbox);

function openLightbox(src) {
  lightbox.querySelector("img").src = src;
  lightbox.classList.remove("hidden");
}

galleryItems.forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.src);
  });
});

certItems.forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.dataset.full);
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

// ---- Carrusel de documentos ----
const slides = document.querySelectorAll(".doc-carousel__slide");
const dots = document.querySelectorAll(".dot");
const counter = document.querySelector(".doc-carousel__counter");
let currentSlide = 0;

function showSlide(index) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
  counter.textContent = (currentSlide + 1) + " / " + slides.length;
}

document.querySelector(".doc-carousel__btn--prev").addEventListener("click", () => {
  showSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
});

document.querySelector(".doc-carousel__btn--next").addEventListener("click", () => {
  showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(parseInt(dot.dataset.index));
  });
});