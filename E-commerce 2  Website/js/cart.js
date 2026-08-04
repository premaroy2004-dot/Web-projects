/**
 * Cart Manager - LocalStorage Persistence & Calculation Logic
 */

const CART_STORAGE_KEY = "aurora_ecommerce_cart_v1";

const CartManager = {
  getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to read cart from LocalStorage", e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
    } catch (e) {
      console.error("Failed to save cart to LocalStorage", e);
    }
  },

  addItem(productId, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ id: productId, quantity: quantity });
    }

    this.saveCart(cart);
    
    // Show toast notification
    if (window.showToast) {
      const product = window.products ? window.products.find(p => p.id === productId) : null;
      const title = product ? product.name : "Item";
      window.showToast(`Added "${title}" to your shopping cart!`, "success");
    }
  },

  removeItem(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);

    if (window.showToast) {
      window.showToast("Item removed from cart.", "info");
    }
  },

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
  },

  clearCart() {
    this.saveCart([]);
    if (window.showToast) {
      window.showToast("Shopping cart cleared.", "info");
    }
  },

  getItemCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotals() {
    const cart = this.getCart();
    const allProducts = window.products || [];

    let subtotal = 0;
    let savings = 0;

    const detailedItems = cart.map(item => {
      const prod = allProducts.find(p => p.id === item.id);
      if (!prod) return null;

      const itemSubtotal = prod.price * item.quantity;
      const itemOriginalSubtotal = (prod.originalPrice || prod.price) * item.quantity;
      
      subtotal += itemSubtotal;
      savings += (itemOriginalSubtotal - itemSubtotal);

      return {
        ...prod,
        quantity: item.quantity,
        totalPrice: itemSubtotal
      };
    }).filter(Boolean);

    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const grandTotal = subtotal + shipping + tax;

    return {
      items: detailedItems,
      subtotal,
      savings,
      shipping,
      tax,
      grandTotal
    };
  }
};

window.CartManager = CartManager;
