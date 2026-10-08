const properties = [...document.querySelectorAll(".property-card")];
const filters = ["propertyType", "district", "budget", "rooms"].map((id) => document.getElementById(id));
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("is-scrolled", window.scrollY > 40);
}, { passive: true });

function applyFilters() {
  const visible = properties.filter((property) => {
    const typeMatch = filters[0].value === "all" || property.dataset.type === filters[0].value;
    const districtMatch = filters[1].value === "all" || property.dataset.district === filters[1].value;
    const budgetMatch = filters[2].value === "all" || property.dataset.budget === filters[2].value;
    const roomsMatch = filters[3].value === "all" || property.dataset.rooms === filters[3].value;
    const isVisible = typeMatch && districtMatch && budgetMatch && roomsMatch;
    property.classList.toggle("hidden", !isVisible);
    return isVisible;
  });
  resultCount.textContent = `${visible.length} ${visible.length === 1 ? "объект" : "объекта"}`;
  emptyState.classList.toggle("visible", visible.length === 0);
}

document.getElementById("searchButton").addEventListener("click", () => {
  applyFilters();
  document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("resetButton").addEventListener("click", () => {
  filters.forEach((filter) => { filter.value = "all"; });
  applyFilters();
});
filters.forEach((filter) => filter.addEventListener("change", applyFilters));
document.querySelectorAll(".save-button").forEach((button) => button.addEventListener("click", () => {
  button.classList.toggle("saved");
  button.textContent = button.classList.contains("saved") ? "♥" : "♡";
}));

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("mobile-open", !isOpen);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("mobile-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector(".form-message");
  message.textContent = "Спасибо — заявка отправлена. Мы свяжемся с вами в ближайшее время.";
  event.currentTarget.reset();
});
