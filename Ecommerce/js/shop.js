import products from './products.js';
import { renderProducts, updateBadges } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const shopProductsContainer = document.getElementById('shop-products');
    const searchInput = document.getElementById('shop-search');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sortSelect = document.getElementById('sort-select');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceBtn = document.getElementById('apply-price');
    const productCountText = document.getElementById('product-count');

    let filteredProducts = [...products];

    function filterAndRender() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategories.includes('All') || selectedCategories.includes(product.category);
            const matchesMinPrice = !minPriceInput.value || product.price >= parseFloat(minPriceInput.value);
            const matchesMaxPrice = !maxPriceInput.value || product.price <= parseFloat(maxPriceInput.value);
            
            return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
        });

        // Sorting
        const sortValue = sortSelect.value;
        if (sortValue === 'price-low') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        }

        renderProducts(filteredProducts, shopProductsContainer);
        productCountText.textContent = `Showing ${filteredProducts.length} products`;
    }

    // Event Listeners
    searchInput.addEventListener('input', filterAndRender);
    categoryFilters.forEach(cb => cb.addEventListener('change', filterAndRender));
    sortSelect.addEventListener('change', filterAndRender);
    applyPriceBtn.addEventListener('click', filterAndRender);

    // Initial Render
    filterAndRender();
    updateBadges();
});
