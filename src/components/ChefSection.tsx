import React from 'react';
import { motion } from 'motion/react';
import { Award, HeartHandshake, Compass } from 'lucide-react';

export const ChefSection: React.FC = () => {
  return (
    <section id="our-story" className="py-24 bg-[#F3EEE7]/35 text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative Storytelling and credentials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block">Behind the Flame</span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1816] tracking-tight">
              Curated by Master Alchemist <br />
              <span className="text-[#C8A96A] italic font-normal">Chef Marco Rossi</span>
            </h2>
            
            <div className="w-12 h-0.5 bg-[#C8A96A]" />

            <p className="text-sm text-[#2D2D2D]/85 leading-relaxed font-light">
              Marco Rossi did not grow up in luxury salons. He began his path on a small fishing boat off the coast of Amalfi, studying the saltwater-sprayed herbs growing wild on sea cliffs. This organic, raw, direct exposure to the seasons defines every single plate that leaves his kitchen today.
            </p>

            <p className="text-sm text-[#2D2D2D]/85 leading-relaxed font-light">
              After understudying at legendary three-Michelin-star sanctuaries in Tokyo, Copenhagen, and Paris, Marco founded DineEase to serve as an architectural canvas where ancient fermentation logic meets contemporary visual balance.
            </p>

            {/* Milestones panels */}
            <div className="space-y-4 pt-4">
              <div className="flex gap-4 p-4 rounded-lg bg-white border border-[#C8A96A]/10 shadow-sm">
                <Award className="w-8 h-8 text-[#C8A96A] shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-800">Chef representation at G7 Gastronomy Summit</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Honored in 2022 as one of the ultimate visionaries driving eco-responsible fine dining in the contemporary era.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-lg bg-white border border-[#C8A96A]/10 shadow-sm">
                <HeartHandshake className="w-8 h-8 text-[#556B4F] shrink-0" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-800">Zero-Waste Kitchen Directive</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Every ingredient is utilized down to the element—skins caramelized into glazes, stems dehydrated into premium herbal seasonings.</p>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="flex items-center gap-4 pt-4 justify-between sm:justify-start">
              <div>
                <span className="font-serif italic text-xl text-gray-700 block">Marco Rossi</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block mt-0.5">Executive Chef & Owner</span>
              </div>
              <div className="h-10 w-px bg-gray-200 hidden sm:block mx-4" />
              <div className="hidden sm:block">
                <span className="font-serif italic text-sm text-[#556B4F] block">"Nature writes the sheet music; we merely play the strings."</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stunning Full Height Portrait with Elegant Borders */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Outline Decorative Frame */}
            <div className="absolute inset-4 border border-[#C8A96A] translate-x-4 translate-y-4 rounded-xl -z-10" />
            
            {/* Main Portrait Wrapper */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/50 h-[480px]">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80" 
                alt="Executive Chef Marco Rossi preparing ingredients"
                className="w-full h-full object-cover saturate-[1.05] hover:scale-105 transition-transform duration-[1200ms]"
              />
              {/* Sun Light flare overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/60 via-transparent to-transparent" />
              
              {/* Inner overlay info indicator */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#FAF8F5]/90 backdrop-blur-md shadow text-left">
                <span className="text-[8px] uppercase tracking-widest text-[#C8A96A] font-bold block">Current Location</span>
                <span className="font-serif text-sm font-bold text-[#1A1816] block mt-0.5">DineEase Salon Floor, Custom Pass</span>
              </div>
            </div>

            {/* Tiny compass badge */}
            <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-full p-3 border border-[#C8A96A]/20">
              <Compass className="w-5 h-5 text-[#C8A96A]" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
