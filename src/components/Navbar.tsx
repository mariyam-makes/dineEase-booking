import React, { useState, useEffect } from 'react';
import { User, LogOut, Calendar, Menu as MenuIcon, X } from 'lucide-react';
import { User as FirebaseUser, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: FirebaseUser | null;
  onAuthClick: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenMyReservations: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onAuthClick, 
  onScrollToSection,
  onOpenMyReservations
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsUserDropdownOpen(false);
    } catch (err) {
      console.error("Sign out error", err);
    }
  };

  const navLinks = [
    { label: "Heritage", id: "heritage" },
    { label: "Signature Dishes", id: "signature-dishes" },
    { label: "Interactive Menu", id: "interactive-menu" },
    { label: "Our Story", id: "our-story" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Find Us", id: "find-us" }
  ];

  return (
    <nav 
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#FAF8F5]/85 backdrop-blur-md shadow-sm border-b border-[#C8A96A]/10 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Brand */}
          <div 
            id="brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col cursor-pointer shrink-0"
          >
            <span className={`font-serif text-2xl font-black tracking-widest leading-none transition-colors duration-300 ${
              isScrolled ? "text-[#8C7646]" : "text-[#C8A96A]"
            }`}>
              Dine<span className="text-[#C8A96A] font-light">Ease</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#C8A96A] font-bold mt-0.5">
              Haute Cuisine
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="text-xs uppercase tracking-widest font-semibold text-[#2D2D2D]/85 hover:text-[#C8A96A] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions Column */}
          <div className="hidden lg:flex items-center gap-4">
            {/* User Auth Info */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-trigger"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[#F3EEE7] transition-all cursor-pointer text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-[#556B4F] text-[#FAF8F5] flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user.displayName ? user.displayName.charAt(0) : "U"}
                  </div>
                  <span className="text-xs font-semibold text-[#2D2D2D] max-w-[100px] truncate">
                    {user.displayName || "Epicurean"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      id="navbar-user-dropdown"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 rounded-md bg-white border border-[#C8A96A]/20 shadow-lg py-1 z-50 text-[#2D2D2D]"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Authenticated as</p>
                        <p className="text-xs font-semibold text-[#1A1816] truncate mt-0.5">{user.displayName || "Valued Associate"}</p>
                        <p className="text-[10px] text-gray-500 truncate mt-px">{user.email || "Anonymous Guest Account"}</p>
                      </div>

                      <button
                        id="user-menu-my-bookings-btn"
                        onClick={() => {
                          onOpenMyReservations();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#F3EEE7] flex items-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-[#C8A96A]" />
                        My Reservations History
                      </button>

                      <button
                        id="user-menu-signout-btn"
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-[#F3EEE7] flex items-center gap-2 cursor-pointer border-t border-gray-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out Account
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                id="navbar-signin-btn"
                onClick={onAuthClick}
                className="text-xs uppercase tracking-widest font-bold text-[#556B4F] hover:text-[#C8A96A] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}

            {/* Quick RSVP CTA */}
            <button
              id="navbar-book-table-cta"
              onClick={() => onScrollToSection('reservation-section')}
              className="bg-[#556B4F] hover:bg-[#43553E] text-white text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <button
                id="mobile-user-bookings-indicator"
                onClick={onOpenMyReservations}
                className="p-2 rounded-full hover:bg-gray-100 text-[#556B4F]"
                title="My Reservations"
              >
                <Calendar className="w-5 h-5" />
              </button>
            )}
            <button
              id="mobile-navbar-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-[#F3EEE7] text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navbar-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF8F5] border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <button
                  id={`mobile-nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onScrollToSection(link.id);
                  }}
                  className="block w-full text-left py-3 px-4 text-xs uppercase tracking-widest font-bold text-[#2D2D2D] hover:bg-[#F3EEE7] rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-200/60 pb-2 flex flex-col gap-3 px-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#556B4F] text-[#FAF8F5] flex items-center justify-center font-bold text-xs uppercase">
                        {user.displayName ? user.displayName.charAt(0) : "U"}
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-gray-800">{user.displayName || "Epicurean"}</p>
                        <p className="text-[10px] text-gray-400">{user.email || "Guest Member"}</p>
                      </div>
                    </div>
                    <button
                      id="mobile-menu-my-bookings-btn-link"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenMyReservations();
                      }}
                      className="w-full text-left py-2 text-xs text-slate-700 flex items-center gap-2 font-medium"
                    >
                      <Calendar className="w-4 h-4 text-[#C8A96A]" />
                      My Reservations History
                    </button>
                    <button
                      id="mobile-menu-signout-btn-link"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full text-left py-2 text-xs text-red-600 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out Account
                    </button>
                  </div>
                ) : (
                  <button
                    id="mobile-menu-signin-btn"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onAuthClick();
                    }}
                    className="w-full py-2.5 bg-transparent border border-[#556B4F] text-[#556B4F] rounded-md text-xs uppercase tracking-widest font-bold text-center"
                  >
                    Sign In
                  </button>
                )}

                <button
                  id="mobile-menu-book-table-cta"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onScrollToSection('reservation-section');
                  }}
                  className="w-full py-2.5 bg-[#556B4F] hover:bg-[#43553E] text-white rounded-md text-xs uppercase tracking-widest font-bold text-center"
                >
                  Book a Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
