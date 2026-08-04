import products from './products.js';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Render Featured Products on Home Page
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
        renderProducts(featuredProducts, featuredContainer);
    }

    // Render New Arrivals on Home Page
    const newContainer = document.getElementById('new-products');
    if (newContainer) {
        const newProducts = products.filter(p => p.isNew).slice(0, 4);
        renderProducts(newProducts, newContainer);
    }

    // Update Badges
    updateBadges();
});

export function renderProducts(productsList, container) {
    container.innerHTML = productsList.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isNew ? '<span class="product-badge">New</span>' : ''}
                <div class="product-actions">
                    <div class="action-btn wishlist-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </div>
                    <div class="action-btn quick-view" data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </div>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
                <div class="product-rating">
                    ${renderRating(product.rating)}
                </div>
                <div class="product-price">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add Event Listeners for Cart and Wishlist
    attachEventListeners();
}

function renderRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function attachEventListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        });
    });

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            addToWishlist(id);
        });
    });
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadges();
    showToast(`${product.name} added to cart!`);
}

function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const product = products.find(p => p.id === id);
    
    if (!wishlist.find(item => item.id === id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateBadges();
        showToast(`${product.name} added to wishlist!`);
    } else {
        showToast(`${product.name} is already in wishlist!`);
    }
}

export function updateBadges() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const cartBadge = document.getElementById('cart-badge');
    const wishlistBadge = document.getElementById('wishlist-badge');
    
    if (cartBadge) cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Add toast styles dynamically if not in CSS
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#333',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '2000',
        animation: 'fadeIn 0.3s ease'
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
