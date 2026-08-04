import { renderProducts, updateBadges } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    updateBadges();
});

function renderWishlist() {
    const container = document.getElementById('wishlist-grid');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 100px 0;">
                <i class="far fa-heart" style="font-size: 4rem; color: #ddd; margin-bottom: 20px;"></i>
                <h2>Your wishlist is empty</h2>
                <p>Save items you like to your wishlist.</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 20px;">Explore Shop</a>
            </div>
        `;
        return;
    }

    renderProducts(wishlist, container);
    
    // Override wishlist buttons to be "Remove"
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.innerHTML = '<i class="fas fa-heart" style="color: #ff4d4d;"></i>';
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.dataset.id);
            removeFromWishlist(id);
        });
    });
}

function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
    updateBadges();
}
