/**
 * Shop Page Filter, Search, and Sort Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".shop-products-grid")) {
    initShopPage();
  }
});

function initShopPage() {
  const productsGrid = document.querySelector(".shop-products-grid");
  const categoryFilters = document.querySelectorAll(".category-filter-btn");
  const sortSelect = document.getElementById("shopSortSelect");
  const resultCountEl = document.getElementById("shopResultCount");
  const shopSearchInput = document.getElementById("shopSearchInput");

  let currentCategory = "all";
  let currentSort = "default";
  let currentSearchQuery = "";

  // Parse URL query parameters if present (e.g. ?category=Electronics or ?search=Watch)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    currentCategory = urlParams.get("category");
  }
  if (urlParams.has("search")) {
    currentSearchQuery = urlParams.get("search");
    if (shopSearchInput) shopSearchInput.value = currentSearchQuery;
  }

  // Set active state on category button
  categoryFilters.forEach(btn => {
    if (btn.dataset.category === currentCategory) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }

    btn.addEventListener("click", () => {
      categoryFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  if (shopSearchInput) {
    shopSearchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  function applyFilters() {
    let filtered = [...(window.products || [])];

    // Category filter
    if (currentCategory !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Search query filter
    if (currentSearchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(currentSearchQuery) ||
        p.category.toLowerCase().includes(currentSearchQuery) ||
        p.description.toLowerCase().includes(currentSearchQuery)
      );
    }

    // Sorting
    switch (currentSort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      default:
        // Default order
        break;
    }

    // Update UI
    if (resultCountEl) {
      resultCountEl.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-products-found">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No products match your criteria</h3>
          <p>Try adjusting your search terms or clearing filters.</p>
          <button class="btn btn-outline" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;

      const resetBtn = document.getElementById("resetFiltersBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          currentSearchQuery = "";
          if (shopSearchInput) shopSearchInput.value = "";
          categoryFilters.forEach(b => b.classList.remove("active"));
          const allBtn = document.querySelector(".category-filter-btn[data-category='all']");
          if (allBtn) allBtn.classList.add("active");
          applyFilters();
        });
      }
    } else {
      productsGrid.innerHTML = filtered.map(p => window.renderProductCard(p)).join('');
    }
  }

  // Initial Filter Run
  applyFilters();
}
