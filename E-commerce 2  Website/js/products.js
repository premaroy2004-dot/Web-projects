/**
 * E-Commerce Product Database
 * Contains high quality curated placeholder products with real Unsplash images
 */

const products = [
  {
    id: "prod-1",
    name: "Aura Wireless Noise-Canceling Headphones",
    category: "Electronics",
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    rating: 4.8,
    reviewsCount: 142,
    isBestSeller: true,
    isNewArrival: false,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Immerse yourself in pure acoustic bliss with Aura Wireless Noise-Canceling Headphones. Featuring custom 40mm beryllium drivers, active hybrid noise cancellation, and up to 40 hours of battery life.",
    specifications: {
      "Connectivity": "Bluetooth 5.3 & 3.5mm Aux",
      "Battery Life": "40 Hours (ANC On)",
      "Charging": "USB-C Fast Charging (10 mins = 4 hrs)",
      "Weight": "250g",
      "Warranty": "2 Years Official Warranty"
    }
  },
  {
    id: "prod-2",
    name: "Minimalist Chronograph Leather Watch",
    category: "Fashion",
    price: 159.00,
    originalPrice: 199.00,
    discount: 20,
    rating: 4.9,
    reviewsCount: 89,
    isBestSeller: true,
    isNewArrival: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Crafted with Italian genuine leather and Japanese quartz movement, this minimalist chronograph brings timeless sophistication to your everyday style.",
    specifications: {
      "Case Diameter": "40mm",
      "Strap Material": "Genuine Italian Calfskin Leather",
      "Water Resistance": "5 ATM / 50 meters",
      "Movement": "Japanese Quartz Chronograph"
    }
  },
  {
    id: "prod-3",
    name: "Ultra-Fast Ergonomic Wireless Mouse",
    category: "Electronics",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviewsCount: 215,
    isBestSeller: true,
    isNewArrival: false,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Designed for ultimate workplace comfort and gaming precision. High-precision optical sensor with custom thumb controls and silent click switches.",
    specifications: {
      "DPI": "Up to 16,000 Adjustable DPI",
      "Battery": "Rechargeable Li-ion (Up to 70 days)",
      "Connection": "2.4GHz Wireless & Bluetooth"
    }
  },
  {
    id: "prod-4",
    name: "Urban Explorer Commuter Backpack",
    category: "Accessories",
    price: 89.50,
    originalPrice: 119.50,
    discount: 25,
    rating: 4.7,
    reviewsCount: 64,
    isBestSeller: false,
    isNewArrival: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Water-resistant commuter backpack with built-in USB charging port, padded 16-inch laptop compartment, and anti-theft hidden pockets.",
    specifications: {
      "Capacity": "25 Liters",
      "Material": "900D Water-repellent Ballistic Nylon",
      "Laptop Pocket": "Fits up to 16-inch MacBook Pro"
    }
  },
  {
    id: "prod-5",
    name: "Velvet Matte Organic Lipstick Set",
    category: "Beauty",
    price: 34.00,
    originalPrice: 45.00,
    discount: 24,
    rating: 4.9,
    reviewsCount: 312,
    isBestSeller: true,
    isNewArrival: false,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Richly pigmented, hydrating matte lipsticks enriched with organic jojoba oil and vitamin E. Cruelty-free and long-wearing for up to 12 hours.",
    specifications: {
      "Finish": "Velvet Matte",
      "Shades Included": "Ruby Crimson, Nude Blush, Warm Berry",
      "Cruelty Free": "Yes (PETA Certified)"
    }
  },
  {
    id: "prod-6",
    name: "Smart Fitness & Health Tracker Band",
    category: "Electronics",
    price: 119.00,
    originalPrice: 149.00,
    discount: 20,
    rating: 4.5,
    reviewsCount: 178,
    isBestSeller: false,
    isNewArrival: true,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Track continuous heart rate, SpO2 levels, sleep cycles, and over 30 sport modes. Features a crystal-clear AMOLED display and 14-day battery life.",
    specifications: {
      "Display": "1.47\" AMOLED Touchscreen",
      "Sensors": "Optical Heart Rate, SpO2, Accelerometer",
      "Water Resistance": "50 meters (5 ATM)"
    }
  },
  {
    id: "prod-7",
    name: "Handcrafted Ceramic Coffee Mug Set",
    category: "Home & Living",
    price: 42.00,
    originalPrice: 50.00,
    discount: 16,
    rating: 4.8,
    reviewsCount: 95,
    isBestSeller: false,
    isNewArrival: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Set of 4 artisan ceramic mugs individually hand-thrown and glazed with natural reactive minerals. Dishwasher and microwave safe.",
    specifications: {
      "Capacity": "350ml per mug",
      "Material": "High-fired Ceramic Stoneware",
      "Care": "Dishwasher & Microwave Safe"
    }
  },
  {
    id: "prod-8",
    name: "Polarized Retro Sunglasses",
    category: "Fashion",
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.7,
    reviewsCount: 143,
    isBestSeller: true,
    isNewArrival: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Classic retro frame styled with TAC 9-layer polarized lenses providing 100% UV400 glare protection with ultra-lightweight stainless steel hinges.",
    specifications: {
      "Lens Type": "Polarized TAC UV400",
      "Frame Material": "Handcrafted Acetate",
      "Includes": "Protective Hard Case & Cleaning Cloth"
    }
  }
];

if (typeof window !== "undefined") {
  window.products = products;
}
