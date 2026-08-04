/**
 * Main Application JS - Global Utilities, UI Interactions, Quick View & Toasts
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initBadgeCounters();
  initToastContainer();
  initButtonRipples();
  initQuickViewModal();
  initNewsletter();
});

// Update Cart & Wishlist Counters in Header
function initBadgeCounters() {
  const updateCounters = () => {
    const cartBadge = document.querySelector(".cart-count-badge");
    const wishlistBadge = document.querySelector(".wishlist-count-badge");

    if (cartBadge && window.CartManager) {
      const count = window.CartManager.getItemCount();
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? "flex" : "none";
    }

    if (wishlistBadge && window.WishlistManager) {
      const count = window.WishlistManager.getItemCount();
      wishlistBadge.textContent = count;
      wishlistBadge.style.display = count > 0 ? "flex" : "none";
    }
  };

  updateCounters();
  window.addEventListener("cartUpdated", updateCounters);
  window.addEventListener("wishlistUpdated", updateCounters);
}

// Navbar Toggle & Sticky Shadow
function initNavbar() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }
}

// Button Ripple Effect
function initButtonRipples() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn, .btn-ripple");
    if (!btn) return;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const existingRipple = btn.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    btn.appendChild(circle);
  });
}

// Toast Notifications System
function initToastContainer() {
  if (!document.querySelector(".toast-container")) {
    const container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
}

window.showToast = function (message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    initToastContainer();
    container = document.querySelector(".toast-container");
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  const iconMarkup = type === "success" 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${iconMarkup}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 10);

  const removeToast = () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector(".toast-close").addEventListener("click", removeToast);
  setTimeout(removeToast, 4000);
};

// Reusable Product Card HTML Generator
window.renderProductCard = function (product) {
  const isInWishlist = window.WishlistManager ? window.WishlistManager.isInWishlist(product.id) : false;
  const originalPriceMarkup = product.originalPrice 
    ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` 
    : "";
  const discountBadge = product.discount 
    ? `<span class="product-badge discount">-${product.discount}%</span>` 
    : "";

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrapper">
        ${discountBadge}
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-actions-overlay">
          <button class="action-btn btn-wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}" title="${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isInWishlist ? '#0066FF' : 'none'}" stroke="${isInWishlist ? '#0066FF' : 'currentColor'}" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button class="action-btn btn-quick-view" data-id="${product.id}" title="Quick View">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-content">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <div class="stars">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span class="rating-value">${product.rating} (${product.reviewsCount})</span>
        </div>
        <div class="product-bottom-row">
          <div class="product-price">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${originalPriceMarkup}
          </div>
          <button class="btn btn-primary btn-add-cart" data-id="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `;
};

// Global Event Delegation for Product Card Buttons
document.addEventListener("click", (e) => {
  const addCartBtn = e.target.closest(".btn-add-cart");
  if (addCartBtn) {
    e.preventDefault();
    const id = addCartBtn.dataset.id;
    if (window.CartManager) {
      window.CartManager.addItem(id, 1);
    }
    return;
  }

  const wishlistBtn = e.target.closest(".btn-wishlist");
  if (wishlistBtn) {
    e.preventDefault();
    const id = wishlistBtn.dataset.id;
    if (window.WishlistManager) {
      const isAdded = window.WishlistManager.toggleItem(id);
      wishlistBtn.classList.toggle("active", isAdded);
      const svg = wishlistBtn.querySelector("svg");
      if (svg) {
        svg.setAttribute("fill", isAdded ? "#0066FF" : "none");
        svg.setAttribute("stroke", isAdded ? "#0066FF" : "currentColor");
      }
    }
    return;
  }

  const quickViewBtn = e.target.closest(".btn-quick-view");
  if (quickViewBtn) {
    e.preventDefault();
    const id = quickViewBtn.dataset.id;
    openQuickViewModal(id);
    return;
  }
});

// Quick View Modal System
function initQuickViewModal() {
  if (document.querySelector(".quick-view-modal")) return;

  const modalMarkup = `
    <div class="quick-view-modal" id="quickViewModal" aria-hidden="true">
      <div class="modal-backdrop"></div>
      <div class="modal-dialog">
        <button class="modal-close" id="closeQuickView">&times;</button>
        <div class="modal-body" id="quickViewContent">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalMarkup);

  const modal = document.getElementById("quickViewModal");
  const backdrop = modal.querySelector(".modal-backdrop");
  const closeBtn = document.getElementById("closeQuickView");

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

function openQuickViewModal(productId) {
  const product = (window.products || []).find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quickViewModal");
  const content = document.getElementById("quickViewContent");

  content.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-media">
        <img src="${product.image}" alt="${product.name}" id="qvMainImg" class="qv-main-img">
        <div class="qv-gallery">
          ${(product.gallery || [product.image]).map(img => `
            <img src="${img}" class="qv-thumb" onclick="document.getElementById('qvMainImg').src='${img}'">
          `).join('')}
        </div>
      </div>
      <div class="quick-view-details">
        <span class="product-category">${product.category}</span>
        <h2 class="qv-title">${product.name}</h2>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span>${product.rating} (${product.reviewsCount} reviews)</span>
        </div>
        <div class="qv-price-row">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <p class="qv-description">${product.description}</p>
        
        <div class="qv-actions">
          <div class="quantity-picker">
            <button type="button" onclick="this.nextElementSibling.stepDown()">-</button>
            <input type="number" id="qvQty" value="1" min="1" max="99">
            <button type="button" onclick="this.previousElementSibling.stepUp()">+</button>
          </div>
          <button class="btn btn-primary" onclick="window.CartManager.addItem('${product.id}', parseInt(document.getElementById('qvQty').value)); document.getElementById('quickViewModal').classList.remove('open');">
            Add To Cart
          </button>
          <a href="product.html?id=${product.id}" class="btn btn-outline">View Details</a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// Newsletter Form Handler
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        window.showToast(`Thank you for subscribing, ${input.value}! Check your inbox for your 15% discount code.`, "success");
        input.value = "";
      }
    });
  }
}
