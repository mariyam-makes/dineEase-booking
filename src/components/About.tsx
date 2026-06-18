import React from 'react';
import { motion } from 'motion/react';
import { Award, Feather, ShieldCheck, Soup } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="heritage" className="py-24 bg-[#FAF8F5] text-[#2D2D2D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header story */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-2">Our Heritage</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1816] tracking-tight">
            The Rhythm of Flavor, <br />
            <span className="text-[#556B4F] italic font-normal">Whispered Over Generations</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto mt-4" />
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Image Vignette Collages */}
          <div className="lg:col-span-6 relative h-[480px]">
            {/* Main Picture */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-0 top-0 w-4/5 h-[360px] rounded-lg overflow-hidden border border-[#C8A96A]/20 shadow-xl z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" 
                alt="Chef plating exquisite recipe"
                className="w-full h-full object-cover float-animation hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Overlapping secondary picture */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute right-0 bottom-4 w-1/2 h-[220px] rounded-lg overflow-hidden border border-[#C8A96A]/30 shadow-2xl z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" 
                alt="Finely arranged dinner table"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/30 to-transparent" />
            </motion.div>

            {/* Badge Indicator */}
            <div className="absolute left-6 bottom-16 bg-[#556B4F] text-[#FAF8F5] p-4 rounded shadow-xl z-30 max-w-[120px] text-center border border-[#8FA68E]/20">
              <span className="block font-serif text-3xl font-bold">30</span>
              <span className="block text-[8px] uppercase tracking-wider font-extrabold text-gray-200 mt-1">Years of Alchemy</span>
            </div>
          </div>

          {/* Column 2: Narrative and Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="font-serif text-2xl font-bold text-[#1A1816]">
              A culinary odyssey tailored around local ecosystems, bespoke wines, and mindful plating.
            </h3>
            
            <p className="text-sm text-[#2D2D2D]/80 leading-relaxed font-light">
              Founded in 1996 in the sunlit hills of Tuscany and recently relocated to this glass-faced sanctuary, DineEase has always honored a simple philosophy: treat fire, water, and soil with absolute reverence.
            </p>

            <p className="text-sm text-[#2D2D2D]/80 leading-relaxed font-light">
              Chef Marco Rossi rejects shortcuts. Our master stocks simmer for eighty hours, our sourdough cultures trace back thirty years, and our cellar vaults house selected crus that cannot be found anywhere else in the hemisphere.
            </p>

            {/* Micro Highlights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 bg-[#C8A96A]/10 rounded-lg text-[#C8A96A] shrink-0 mt-0.5">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-gray-800">Biodynamic Sourcing</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Every micro-green, truffle, and heirloom grain comes from farms we've partnered with for decades.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 sm:p-2.5 bg-[#556B4F]/10 rounded-lg text-[#556B4F] shrink-0 mt-0.5">
                  <Soup className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-gray-800">Masterful Preparation</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Every plate is curated to satisfy both aesthetic symmetry and flavor profile density.</p>
                </div>
              </div>
            </div>

            {/* Chef Quote Vignette */}
            <div className="bg-[#F3EEE7]/50 border-l-4 border-[#C8A96A] p-4 rounded-r-lg italic text-xs text-gray-600 mt-4">
              "We do not feed visitors; we curate temporary states of absolute tranquility."
              <span className="block font-medium font-serif text-[#1A1816] mt-1.5 not-italic text-[10px] uppercase tracking-wider">— Chef Marco Rossi</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
