import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Review } from '../types';

export const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: "rev-1",
      name: "Lord Ronald Sterling",
      role: "Vanguard Culinary Guild Member",
      rating: 5,
      text: "The 72-Hour Imperial Wagyu was a transcendental gastronomic experience. The bespoke digital floor plan permitted me to secure the glass pavilion table weeks in advance, guaranteeing our privacy. Elegant execution.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "rev-2",
      name: "Lady Sophia Sterling-Vance",
      role: "Boutique Wine Critic",
      rating: 5,
      text: "The Krug Clos d'Ambonnay flowed like liquid sunshine. The staff's hospitality resides at a tier of its own—intuitive, quiet, and graceful. Marco Rossi is an absolute wizard.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "rev-3",
      name: "Marcus Dupont",
      role: "Michelin Guide Reviewer (Incognito)",
      rating: 5,
      text: "Few kitchens preserve the tension between acid, salt, and fat with such elegant, effortless symmetry. From the Wild Mushroom Cappuccino onwards, every bite was an absolute masterpiece.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#FAF8F5] text-[#2D2D2D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-2">Testimonials</span>
          <h2 className="font-serif text-3xl font-extrabold text-[#1A1816] tracking-tight">
            Loved by Epicureans
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto mt-4" />
        </div>

        {/* Carousel Container Card */}
        <div className="relative bg-[#F3EEE7]/30 border border-[#C8A96A]/10 rounded-2xl p-8 sm:p-12 shadow-md">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-[#C8A96A]/10" />

          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                id={`testimonial-slide-${currentReview.id}`}
                key={currentReview.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-6 flex flex-col items-center"
              >
                {/* Author Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8A96A] shadow-md">
                  <img 
                    src={currentReview.avatar} 
                    alt={currentReview.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#C8A96A] fill-current" />
                  ))}
                </div>

                {/* Testimonial Core Text */}
                <p className="font-serif text-base sm:text-lg italic text-[#2D2D2D] leading-relaxed max-w-2xl">
                  "{currentReview.text}"
                </p>

                {/* Author Credentials */}
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1A1816] tracking-wide">
                    {currentReview.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                    {currentReview.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Triggers */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 pointer-events-none">
            <button
              id="carousel-arr-prev-btn"
              onClick={handlePrev}
              className="p-2 rounded-full bg-white hover:bg-[#F3EEE7] border border-gray-100 text-gray-700 shadow-md hover:text-[#C8A96A] pointer-events-auto cursor-pointer transition-colors"
              title="Previous testimony"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="carousel-arr-next-btn"
              onClick={handleNext}
              className="p-2 rounded-full bg-white hover:bg-[#F3EEE7] border border-gray-100 text-gray-700 shadow-md hover:text-[#C8A96A] pointer-events-auto cursor-pointer transition-colors"
              title="Next testimony"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bullet Nav Points Indicator */}
        <div id="testimonial-bullets" className="flex items-center justify-center gap-1.5 mt-6">
          {reviews.map((_, i) => (
            <button
              id={`testimonial-bullet-${i}`}
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i ? "w-6 bg-[#C8A96A]" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
