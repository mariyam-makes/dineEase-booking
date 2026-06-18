import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SignatureDishes } from './components/SignatureDishes';
import { Menu } from './components/Menu';
import { ChefSection } from './components/ChefSection';
import { Reviews } from './components/Reviews';
import { ReservationSection } from './components/ReservationSection';
import { Contact } from './components/Contact';
import { AuthModal } from './components/AuthModal';
import { Award, Compass, Heart, Instagram, Mail, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  // Subscribe to real-time Firebase Auth status changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for the fixed floating navbar
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenMyReservations = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setShowHistoryDrawer(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2D2D] font-sans antialiased text-left selection:bg-[#C8A96A] selection:text-white">
      
      {/* Floating Header Navbar */}
      <Navbar 
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenMyReservations={handleOpenMyReservations}
      />

      {/* Main Luxury Content flow */}
      <main>
        {/* Dynamic Hero banner */}
        <Hero onBookClick={() => handleScrollToSection('reservation-section')} />

        {/* Vintage Culinary Heritage */}
        <About />

        {/* Signature Showcases */}
        <SignatureDishes onOrderClick={() => handleScrollToSection('interactive-menu')} />

        {/* Dynamic filterable Menu catalog */}
        <Menu onReserveClick={() => handleScrollToSection('reservation-section')} />

        {/* Executive Chef portrait section */}
        <ChefSection />

        {/* Testimonials Carousel */}
        <Reviews />

        {/* Floorplan Seating Organizer and Database Form */}
        <ReservationSection 
          user={user}
          onAuthTrigger={() => setIsAuthModalOpen(true)}
          showReservationHistoryFlag={showHistoryDrawer}
          onCloseHistory={() => setShowHistoryDrawer(false)}
        />

        {/* Location & Opening coordinates */}
        <Contact />
      </main>

      {/* Luxury Hospitality Footer */}
      <footer id="dine-ease-premium-footer" className="bg-[#1A1816] text-[#FAF8F5]/80 pt-20 pb-10 border-t border-[#C8A96A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left pb-16 border-b border-white/5">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <span className="font-serif text-2xl font-black text-white tracking-widest leading-none">
                Dine<span className="text-[#C8A96A] font-light">Ease</span>
              </span>
              <p className="text-[11px] leading-relaxed text-gray-400 font-light pt-2">
                Experiential contemporary dining built upon heirloom elements, vintage collections, and effortless reservation synchronization. Designed for culinary epicureans.
              </p>
              <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/5 border border-white/10 text-[#C8A96A] text-[9px] uppercase tracking-widest font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>3 Michelin Stars Recognized</span>
              </div>
            </div>

            {/* Column 2: Navigation shortcuts */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A96A] font-bold">Navigate</h4>
              <ul className="space-y-2 text-xs font-light text-gray-300">
                <li><button onClick={() => handleScrollToSection('hero-section')} className="hover:text-[#C8A96A] transition-colors cursor-pointer">Top</button></li>
                <li><button onClick={() => handleScrollToSection('heritage')} className="hover:text-[#C8A96A] transition-colors cursor-pointer">Heritage Selection</button></li>
                <li><button onClick={() => handleScrollToSection('signature-dishes')} className="hover:text-[#C8A96A] transition-colors cursor-pointer">Signature Plates</button></li>
                <li><button onClick={() => handleScrollToSection('interactive-menu')} className="hover:text-[#C8A96A] transition-colors cursor-pointer">Interactive Catalog</button></li>
                <li><button onClick={() => handleScrollToSection('reservation-section')} className="hover:text-[#C8A96A] transition-colors cursor-pointer">Floorplan Seat Planner</button></li>
              </ul>
            </div>

            {/* Column 3: Social & Press mentions */}
            <div className="space-y-4 col-span-1">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A96A] font-bold">Press & Socials</h4>
              <p className="text-[11px] text-gray-400 font-light">Join our circles on digital journals to preview monthly chef events or secret tasting series.</p>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/15 rounded-full text-[#C8A96A] transition-colors shadow">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://google.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-white/15 rounded-full text-[#C8A96A] transition-colors shadow">
                  <Compass className="w-4 h-4" />
                </a>
                <a href="mailto:guest@dineease.com" className="p-2 bg-white/5 hover:bg-white/15 rounded-full text-[#C8A96A] transition-colors shadow">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#C8A96A] font-bold">The Epicurean Bulletin</h4>
              <p className="text-[11px] text-gray-400 font-light">Submit your mail coordinates for invitation-only seasonal menu launches or vineyard partnerships.</p>
              
              <div className="flex items-stretch gap-1">
                <input 
                  type="email" 
                  placeholder="epicurean@milano.it" 
                  className="bg-white/5 border border-white/15 rounded px-2.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none w-full"
                />
                <button 
                  onClick={() => alert("Welcome to the inner circle.")}
                  className="bg-[#C8A96A] hover:bg-[#B39352] text-white px-3 py-1.5 text-[10px] uppercase font-bold rounded cursor-pointer shrink-0 transition-colors"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 text-[10px] text-gray-500 font-light">
            <p>© 2026 DineEase S.p.A. All rights reserved. Registered under Lombardy Culinary Association.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-[#C8A96A] cursor-pointer">Terms & Attire Code</span>
              <span className="hover:text-[#C8A96A] cursor-pointer">Privacy Blueprint</span>
              <span className="hover:text-[#C8A96A] cursor-pointer">Affiliations</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Real-time Authentication Dialog Popup */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
