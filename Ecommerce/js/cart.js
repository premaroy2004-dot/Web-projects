import { updateBadges } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateBadges();
});

function renderCart() {
    const container = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 20px;">Start Shopping</a>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 20;
    const total = subtotal + shipping;

    container.innerHTML = `
        <div class="cart-items">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr>
                            <td>
                                <div class="cart-item-info">
                                    <img src="${item.image}" alt="${item.name}">
                                    <div>
                                        <h4>${item.name}</h4>
                                        <p style="font-size: 0.8rem; color: #888;">Category: ${item.category}</p>
                                    </div>
                                </div>
                            </td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>
                                <div class="cart-qty">
                                    <button class="qty-minus" data-id="${item.id}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="qty-plus" data-id="${item.id}">+</button>
                                </div>
                            </td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                            <td><i class="fas fa-trash remove-item" data-id="${item.id}"></i></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div class="summary-row">
                <span>Tax (Estimated)</span>
                <span>$0.00</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
            <a href="shop.html" style="display: block; text-align: center; margin-top: 15px; font-size: 0.9rem; color: var(--secondary-color);">Continue Shopping</a>
        </div>
    `;

    attachCartEvents();
}

function attachCartEvents() {
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), 1));
    });

    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), -1));
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeItem(parseInt(btn.dataset.id)));
    });
}

function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeItem(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateBadges();
        }
    }
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateBadges();
}
