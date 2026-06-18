export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'starters' | 'mains' | 'seafood' | 'vegetarian' | 'desserts' | 'drinks';
  rating: number;
  reviewsCount: number;
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'window' | 'chef-counter' | 'garden' | 'standard';
  specialRequests?: string;
  tableNumber: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}
