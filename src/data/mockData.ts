export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceLevel: number; // 1-4
  distance: number; // in km
  address: string;
  phone: string;
  isOpen: boolean;
  description: string;
  imageUrl: string;
  menuHighlights: string[];
}

export interface FoodReel {
  id: string;
  restaurantId: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  likes: number;
  views: number;
  creator: string;
  tags: string[];
  isLiked: boolean;
  isSaved: boolean;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Paradise",
    cuisine: "American",
    rating: 4.6,
    priceLevel: 2,
    distance: 0.3,
    address: "123 Food Street, Downtown",
    phone: "+1 (555) 123-4567",
    isOpen: true,
    description: "Gourmet burgers made with premium ingredients",
    imageUrl: "/api/placeholder/400/300",
    menuHighlights: ["Truffle Burger", "Crispy Chicken", "Sweet Potato Fries"]
  },
  {
    id: "2", 
    name: "Sakura Sushi",
    cuisine: "Japanese",
    rating: 4.8,
    priceLevel: 3,
    distance: 0.7,
    address: "456 Sushi Lane, Midtown",
    phone: "+1 (555) 234-5678",
    isOpen: true,
    description: "Authentic Japanese sushi and sashimi",
    imageUrl: "/api/placeholder/400/300",
    menuHighlights: ["Omakase", "Dragon Roll", "Fresh Sashimi"]
  },
  {
    id: "3",
    name: "Pizza Perfection",
    cuisine: "Italian",
    rating: 4.4,
    priceLevel: 2,
    distance: 1.2,
    address: "789 Italy Street, Little Italy",
    phone: "+1 (555) 345-6789",
    isOpen: false,
    description: "Wood-fired authentic Italian pizzas",
    imageUrl: "/api/placeholder/400/300",
    menuHighlights: ["Margherita", "Quattro Stagioni", "Truffle Pizza"]
  },
  {
    id: "4",
    name: "Fresh Bowl Co",
    cuisine: "Healthy",
    rating: 4.7,
    priceLevel: 2,
    distance: 0.9,
    address: "321 Health Ave, Green District",
    phone: "+1 (555) 456-7890",
    isOpen: true,
    description: "Fresh poke bowls and healthy eats",
    imageUrl: "/api/placeholder/400/300",
    menuHighlights: ["Salmon Poke", "Veggie Bowl", "Acai Bowl"]
  }
];

export const mockReels: FoodReel[] = [
  {
    id: "1",
    restaurantId: "1",
    title: "Ultimate Truffle Burger 🍔",
    description: "Watch how we make our signature truffle burger with wagyu beef!",
    imageUrl: "/src/assets/hero-food.jpg",
    videoUrl: "/api/placeholder/video",
    likes: 1524,
    views: 12300,
    creator: "@burgerpro",
    tags: ["burger", "truffle", "wagyu"],
    isLiked: false,
    isSaved: false
  },
  {
    id: "2",
    restaurantId: "2", 
    title: "Fresh Sushi Making ✨",
    description: "Master chef preparing the perfect salmon sashimi",
    imageUrl: "/src/assets/sushi-reel.jpg",
    videoUrl: "/api/placeholder/video",
    likes: 2341,
    views: 18700,
    creator: "@sushimaster",
    tags: ["sushi", "fresh", "japanese"],
    isLiked: true,
    isSaved: false
  },
  {
    id: "3",
    restaurantId: "3",
    title: "Wood-Fired Pizza Magic 🍕",
    description: "From dough to perfection in our wood-fired oven",
    imageUrl: "/src/assets/pizza-reel.jpg", 
    videoUrl: "/api/placeholder/video",
    likes: 987,
    views: 8900,
    creator: "@pizzachef",
    tags: ["pizza", "woodfired", "italian"],
    isLiked: false,
    isSaved: true
  },
  {
    id: "4",
    restaurantId: "4",
    title: "Perfect Poke Bowl 🥗",
    description: "Layer by layer, creating the perfect healthy meal",
    imageUrl: "/src/assets/poke-reel.jpg",
    videoUrl: "/api/placeholder/video", 
    likes: 1876,
    views: 14200,
    creator: "@healthyeats",
    tags: ["poke", "healthy", "fresh"],
    isLiked: false,
    isSaved: false
  }
];

export const getCuisineTypes = (): string[] => {
  return Array.from(new Set(mockRestaurants.map(r => r.cuisine)));
};

export const getPriceLevels = (): { value: number; label: string }[] => {
  return [
    { value: 1, label: "$" },
    { value: 2, label: "$$" },
    { value: 3, label: "$$$" },
    { value: 4, label: "$$$$" }
  ];
};