const filters = document.querySelectorAll('input[name="filter"]');
const tiles = Array.from(document.querySelectorAll(".project-tile"));
const spotlights = Array.from(document.querySelectorAll(".spotlight"));
const metaTitle = document.querySelector("[data-spotlight-title]");
const metaMeta = document.querySelector("[data-spotlight-meta]");
const metaYear = document.querySelector("[data-spotlight-year]");

function applyFilter(value) {
  tiles.forEach((tile) => {
    const tags = tile.dataset.tags.split(" ");
    const isVisible = value === "all" || tags.includes(value);
    tile.hidden = !isVisible;
  });
}

filters.forEach((filter) => {
  filter.addEventListener("change", (event) => {
    applyFilter(event.target.value);
  });
});

if ("IntersectionObserver" in window && metaTitle && metaMeta && metaYear) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const { title, meta, year } = visible.target.dataset;
      metaTitle.textContent = title;
      metaMeta.textContent = meta;
      metaYear.textContent = year;
    },
    {
      threshold: [0.35, 0.5, 0.75],
    }
  );

  spotlights.forEach((spotlight) => observer.observe(spotlight));
}
