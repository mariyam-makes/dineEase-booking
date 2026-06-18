import React from 'react';
import { motion } from 'motion/react';
import { Star, Flame, Award, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface SignatureDishesProps {
  onOrderClick: () => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ onOrderClick }) => {
  const popularDishes: MenuItem[] = [
    {
      id: "sig-1",
      name: "Truffle Semolina Tagliatelle",
      price: 45,
      description: "Hand-rolled egg pasta tossed in cultured French butter, emulsion of aged Parmigiano-Reggiano, and showered in freshly shaved Umbrian black truffles.",
      category: "starters",
      rating: 4.9,
      reviewsCount: 184,
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80",
      isPopular: true
    },
    {
      id: "sig-2",
      name: "Sunchoke Seared Dayboat Scallops",
      price: 52,
      description: "Plump harvested Maine scallops pan-seared in brown butter, accompanied by roasted sunchoke mouse, crisp pancetta ribbon, and toasted hazelnut oil.",
      category: "seafood",
      rating: 4.8,
      reviewsCount: 142,
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
      isChefSpecial: true
    },
    {
      id: "sig-3",
      name: "72-Hour Imperial Wagyu Short Rib",
      price: 78,
      description: "Highly marbled A5 Miyazaki rib meat slow-braised at 60°C, layered on a mountain of parsnip silk, charred wild cepes, and finished in a 20-year Port Reduction.",
      category: "mains",
      rating: 5.0,
      reviewsCount: 209,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      isPopular: true
    }
  ];

  return (
    <section id="signature-dishes" className="py-24 bg-[#F3EEE7]/40 text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-2">Gastronomy Masterpiece</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1816] tracking-tight">
              Our Celebrated Signatures
            </h2>
            <p className="text-xs text-gray-500 max-w-md mt-2 font-light">
              Crafted under strict seasonal supervision, these formulas represent the absolute peak of our kitchen's philosophy in texture and proportion.
            </p>
          </div>
          <button 
            id="sig-view-all-menu-btn"
            onClick={onOrderClick}
            className="self-start md:self-auto text-xs uppercase tracking-widest font-bold text-[#556B4F] hover:text-[#C8A96A] border-b border-[#556B4F] hover:border-[#C8A96A] pb-1 cursor-pointer transition-all"
          >
            Review the complete menu
          </button>
        </div>

        {/* Dishes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDishes.map((dish, idx) => (
            <motion.div
              id={`signature-dish-${dish.id}`}
              key={dish.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-xl overflow-hidden border border-[#C8A96A]/10 shadow-md group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges wrapper */}
              <div className="relative h-64 overflow-hidden shrink-0">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                {/* Badges positions */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {dish.isPopular && (
                    <span className="inline-flex items-center gap-1 bg-[#1A1816]/95 backdrop-blur-md rounded px-2.5 py-1 text-[8px] uppercase tracking-wider font-bold text-[#C8A96A] border border-[#C8A96A]/30">
                      <Flame className="w-3 h-3" />
                      Popular Standard
                    </span>
                  )}
                  {dish.isChefSpecial && (
                    <span className="inline-flex items-center gap-1 bg-[#556B4F] text-[#FAF8F5] rounded px-2.5 py-1 text-[8px] uppercase tracking-wider font-bold border border-[#8FA68E]/30">
                      <Award className="w-3 h-3" />
                      Chef's Special Selection
                    </span>
                  )}
                </div>

                {/* Rating overlay banner */}
                <div className="absolute bottom-3 right-4 bg-white/95 backdrop-blur-md rounded px-2 py-0.5 shadow-sm text-[10px] font-semibold text-gray-800 flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#C8A96A] fill-current" />
                  <span>{dish.rating.toFixed(1)}</span>
                  <span className="text-gray-400 font-light">({dish.reviewsCount})</span>
                </div>
              </div>

              {/* Description body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-[#1a1816] group-hover:text-[#556B4F] transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif font-bold text-[#C8A96A] text-xl shrink-0">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-light mt-2 line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                {/* Button Action */}
                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-medium">Available for dinner service</span>
                  <button
                    id={`book-dish-btn-${dish.id}`}
                    onClick={onOrderClick}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#556B4F] border border-[#C8A96A]/20 hover:border-transparent rounded-full text-[#C8A96A] hover:text-white transition-colors cursor-pointer shadow-sm hover:shadow"
                    title="Book table for this dish"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2">Book Tasting</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
