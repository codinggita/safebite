import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Mock database
const MOCK_RESTAURANTS = [
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
    description: 'Fresh ingredients, sustainable sourcing, and a kitchen that sparkles.',
    location: '123 Health Ave, Diet City',
    safetyFeatures: ['Daily Sanitization', 'Health Screened Staff', 'No-Contact Kitchen'],
    menu: [
      { id: 'm1', name: 'Avocado Quinoa Salad', price: 450, description: 'Fresh avocado, organic quinoa.', healthScore: 95 },
      { id: 'm2', name: 'Vegan Buddha Bowl', price: 520, description: 'Chickpeas, kale, sweet potato.', healthScore: 98 },
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
      { id: 'm3', name: 'Classic Cheeseburger', price: 320, description: '100% Beef patty with cheddar.', healthScore: 40 },
      { id: 'm4', name: 'Double Stack Burger', price: 480, description: 'Two beef patties, double cheese, double the fun.', healthScore: 35 }
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
    description: 'Artisanal sushi prepared with the freshest catch.',
    location: '88 Ocean Way, Metro Center',
    safetyFeatures: ['Ultra-Fresh Ingredient Sourcing', 'HEPA Filtered Kitchen'],
    menu: [
      { id: 'm5', name: 'Salmon Sashimi (6pcs)', price: 750, description: 'Premium grade Atlantic salmon.', healthScore: 92 },
      { id: 'm6', name: 'Dragon Roll', price: 850, description: 'Unagi, cucumber, topped with avocado.', healthScore: 85 }
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
      { id: 'm8', name: 'Spicy Drunken Noodles', price: 420, description: 'Wide noodles with basil and chili.', healthScore: 60 }
    ]
  },
  {
    id: '5',
    name: 'Mamma Mia Pizza',
    cuisine: 'Italian, Pizza, Pasta',
    safetyScore: 88,
    healthRating: 7,
    deliveryTime: '35-45 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    reviews: 320,
    priceRange: '$$',
    description: 'Authentic wood-fired pizzas made with imported Italian ingredients.',
    location: '72 Roma Street, Little Italy',
    safetyFeatures: ['High-Temp Ovens', 'Daily Deep Clean'],
    menu: [
      { id: 'm9', name: 'Margherita Pizza', price: 650, description: 'Fresh tomatoes, mozzarella, and basil.', healthScore: 70 },
      { id: 'm10', name: 'Truffle Mushroom Pasta', price: 720, description: 'Creamy pasta with wild mushrooms and truffle oil.', healthScore: 60 }
    ]
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    cuisine: 'Mexican, Tacos, Street Food',
    safetyScore: 75,
    healthRating: 5,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop',
    rating: 4.3,
    reviews: 185,
    priceRange: '$',
    description: 'Authentic street tacos with homemade salsas.',
    location: '5 Cinco Ave, Fiesta District',
    safetyFeatures: ['Frequent Handwashing', 'Fresh Sourced Veggies'],
    menu: [
      { id: 'm11', name: 'Al Pastor Tacos (3pcs)', price: 300, description: 'Marinated pork with pineapple and onions.', healthScore: 55 },
      { id: 'm12', name: 'Veggie Burrito', price: 350, description: 'Black beans, rice, grilled peppers, and guac.', healthScore: 80 }
    ]
  },
  {
    id: '7',
    name: 'The Vegan Kitchen',
    cuisine: 'Vegan, Plant-Based, Healthy',
    safetyScore: 99,
    healthRating: 10,
    deliveryTime: '30-40 min',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 450,
    priceRange: '$$',
    description: '100% plant-based comfort food that is good for you and the planet.',
    location: '90 Green Blvd, Eco City',
    safetyFeatures: ['Allergen Separation', 'Organic Certified', 'Zero Waste Packaging'],
    menu: [
      { id: 'm13', name: 'Beyond Meat Burger', price: 550, description: 'Plant-based patty with vegan cheese.', healthScore: 85 },
      { id: 'm14', name: 'Acai Power Bowl', price: 420, description: 'Acai topped with fresh berries and granola.', healthScore: 100 }
    ]
  },
  {
    id: '8',
    name: 'Spice Route Curry House',
    cuisine: 'Indian, Curry, Spices',
    safetyScore: 85,
    healthRating: 6,
    deliveryTime: '40-50 min',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    reviews: 275,
    priceRange: '$$',
    description: 'Rich, aromatic curries cooked to perfection using traditional family recipes.',
    location: '34 Spice Market Rd, Old Town',
    safetyFeatures: ['Hot Holding Temperatures', 'Spice Quality Control'],
    menu: [
      { id: 'm15', name: 'Butter Chicken', price: 480, description: 'Tender chicken in a rich, creamy tomato sauce.', healthScore: 50 },
      { id: 'm16', name: 'Palak Paneer', price: 400, description: 'Cottage cheese cubes in a spiced spinach gravy.', healthScore: 75 }
    ]
  }
];

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({
    token: 'real-jwt-token-from-backend-123',
    user: { id: 'u1', fullName: 'Real User', email: email || 'user@example.com' }
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    token: 'real-jwt-token-from-backend-123',
    user: { id: 'u2', fullName: req.body.fullName, email: req.body.email }
  });
});

app.get('/api/restaurants', (req, res) => {
  const { query, onlySafeMode } = req.query;
  let filtered = [...MOCK_RESTAURANTS];
  
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  }
  
  if (onlySafeMode === 'true') {
    filtered = filtered.filter(r => r.safetyScore >= 80);
  }
  
  res.json(filtered);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = MOCK_RESTAURANTS.find(r => r.id === req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
