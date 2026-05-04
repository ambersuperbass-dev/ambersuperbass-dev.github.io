const filters = document.querySelectorAll('input[name="filter"]');
const cards = Array.from(document.querySelectorAll(".project-card"));

function applyFilter(value) {
  cards.forEach((card) => {
    const tags = card.dataset.tags.split(" ");
    card.hidden = value !== "all" && !tags.includes(value);
  });
}

filters.forEach((filter) => {
  filter.addEventListener("change", (event) => {
    applyFilter(event.target.value);
  });
});
