import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Award } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="find-us" className="py-24 bg-[#FAF8F5] text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-2">Location & Timing</span>
          <h2 className="font-serif text-3xl font-extrabold text-[#1A1816] tracking-tight">
            The Sanctuary of DineEase
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto mt-4" />
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Opening details and values (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            <div className="bg-[#F3EEE7]/40 rounded-2xl border border-[#C8A96A]/10 p-8 space-y-6">
              
              <h3 className="font-serif text-lg font-bold text-[#1A1816]">Information Desk</h3>
              
              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#C8A96A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-800">The Sanctuary Address</h4>
                  <p className="text-xs text-gray-500 mt-1">12 Corso Venezia, Milano, 20121, Italy</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Located inside the historical Palazzo de Sforza courtyard.</p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-[#556B4F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-800">Concierge Hotlines</h4>
                  <p className="text-xs text-gray-500 mt-1">+39 02 555 4928 (Reservations Desk)</p>
                  <p className="text-xs text-gray-500">+39 02 555 1098 (Executive Private Hire)</p>
                </div>
              </div>

              {/* Mail */}
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-[#C8A96A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-800">Corporate & Inquiries</h4>
                  <p className="text-xs text-gray-500 mt-1">reservations@dineease.com</p>
                  <p className="text-xs text-gray-500">concierge@dineease.com</p>
                </div>
              </div>

              {/* Timing */}
              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-[#556B4F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-800">Salon Operations</h4>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-xs text-gray-500">
                    <div>
                      <span className="font-semibold text-gray-700 block">Weekdays:</span>
                      18:00 - 23:30
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block">Weekends:</span>
                      17:30 - 00:00
                    </div>
                  </div>
                  <p className="text-[10px] text-[#C8A96A] font-semibold mt-2.5">Dinner service operates strictly on a booking-only framework.</p>
                </div>
              </div>

            </div>

            {/* Micro warning indicator */}
            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200/50 flex gap-3 text-left">
              <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-850 block">High Importance Note</span>
                <p className="text-[11px] text-orange-800 mt-0.5 leading-normal">Smart elegant attire is strictly requested inside the salon floor. Children under twelve years are welcome during private hires only.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Stunning Simulated Map Visualization (7 cols) */}
          <div className="lg:col-span-7 relative h-[440px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex items-center justify-center">
            
            {/* Elegant vector map background using styling */}
            <div className="absolute inset-0 bg-[#EAE5DC] flex flex-col justify-between p-6 opacity-85">
              
              {/* Simulated grid streets */}
              <div className="absolute inset-0 bg-[radial-gradient(#C8A96A_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
              
              {/* Streets network representation using CSS roads */}
              <div className="absolute h-8 w-full bg-white/70 top-1/3 -rotate-[15deg] shadow-sm transform scale-x-125" />
              <div className="absolute h-full w-12 bg-white/70 left-1/3 -rotate-[40deg] shadow-sm transform scale-y-125" />
              <div className="absolute h-10 w-full bg-white/70 bottom-1/4 rotate-[5deg] shadow-sm transform scale-x-125" />
              
              {/* Corso Venezia label marker */}
              <div className="absolute left-[38%] top-[28%] rotate-[-15deg] text-[10px] uppercase tracking-widest font-black text-gray-500 select-none">
                CORSO VENEZIA
              </div>
              <div className="absolute left-[15%] top-[70%] rotate-[5deg] text-[9px] uppercase tracking-widest font-bold text-gray-400 select-none">
                Via San Damiano
              </div>

              {/* Surrounding attractions indicators */}
              <div className="absolute left-6 top-6 rounded bg-[#F3EEE7]/90 px-2 py-0.5 text-[9px] font-semibold text-gray-400 shadow-sm">
                Palazzo Serbelloni
              </div>
              <div className="absolute right-12 bottom-12 rounded bg-[#F3EEE7]/90 px-2 py-0.5 text-[9px] font-semibold text-gray-400 shadow-sm">
                Duomo di Milano (1.2km)
              </div>

              {/* Exact location pinpoint badge */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: [0.9, 1.05, 0.9], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute left-[34%] top-[34%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              >
                {/* Red Pin halo ripple */}
                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping scale-150 opacity-40" />
                
                {/* Visual locator marker */}
                <div className="w-8 h-8 rounded-full bg-[#1A1816] flex items-center justify-center text-white border-2 border-[#C8A96A] shadow-md">
                  <Award className="w-4 h-4 text-[#C8A96A]" />
                </div>
                
                {/* Pin label card */}
                <div className="bg-[#FAF8F5]/95 border border-[#C8A96A] rounded shadow-lg p-2 mt-1.5 w-32 text-center text-[10px]">
                  <p className="font-bold text-gray-900 leading-none">DineEase Milano</p>
                  <p className="text-[9px] text-[#C8A96A] font-semibold mt-0.5">Palazzo Courtyard</p>
                </div>
              </motion.div>

            </div>

            {/* Direct Directions overlay widget */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#FAF8F5]/90 backdrop-blur-md border border-gray-200/50 flex items-center justify-between shadow-lg text-left">
              <div>
                <h4 className="text-xs font-serif font-bold text-[#1A1816]">Transit directions for Milano Central</h4>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">Take Metro M1 (Red Line) to Palestro station. 3-minute walking transit.</p>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-[#556B4F] hover:bg-[#43553E] text-white text-[10px] uppercase tracking-wider font-extrabold rounded shadow-sm transition-colors shrink-0 ml-4 no-underline"
              >
                Launch Maps
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
