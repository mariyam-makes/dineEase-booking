import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Soup, Fish, Leaf, IceCream, Wine, Heart, Star } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuProps {
  onReserveClick: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onReserveClick }) => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('starters');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories: { key: MenuItem['category']; label: string; icon: React.ReactNode }[] = [
    { key: 'starters', label: 'Starters', icon: <Soup className="w-4 h-4" /> },
    { key: 'mains', label: 'Land Mains', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'seafood', label: 'Ocean Cru', icon: <Fish className="w-4 h-4" /> },
    { key: 'vegetarian', label: 'Garden Flora', icon: <Leaf className="w-4 h-4" /> },
    { key: 'desserts', label: 'Desserts', icon: <IceCream className="w-4 h-4" /> },
    { key: 'drinks', label: 'Wine & Elixirs', icon: <Wine className="w-4 h-4" /> }
  ];

  const menuItems: MenuItem[] = [
    // Starters
    {
      id: "st-1",
      name: "Wild Mushroom Cappuccino",
      price: 24,
      description: "Creamy foam of hand-foraged cepes and chanterelles, infused with white truffle essence and served with warm sea-salted brioche.",
      category: "starters",
      rating: 4.8,
      reviewsCount: 94,
      image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "st-2",
      name: "Heritage Tomato Carpaccio",
      price: 22,
      description: "Preciously sliced colored raw heirloom tomatoes, dressed in aged balsamic pearls, compressed basil oil, and broken burrata curd.",
      category: "starters",
      rating: 4.7,
      reviewsCount: 78,
      image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "st-3",
      name: "Seared Foie Gras on Fig Pain Perdu",
      price: 36,
      description: "Hudson Valley duck liver caramelized with honey glaze, resting on brioche toast drenched in local mission fig compote.",
      category: "starters",
      rating: 4.9,
      reviewsCount: 112,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
    },

    // Land Mains
    {
      id: "mn-1",
      name: "Pine Forest Smoked Venison Loin",
      price: 68,
      description: "Tender venison loin smoked at table side with fresh pine needles, accompanied by juniper berry jus, sweet potato purée, and roasted plums.",
      category: "mains",
      rating: 4.9,
      reviewsCount: 104,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "mn-2",
      name: "Black Angus Fillet Mignon",
      price: 64,
      description: "Prime center cut, char-broiled to perfection, paired with marrow-infused Bordelaise sauce, bone-marrow flan, and crisp baby artichokes.",
      category: "mains",
      rating: 4.8,
      reviewsCount: 176,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
    },

    // Seafood
    {
      id: "sf-1",
      name: "Chilean Sea Bass in Lemongrass Velouté",
      price: 58,
      description: "Flaky deep-sea bass poached gently in coconut-lemongrass broth, enhanced with ginger confit, steamed sea greens, and lime caviar.",
      category: "seafood",
      rating: 4.9,
      reviewsCount: 153,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "sf-2",
      name: "Brittany Lobster Tail Thermidor",
      price: 72,
      description: "Tender claw and tail meat baked in rich Cognac cream sauce, crowned with Gruyère cheese crust and shaved fennel shoot salad.",
      category: "seafood",
      rating: 5.0,
      reviewsCount: 92,
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=400&q=80"
    },

    // Garden Flora (Vegetarian)
    {
      id: "vg-1",
      name: "Confit Heirloom Eggplant Tower",
      price: 34,
      description: "Slow-rendered eggplant seasoned with marjoram and mint, stacked with rich goat cheese medallions and baked under sweet piquillo pepper coulis.",
      category: "vegetarian",
      rating: 4.7,
      reviewsCount: 64,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "vg-2",
      name: "Forest Chanterelle Risotto",
      price: 38,
      description: "Acquerello aged carnaroli rice carefully creamed with pine nut milk, roasted wild performance chanterelles, and aromatic micro celery.",
      category: "vegetarian",
      rating: 4.9,
      reviewsCount: 125,
      image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=400&q=80"
    },

    // Desserts
    {
      id: "ds-1",
      name: "Gold Leaf Chocolate Grand Soufflé",
      price: 24,
      description: "72% Valrhona dark chocolate structure with high rise, dusted in 24k gold leaf, with a liquid core served alongside Tahiti vanilla bean ice cream.",
      category: "desserts",
      rating: 5.0,
      reviewsCount: 241,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "ds-2",
      name: "Saffron & Pear Tarte Tatin",
      price: 20,
      description: "Caramelized William pears poached in precious Kashmiri saffron, baked in flaky butter pastry and served with house cardamom crème fraîche.",
      category: "desserts",
      rating: 4.8,
      reviewsCount: 89,
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80"
    },

    // Drinks / Vintage Crus
    {
      id: "dr-1",
      name: "Krug Clos d'Ambonnay Champagne",
      price: 180,
      description: "An elegant, rich and complex single-vineyard Blanc de Noirs champagne pouring. Notes of warm brioche, hazelnut, and ginger confit.",
      category: "drinks",
      rating: 5.0,
      reviewsCount: 37,
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "dr-2",
      name: "Château Margaux Grand Cru 2010",
      price: 145,
      description: "By the glass. Exceptional vintage with notes of dried black currants, sweet violets, exotic spices, and velvet-smooth tannins.",
      category: "drinks",
      rating: 4.9,
      reviewsCount: 51,
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const handleToggleFavorite = (itemId: string) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="interactive-menu" className="py-24 bg-[#FAF8F5] text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-2">Unveiling Senses</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1816] tracking-tight">
            The Interactive Dining Catalog
          </h2>
          <p className="text-xs text-gray-500 mt-2 font-light">
            Toggle through the culinary acts. Tap the heart to bookmark elements you are dreaming of ordering, and synchronize them directly with your reservation notes.
          </p>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto mt-4" />
        </div>

        {/* Categories Tab Selector */}
        <div id="menu-categories-bar" className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto border-b border-[#C8A96A]/10 pb-4">
          {categories.map((cat) => (
            <button
              id={`menu-cat-tab-${cat.key}`}
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-[#556B4F] text-[#FAF8F5] shadow"
                  : "bg-[#F3EEE7]/50 hover:bg-[#F3EEE7] text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Items Catalog Grid with Framer Motion AnimatePresence */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  id={`menu-item-row-${item.id}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#F3EEE7]/25 hover:bg-white rounded-xl border border-[#C8A96A]/5 hover:border-[#C8A96A]/20 p-5 flex flex-col sm:flex-row gap-5 transition-all shadow-sm hover:shadow-md text-left"
                >
                  {/* Item Image */}
                  <div className="w-full sm:w-28 h-28 rounded-lg overflow-hidden shrink-0 relative bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      id={`fav-toggle-${item.id}`}
                      onClick={() => handleToggleFavorite(item.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur shadow-sm hover:bg-white text-rose-500 transition-colors cursor-pointer"
                      title={favorites.includes(item.id) ? "Remove from favorite wishes" : "Add to favorite wishes"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Item Content details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-serif text-base font-bold text-[#1A1816] flex items-center gap-1.5 flex-wrap">
                            {item.name}
                            {favorites.includes(item.id) && (
                              <span className="text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-100 px-1.5 py-0.5 rounded leading-none uppercase">Wished</span>
                            )}
                          </h3>
                          {/* Rating score */}
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                            <Star className="w-3 h-3 text-[#C8A96A] fill-current" />
                            <span className="font-medium text-gray-700">{item.rating.toFixed(1)}</span>
                            <span>({item.reviewsCount} reviews)</span>
                          </div>
                        </div>
                        <span className="font-serif font-black text-[#556B4F] text-lg shrink-0">${item.price}</span>
                      </div>
                      
                      <p className="text-xs text-slate-500 leading-relaxed font-light mt-2.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100/60 text-[10px] text-gray-400">
                      <span>Chef Special Recipe</span>
                      <button 
                        id={`menu-quick-rsvp-btn-${item.id}`}
                        onClick={onReserveClick}
                        className="text-[#C8A96A] hover:text-[#B39352] font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        Request on booking
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
