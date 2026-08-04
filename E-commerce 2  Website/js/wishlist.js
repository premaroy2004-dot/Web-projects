/**
 * Wishlist Manager - LocalStorage Persistence & Toggle Logic
 */

const WISHLIST_STORAGE_KEY = "aurora_ecommerce_wishlist_v1";

const WishlistManager = {
  getWishlist() {
    try {
      const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to read wishlist from LocalStorage", e);
      return [];
    }
  },

  saveWishlist(wishlist) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: wishlist }));
    } catch (e) {
      console.error("Failed to save wishlist to LocalStorage", e);
    }
  },

  toggleItem(productId) {
    const wishlist = this.getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      added = false;
    } else {
      wishlist.push(productId);
      added = true;
    }

    this.saveWishlist(wishlist);

    if (window.showToast) {
      const product = window.products ? window.products.find(p => p.id === productId) : null;
      const name = product ? product.name : "Item";
      if (added) {
        window.showToast(`Saved "${name}" to your wishlist!`, "success");
      } else {
        window.showToast(`Removed "${name}" from your wishlist.`, "info");
      }
    }

    return added;
  },

  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.includes(productId);
  },

  getItemCount() {
    return this.getWishlist().length;
  },

  getDetailedItems() {
    const wishlist = this.getWishlist();
    const allProducts = window.products || [];
    return wishlist.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  }
};

window.WishlistManager = WishlistManager;
