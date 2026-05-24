const searchInput = document.querySelector("#post-search");
const postItems = Array.from(document.querySelectorAll("[data-post]"));
const emptyState = document.querySelector("#search-empty");

if (searchInput && postItems.length > 0) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    postItems.forEach((post) => {
      const matches = post.textContent.toLowerCase().includes(query);
      post.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  });
}
