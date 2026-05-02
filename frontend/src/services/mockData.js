export const MOCK_RESTAURANTS = [
  {
    id: '1',
    name: 'Green Bowl Cafe',
    cuisine: 'Healthy, Salads, Vegan',
    safetyScore: 94,
    healthRating: 9,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 124,
    priceRange: '$$',
    description: 'Fresh ingredients, sustainable sourcing, and a kitchen that sparkles. We prioritize your health with every bowl.',
    location: '123 Health Ave, Diet City',
    safetyFeatures: ['Daily Sanitization', 'Health Screened Staff', 'No-Contact Kitchen'],
    menu: [
      { id: 'm1', name: 'Avocado Quinoa Salad', price: 450, description: 'Fresh avocado, organic quinoa, and zesty lemon dressing.', healthScore: 95 },
      { id: 'm2', name: 'Vegan Buddha Bowl', price: 520, description: 'Chickpeas, kale, sweet potato, and tahini.', healthScore: 98 },
    ]
  },
  {
    id: '2',
    name: 'The Burger Joint',
    cuisine: 'American, Fast Food, Burgers',
    safetyScore: 82,
    healthRating: 4,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
    rating: 4.2,
    reviews: 256,
    priceRange: '$',
    description: 'Juicy burgers, crispy fries, and a classic American experience.',
    location: '45 Grill Road, Foodie Town',
    safetyFeatures: ['Temperature Monitored Storage', 'Gloved Food Prep'],
    menu: [
      { id: 'm3', name: 'Classic Cheeseburger', price: 320, description: '100% Beef patty with cheddar and secret sauce.', healthScore: 40 },
      { id: 'm4', name: 'Double Stack Burger', price: 480, description: 'Two patties, double cheese, double the fun.', healthScore: 35 },
    ]
  },
  {
    id: '3',
    name: 'Sushi Zen',
    cuisine: 'Japanese, Sushi, Seafood',
    safetyScore: 98,
    healthRating: 8,
    deliveryTime: '30-45 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 89,
    priceRange: '$$$',
    description: 'Artisanal sushi prepared with the freshest catch of the day in a strictly controlled environment.',
    location: '88 Ocean Way, Metro Center',
    safetyFeatures: ['Ultra-Fresh Ingredient Sourcing', 'HEPA Filtered Kitchen'],
    menu: [
      { id: 'm5', name: 'Salmon Sashimi (6pcs)', price: 750, description: 'Premium grade Atlantic salmon.', healthScore: 92 },
      { id: 'm6', name: 'Dragon Roll', price: 850, description: 'Unagi, cucumber, topped with avocado.', healthScore: 85 },
    ]
  },
  {
    id: '4',
    name: 'Spicy Noodle Box',
    cuisine: 'Asian, Noodles, Street Food',
    safetyScore: 68,
    healthRating: 5,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop',
    rating: 3.8,
    reviews: 412,
    priceRange: '$',
    description: 'Fast, bold flavors from the streets of Bangkok.',
    location: '12 Alley St, Downtown',
    safetyFeatures: ['Face Guard Prep', 'Digital Invoices'],
    menu: [
      { id: 'm7', name: 'Pad Thai Chicken', price: 380, description: 'Classic thin rice noodles with sprouts and peanuts.', healthScore: 65 },
      { id: 'm8', name: 'Spicy Drunken Noodles', price: 420, description: 'Wide noodles with basil and chili.', healthScore: 60 },
    ]
  }
];
