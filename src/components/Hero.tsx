import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Calendar, Compass, Clock, Award, Star } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update clock in dynamic real-time (UTC style or local elegant format)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Tracking mouse over hero for the delicate parallax glass-plate/cloche effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section 
      id="hero-section"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#FAF8F5] flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image with Natural Daylight & Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80" 
          alt="DineEase Fine Dining Sunlit Restaurant"
          className="w-full h-full object-cover brightness-[0.72] saturation-[1.05]"
        />
        {/* Soft elegant radial gradient for lighting depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1816]/80 via-[#1A1816]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent h-40 bottom-0" />
      </div>

      {/* Floating Ambient Particles / Luxury Daylight Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        <motion.div 
          animate={{ x: mousePosition.x * -10, y: mousePosition.y * -10 }}
          className="absolute -top-10 left-10 w-96 h-96 rounded-full bg-[#C8A96A]/5 blur-3xl"
        />
        <motion.div 
          animate={{ x: mousePosition.x * 15, y: mousePosition.y * 15 }}
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#8FA68E]/5 blur-3xl"
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        {/* Left: Text Content & Reservation CTA */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-left text-white"
        >
          {/* Subheader Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C8A96A] text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
            <Award className="w-3.5 h-3.5" />
            <span>Michelin Recommended 2026</span>
          </div>

          {/* Premium Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF8F5] tracking-tight leading-tight mb-4">
            Where Craftsmanship <br />
            <span className="text-[#C8A96A] italic font-normal">Meets Celebration</span>
          </h1>

          {/* Luxury Subhead */}
          <p className="text-sm sm:text-base text-[#F3EEE7]/90 max-w-xl font-light leading-relaxed mb-8">
            Step into DineEase. Experience contemporary fine dining animated by local heirloom ingredients, legendary hospitality, and effortless table synchronization.
          </p>

          {/* Micro stats inside banner */}
          <div className="grid grid-cols-3 gap-6 py-4 px-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 w-full max-w-lg mb-8 text-left">
            <div>
              <span className="block text-[#C8A96A] font-serif text-lg font-bold">3 Star</span>
              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">Michelin Guide</span>
            </div>
            <div>
              <span className="block text-[#C8A96A] font-serif text-lg font-bold">98%</span>
              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">Satisfied Guests</span>
            </div>
            <div>
              <span className="block text-[#C8A96A] font-serif text-lg font-bold">{currentTime || "08:00 PM"}</span>
              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-semibold mt-0.5">Salon Clock (GMT)</span>
            </div>
          </div>

          {/* Buttons Panel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button 
              id="hero-reserve-cta"
              onClick={onBookClick}
              className="px-8 py-4 bg-[#C8A96A] hover:bg-[#B39352] text-white font-bold text-xs uppercase tracking-widest rounded-md shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              Reserve Experience
            </button>
            <button 
              id="hero-discover-menu-cta"
              onClick={() => {
                const el = document.getElementById('interactive-menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/30 hover:border-white font-bold text-xs uppercase tracking-widest rounded-md transition-all backdrop-blur-md cursor-pointer text-center"
            >
              Discover Menu
            </button>
          </div>
        </motion.div>

        {/* Right: Interactive 3D Mock Cloche Plate */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="lg:col-span-5 hidden lg:flex items-center justify-center relative p-4"
        >
          {/* Active interactive plate overlay wrapper */}
          <motion.div 
            style={{ 
              rotateY: mousePosition.x * 30, // 3D Rotations
              rotateX: mousePosition.y * -30,
              perspective: 1000 
            }}
            className="relative w-80 h-80 rounded-full border-2 border-white/10 shadow-2xl bg-gradient-to-tr from-white/5 to-white/20 p-2 flex items-center justify-center backdrop-blur-md"
          >
            {/* Ambient Rotational Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="absolute inset-[10px] rounded-full border border-[#C8A96A]/20 border-dashed"
            />

            {/* Simulated Glass Cloche Cover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 to-[#FAF8F5]/0 pointer-events-none border border-white/25 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Highlight flare */}
              <div className="absolute top-4 left-1/4 w-28 h-6 bg-white/30 rounded-full rotate-[-15deg] filter blur-[1px]" />
              {/* Inner ambient shine */}
              <div className="absolute bottom-12 right-12 w-12 h-12 bg-white/10 rounded-full filter blur-md" />
            </div>

            {/* Inner centerpiece: A masterfully detailed plated dish (image representation inside cloche) */}
            <div className="w-56 h-56 rounded-full overflow-hidden bg-white/10 border border-[#C8A96A]/30 relative shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" 
                alt="Plated Gastronomy"
                className="w-full h-full object-cover scale-110 saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-[#1A1816]/10" />
            </div>

            {/* Small Elegant Badge */}
            <div className="absolute bottom-2 bg-[#1A1816]/90 border border-[#C8A96A]/40 rounded px-3 py-1 shadow-lg text-[8px] uppercase tracking-[0.2em] font-bold text-[#C8A96A]">
              Chef's Table Selected
            </div>
          </motion.div>

          {/* Delicate indicators around plate */}
          <div className="absolute top-4 right-1/4 bg-[#FAF8F5]/90 text-[#2D2D2D] text-[9px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-full border border-gray-200/50 flex items-center gap-1 shadow-md">
            <Compass className="w-3 h-3 text-[#C8A96A]" />
            <span>Interactive Cloche</span>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Bar / Ribbon */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/60 to-transparent pointer-events-none z-10" />
    </section>
  );
};
