document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({ once: true });

  // Mobile navigation toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Dynamic year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});