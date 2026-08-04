import products from './products.js';
import { renderProducts, updateBadges } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        renderProductDetails(product);
        renderRelatedProducts(product);
    } else {
        document.getElementById('product-details-container').innerHTML = '<h2>Product not found</h2>';
    }

    updateBadges();
});

function renderProductDetails(product) {
    const container = document.getElementById('product-details-container');
    container.innerHTML = `
        <div class="product-gallery fade-in">
            <img src="${product.image}" alt="${product.name}" class="main-img" id="main-image">
            <div class="thumb-imgs">
                <img src="${product.image}" alt="thumb" class="active">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" alt="thumb">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" alt="thumb">
            </div>
        </div>
        <div class="product-info-details fade-in">
            <span class="product-category">${product.category}</span>
            <h1>${product.name}</h1>
            <div class="product-rating-info">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <span>(150 Customer Reviews)</span>
            </div>
            <div class="product-price-details">$${product.price.toFixed(2)}</div>
            <p class="product-description">${product.description}</p>
            
            <div class="product-options">
                <div class="option-group">
                    <h4>Color</h4>
                    <div class="color-options" style="display: flex; gap: 10px;">
                        <div style="width: 25px; height: 25px; border-radius: 50%; background: black; cursor: pointer; border: 2px solid #ddd;"></div>
                        <div style="width: 25px; height: 25px; border-radius: 50%; background: silver; cursor: pointer; border: 2px solid #ddd;"></div>
                        <div style="width: 25px; height: 25px; border-radius: 50%; background: blue; cursor: pointer; border: 2px solid #ddd;"></div>
                    </div>
                </div>
            </div>

            <div class="quantity-selector">
                <button class="qty-btn" id="minus">-</button>
                <input type="number" value="1" id="qty-input" min="1">
                <button class="qty-btn" id="plus">+</button>
            </div>

            <div class="product-actions-details">
                <button class="btn btn-primary" id="add-to-cart-detail" data-id="${product.id}">Add to Cart</button>
                <button class="btn btn-outline" id="add-to-wishlist-detail" data-id="${product.id}"><i class="far fa-heart"></i></button>
            </div>

            <div class="product-meta">
                <p>SKU: <span>EC-00${product.id}</span></p>
                <p>Category: <span>${product.category}</span></p>
                <p>Tags: <span>Modern, Premium, Trending</span></p>
            </div>
        </div>
    `;

    // Gallery Logic
    const mainImg = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.thumb-imgs img');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImg.src = thumb.src;
        });
    });

    // Quantity Logic
    const qtyInput = document.getElementById('qty-input');
    document.getElementById('plus').addEventListener('click', () => qtyInput.value = parseInt(qtyInput.value) + 1);
    document.getElementById('minus').addEventListener('click', () => {
        if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });

    // Add to Cart Logic
    document.getElementById('add-to-cart-detail').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        addToCart(product.id, qty);
    });
}

function renderRelatedProducts(product) {
    const relatedGrid = document.getElementById('related-products-grid');
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    renderProducts(related, relatedGrid);
}

function addToCart(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    alert(`${product.name} added to cart!`);
}
