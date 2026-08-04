/**
 * Live Search & Header Quick Search Box Module
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderSearch();
});

function initHeaderSearch() {
  const searchInput = document.querySelector(".header-search-input");
  const searchResultsDropdown = document.querySelector(".header-search-results");

  if (!searchInput || !searchResultsDropdown) return;

  let debounceTimer;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim().toLowerCase();

    if (query.length < 2) {
      searchResultsDropdown.classList.remove("open");
      searchResultsDropdown.innerHTML = "";
      return;
    }

    debounceTimer = setTimeout(() => {
      const allProducts = window.products || [];
      const matches = allProducts.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      ).slice(0, 5); // Limit dropdown preview to 5 items

      if (matches.length === 0) {
        searchResultsDropdown.innerHTML = `
          <div class="search-no-results">No products found for "${e.target.value}"</div>
        `;
      } else {
        searchResultsDropdown.innerHTML = matches.map(p => `
          <a href="product.html?id=${p.id}" class="search-result-item">
            <img src="${p.image}" alt="${p.name}">
            <div class="search-result-info">
              <span class="search-result-title">${p.name}</span>
              <span class="search-result-price">$${p.price.toFixed(2)}</span>
            </div>
          </a>
        `).join('') + `
          <a href="shop.html?search=${encodeURIComponent(query)}" class="search-view-all">
            View all results for "${query}" &rarr;
          </a>
        `;
      }

      searchResultsDropdown.classList.add("open");
    }, 200);
  });

  // Close search dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-search-wrapper")) {
      searchResultsDropdown.classList.remove("open");
    }
  });

  // Redirect on form submit
  const searchForm = document.querySelector(".header-search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
}
