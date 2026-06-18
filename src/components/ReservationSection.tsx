import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc, setDoc } from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  Calendar as CalIcon, 
  Clock, 
  Users, 
  Compass, 
  CheckCircle, 
  X, 
  ChevronRight, 
  Loader2, 
  AlertTriangle,
  Sparkles,
  MapPin,
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  user: FirebaseUser | null;
  onAuthTrigger: () => void;
  showReservationHistoryFlag: boolean;
  onCloseHistory: () => void;
}

type SeatingType = 'window' | 'chef-counter' | 'garden' | 'standard';

export const ReservationSection: React.FC<ReservationSectionProps> = ({ 
  user, 
  onAuthTrigger,
  showReservationHistoryFlag,
  onCloseHistory
}) => {
  // Form States
  const [guests, setGuests] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('19:00');
  const [seating, setSeating] = useState<SeatingType>('standard');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Quick Anonymous Guest details if not logged in
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  // Execution States
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Reservation | null>(null);
  const [activeBookings, setActiveBookings] = useState<Reservation[]>([]);
  const [fetchingBookings, setFetchingBookings] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Time Slots
  const timeSlots = [
    { value: '17:30', label: '05:30 PM' },
    { value: '18:00', label: '06:00 PM' },
    { value: '18:30', label: '06:30 PM' },
    { value: '19:00', label: '07:00 PM', isPeak: true },
    { value: '19:30', label: '07:30 PM', isPeak: true },
    { value: '20:00', label: '08:00 PM', isPeak: true },
    { value: '20:30', label: '08:30 PM', isPeak: true },
    { value: '21:00', label: '09:00 PM' },
    { value: '21:30', label: '09:30 PM' }
  ];

  // Seating Configurations
  const seatingDetails: Record<SeatingType, { title: string; desc: string; premiumFee: number; iconColor: string }> = {
    'window': {
      title: "Private Window Pavilion",
      desc: "Double-thick acoustic glass overlooking the private Japanese botanic gardens. Perfect for romantic pairings.",
      premiumFee: 15,
      iconColor: "text-amber-500"
    },
    'chef-counter': {
      title: "Chef's Counter Experience",
      desc: "Direct elevated interaction facing Chef Marco Rossi's pass. Multi-sensory seasoning demonstrations included.",
      premiumFee: 25,
      iconColor: "text-emerald-500"
    },
    'garden': {
      title: "Wisteria Outdoor Patio",
      desc: "Dine under mature wisteria vines and fairy lights with passive slate hearth warmers. Romantic seasonal twilight ambiance.",
      premiumFee: 0,
      iconColor: "text-purple-500"
    },
    'standard': {
      title: "Grand Salon Hearth",
      desc: "Surrey oak table frames circling the center open-flame stone oven. Immersive, energetic, and highly vibrant.",
      premiumFee: 0,
      iconColor: "text-[#C8A96A]"
    }
  };

  // Fetch reservations from Firestore
  const fetchUserReservations = async () => {
    if (!user) return;
    setFetchingBookings(true);
    try {
      const q = query(
        collection(db, "reservations"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const bookingsList: Reservation[] = [];
      querySnapshot.forEach((doc) => {
        bookingsList.push({ id: doc.id, ...doc.data() } as Reservation);
      });
      // Sort client side to prevent index generation delays
      bookingsList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setActiveBookings(bookingsList);
    } catch (err) {
      console.error("Error loading user bookings", err);
    } finally {
      setFetchingBookings(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserReservations();
    } else {
      setActiveBookings([]);
    }
  }, [user]);

  // Trigger auto refresh from navbar action
  useEffect(() => {
    if (showReservationHistoryFlag && user) {
      fetchUserReservations();
    }
  }, [showReservationHistoryFlag]);

  // Submit standard Booking to Firestore
  const handleMakeReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorStatus(null);

    // Validate inputs
    const finalUserId = user ? user.uid : "unregistered_guest_" + Math.random().toString(36).substr(2, 9);
    const finalUserName = user ? (user.displayName || "Epicurean Guest") : guestName;
    const finalUserEmail = user ? (user.email || "guest@dineease.com") : guestEmail;

    if (!finalUserName || !finalUserEmail) {
      setErrorStatus("Please log in first or complete the guest credentials fields to finalize booking.");
      setLoading(false);
      return;
    }

    // Assign custom randomized table index based on seating preference
    const assignedTable = Math.floor(Math.random() * 12) + 1;
    const generatedId = "RES-" + Math.floor(100000 + Math.random() * 900000);

    const reservationData: Reservation = {
      id: generatedId,
      userId: finalUserId,
      userName: finalUserName,
      userEmail: finalUserEmail,
      date,
      time,
      guests,
      seatingPreference: seating,
      specialRequests: specialRequests || "",
      tableNumber: assignedTable,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // OPTIMISTIC RENDERING: Load the success screen immediately in 0ms!
    setSuccessBooking(reservationData);
    setIsSuccess(true);
    setSpecialRequests('');

    // Append table to local list instantly so checking history feels instantaneous
    setActiveBookings(prev => [reservationData, ...prev]);
    setLoading(false);

    // Sync state with cloud database in background siliently
    setDoc(doc(db, "reservations", generatedId), {
      userId: reservationData.userId,
      userName: reservationData.userName,
      userEmail: reservationData.userEmail,
      date: reservationData.date,
      time: reservationData.time,
      guests: reservationData.guests,
      seatingPreference: reservationData.seatingPreference,
      specialRequests: reservationData.specialRequests,
      tableNumber: reservationData.tableNumber,
      status: reservationData.status,
      createdAt: reservationData.createdAt
    }).then(() => {
      console.log("Background synchronization completed for reservation:", generatedId);
    }).catch((err) => {
      console.error("Background Firestore sync failed silently:", err);
    });
  };

  // Cancel reservation inside drawer
  const handleCancelReservation = async (bookingId: string) => {
    if (!user) return;
    if (!window.confirm("Are you positive you wish to cancel this premium reservation at DineEase? This will release the table instantly.")) return;
    
    try {
      const reservationDocRef = doc(db, "reservations", bookingId);
      await updateDoc(reservationDocRef, {
        status: 'cancelled'
      });
      // Refresh list
      await fetchUserReservations();
    } catch (err) {
      console.error("Could not update reservation status", err);
      alert("Error canceling reservation. Please retry.");
    }
  };

  return (
    <section id="reservation-section" className="py-24 bg-[#F3EEE7]/30 text-[#2D2D2D] relative scroll-mt-12">
      {/* Absolute reservation list sidebar overlay */}
      <AnimatePresence>
        {showReservationHistoryFlag && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseHistory}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide menu panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                id="bookings-history-sidebar"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#C8A96A]/20 shadow-2xl flex flex-col justify-between"
              >
                {/* Header context */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#556B4F]">
                    <CalendarCheck className="w-5 h-5 text-[#C8A96A]" />
                    <h3 className="font-serif text-lg font-bold text-[#1A1816]">My Reservations History</h3>
                  </div>
                  <button 
                    id="close-history-sidebar-btn"
                    onClick={onCloseHistory}
                    className="p-1 rounded-full hover:bg-[#F3EEE7] text-gray-500 hover:text-gray-900 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main scrollable body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {!user ? (
                    <div className="text-center py-12">
                      <p className="text-xs text-gray-500">You must be logged in to track luxury reservation history.</p>
                      <button
                        id="history-signin-prompt-btn"
                        onClick={() => {
                          onCloseHistory();
                          onAuthTrigger();
                        }}
                        className="mt-4 px-4 py-2 bg-[#556B4F] text-white text-xs uppercase font-bold rounded cursor-pointer"
                      >
                        Sign In Now
                      </button>
                    </div>
                  ) : fetchingBookings ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2">
                      <Loader2 className="w-8 h-8 text-[#C8A96A] animate-spin" />
                      <p className="text-xs text-gray-400">Querying salon floor blueprints...</p>
                    </div>
                  ) : activeBookings.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mx-auto text-gray-300">
                        <Compass className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-gray-500">No historic or active reservations found under your profile.</p>
                      <button
                        id="history-empty-book-table-btn"
                        onClick={onCloseHistory}
                        className="text-xs font-bold text-[#C8A96A] uppercase hover:underline cursor-pointer"
                      >
                        Reserve your first table now
                      </button>
                    </div>
                  ) : (
                    activeBookings.map((b) => (
                      <div 
                        id={`history-row-${b.id}`}
                        key={b.id} 
                        className={`p-4 rounded-xl border border-gray-200/50 bg-white shadow-sm flex flex-col justify-between gap-3 relative ${
                          b.status === 'cancelled' ? "opacity-60 grayscale-[40%]" : ""
                        }`}
                      >
                        {/* Status Label */}
                        <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded ${
                          b.status === 'confirmed' 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                            : "bg-red-50 text-red-500 border border-red-100"
                        }`}>
                          {b.status}
                        </span>

                        <div>
                          <p className="text-[10px] text-gray-400 font-mono">ID: {b.id.substring(0, 8)}</p>
                          <h4 className="font-serif text-sm font-bold text-[#1A1816] mt-1">DineEase Grand Salon Reservation</h4>
                          
                          {/* Details Row */}
                          <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] text-slate-700">
                            <div>
                              <span className="text-gray-400">Date:</span>
                              <p className="font-semibold">{b.date}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Time / Seats:</span>
                              <p className="font-semibold">{b.time} ({b.guests} Guests)</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Seating Preference:</span>
                              <p className="font-semibold capitalize text-[#556B4F]">{b.seatingPreference}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Table assigned:</span>
                              <p className="font-semibold text-gray-800">Table #{b.tableNumber}</p>
                            </div>
                          </div>
                          
                          {b.specialRequests && (
                            <div className="bg-gray-50 rounded p-2 text-[10px] italic text-gray-500 mt-2.5">
                              "{b.specialRequests}"
                            </div>
                          )}
                        </div>

                        {/* Actions column */}
                        {b.status === 'confirmed' && (
                          <button
                            id={`cancel-booking-btn-${b.id}`}
                            onClick={() => handleCancelReservation(b.id)}
                            className="w-full mt-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] uppercase tracking-wider font-extrabold rounded border border-red-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Cancel booking
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer panel info */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 text-[10px] text-gray-400 text-center">
                  Cancellations must be made at least 1 hour of the time frame. For support, call DineEase Concierge at (800) 555-DINE.
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-2 font-normal">Experiential Sync</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1816] tracking-tight">
            Secure Your Culinary Horizon
          </h2>
          <p className="text-xs text-gray-500 mt-2 font-light">
            Interact with our active restaurant floor layout below. Hover or click to specify your coveted dining zone, and watch the desk coordinate your assignment in real-time.
          </p>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto mt-4" />
        </div>

        {/* Success Flow Receipt Layout */}
        <AnimatePresence mode="wait">
          {isSuccess && successBooking ? (
            <motion.div
              id="reservation-success-receipt"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto bg-white border border-[#C8A96A]/30 rounded-2xl shadow-xl overflow-hidden p-8 relative"
            >
              {/* Premium success stamp decoration */}
              <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-black text-[#556B4F] bg-[#556B4F]/5 px-3 py-1 rounded border border-[#556B4F]/30 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#556B4F]" />
                Transaction Authenticated
              </div>

              {/* Receipt Header Brand */}
              <div className="text-center mb-8 border-b border-dashed border-gray-200 pb-6">
                <span className="font-serif italic text-xs tracking-widest text-[#C8A96A] block mb-1">DINEEASE HAUTE RESERVATION</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1816]">Confirmed Table Receipt</h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Receipt ID: {successBooking.id}</p>
              </div>

              {/* Receipt Details rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-gray-100 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Registered Host</span>
                  <p className="text-sm font-semibold text-gray-900">{successBooking.userName}</p>
                  <p className="text-xs text-gray-500">{successBooking.userEmail}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Dining Seating Slot</span>
                  <p className="text-sm font-semibold text-gray-900 capitalize">{successBooking.seatingPreference} View</p>
                  <p className="text-xs text-[#556B4F] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Bespoke Service Included
                  </p>
                </div>

                <div className="space-y-1 pt-3 border-t border-gray-50">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Table Assignment</span>
                  <p className="text-sm font-semibold text-[#1A1816]">Table Number: #{successBooking.tableNumber}</p>
                  <p className="text-[10px] text-gray-500">Identified on the east corridor entry-point.</p>
                </div>

                <div className="space-y-1 pt-3 border-t border-gray-50">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Scheduled Date & Time</span>
                  <p className="text-sm font-semibold text-gray-900">{successBooking.date}</p>
                  <p className="text-xs text-gray-500">Arrival window: {successBooking.time} PM</p>
                </div>
              </div>

              {successBooking.specialRequests && (
                <div className="my-6 bg-[#FAF8F5] border border-gray-100 rounded-lg p-4 text-xs italic text-gray-600 text-left">
                  <span className="not-italic text-[9px] uppercase font-bold tracking-wider text-[#C8A96A] block mb-1">Special Concierge Requests</span>
                  "{successBooking.specialRequests}"
                </div>
              )}

              {/* Map/Travel notes card */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl flex items-start gap-3 border border-gray-100 text-left">
                <MapPin className="w-5 h-5 text-[#C8A96A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Arrival Instructions</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Please present this digital confirmation upon arriving at 12 Corso Venezia, Milan. Your table assignment is locked for twenty minutes past your reservation slot.</p>
                </div>
              </div>

              {/* Buttons to close or manage */}
              <div className="mt-8 flex gap-3 text-sm justify-between">
                <button
                  id="receipt-history-trigger-btn"
                  onClick={() => {
                    setIsSuccess(false);
                    // Open the history drawer
                    if (user) {
                      setTimeout(() => {
                        fetchUserReservations();
                      }, 100);
                    }
                  }}
                  className="px-4 py-2 border border-[#C8A96A]/20 text-[#C8A96A] font-bold text-xs uppercase tracking-wider rounded-md hover:bg-[#F3EEE7] cursor-pointer"
                >
                  My bookings history
                </button>
                <button
                  id="receipt-order-again-btn"
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-[#556B4F] hover:bg-[#43553E] text-white font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer"
                >
                  Book another Table
                </button>
              </div>
            </motion.div>
          ) : (
            
            /* Core Interactive Seating & Form Split Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-8 text-left">
              
              {/* Left Side: Dynamic SVG Room Map & Seating description (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                {/* SVG Seating Chart */}
                <div className="bg-white rounded-2xl border border-[#C8A96A]/10 shadow p-6 relative flex flex-col items-center">
                  <h3 className="font-serif text-sm font-bold text-[#1A1816] tracking-wide mb-4 self-start">Interactive Salon Floor Blueprint</h3>
                  
                  {/* SVG Room Representation */}
                  <svg 
                    id="floorplan-map-svg"
                    viewBox="0 0 500 320" 
                    className="w-full max-w-lg aspect-[5/3.2] text-[#2D2D2D]"
                  >
                    {/* Floor Area Background */}
                    <rect x="10" y="10" width="480" height="300" rx="15" fill="#FAF8F5" stroke="#EAE5DC" strokeWidth="2" />
                    
                    {/* Entrance Marker */}
                    <path d="M 230 10 L 270 10" stroke="#C8A96A" strokeWidth="4" />
                    <text x="250" y="24" className="text-[9px] font-mono font-bold" fill="#C8A96A" textAnchor="middle">ENTRANCE</text>

                    {/* Zone 1: Window View (Top left corridor) */}
                    <g 
                      id="svg-zone-window"
                      onClick={() => setSeating('window')}
                      className={`cursor-pointer transition-all ${
                        seating === 'window' ? "opacity-100" : "opacity-60 hover:opacity-85"
                      }`}
                    >
                      <rect x="25" y="35" width="140" height="100" rx="8" fill={seating === 'window' ? '#556B4F' : '#E6E1D8'} stroke="#C8A96A" strokeWidth={seating === 'window' ? '2' : '0.5'} />
                      <text x="95" y="75" fill={seating === 'window' ? '#FAF8F5' : '#2D2D2D'} className="text-[10px] font-bold" textAnchor="middle">WINDOW VIEW</text>
                      <text x="95" y="90" fill={seating === 'window' ? '#C8A96A' : '#777777'} className="text-[8px] font-mono italic" textAnchor="middle">Glass Panorama</text>
                      {/* Dining Tables mockup circles */}
                      <circle cx="55" cy="110" r="8" fill="#FAF8F5" stroke="#C8A96A" />
                      <circle cx="95" cy="110" r="8" fill="#FAF8F5" stroke="#C8A96A" />
                      <circle cx="135" cy="110" r="8" fill="#FAF8F5" stroke="#C8A96A" />
                    </g>

                    {/* Zone 2: Chef's Counter (Bottom right near prep kitchen) */}
                    <g 
                      id="svg-zone-chef-counter"
                      onClick={() => setSeating('chef-counter')}
                      className={`cursor-pointer transition-all ${
                        seating === 'chef-counter' ? "opacity-100" : "opacity-60 hover:opacity-85"
                      }`}
                    >
                      <rect x="285" y="165" width="190" height="120" rx="8" fill={seating === 'chef-counter' ? '#556B4F' : '#E6E1D8'} stroke="#C8A96A" strokeWidth={seating === 'chef-counter' ? '2' : '0.5'} />
                      <text x="380" y="200" fill={seating === 'chef-counter' ? '#FAF8F5' : '#2D2D2D'} className="text-[10px] font-bold" textAnchor="middle">CHEF'S COUTNER</text>
                      <text x="380" y="215" fill={seating === 'chef-counter' ? '#C8A96A' : '#777777'} className="text-[8px] font-mono italic" textAnchor="middle">Interactive Pass</text>
                      {/* Counter line stool seats */}
                      <line x1="310" y1="260" x2="450" y2="260" stroke="#C8A96A" strokeWidth="4" />
                      <circle cx="330" cy="245" r="5" fill="#FAF8F5" />
                      <circle cx="360" cy="245" r="5" fill="#FAF8F5" />
                      <circle cx="390" cy="245" r="5" fill="#FAF8F5" />
                      <circle cx="420" cy="245" r="5" fill="#FAF8F5" />
                    </g>

                    {/* Zone 3: Garden Patio (Bottom Left corner) */}
                    <g 
                      id="svg-zone-garden"
                      onClick={() => setSeating('garden')}
                      className={`cursor-pointer transition-all ${
                        seating === 'garden' ? "opacity-100" : "opacity-60 hover:opacity-85"
                      }`}
                    >
                      <rect x="25" y="165" width="220" height="120" rx="8" fill={seating === 'garden' ? '#556B4F' : '#E6E1D8'} stroke="#C8A96A" strokeWidth={seating === 'garden' ? '2' : '0.5'} />
                      <text x="135" y="205" fill={seating === 'garden' ? '#FAF8F5' : '#2D2D2D'} className="text-[10px] font-bold" textAnchor="middle">GARDEN PATIO</text>
                      <text x="135" y="220" fill={seating === 'garden' ? '#C8A96A' : '#777777'} className="text-[8px] font-mono italic" textAnchor="middle">Wisteria Pergola</text>
                      <circle cx="65" cy="250" r="12" fill="#FAF8F5" stroke="#C8A96A" />
                      <circle cx="135" cy="250" r="12" fill="#FAF8F5" stroke="#C8A96A" />
                      <circle cx="205" cy="250" r="12" fill="#FAF8F5" stroke="#C8A96A" />
                    </g>

                    {/* Zone 4: Standard Salon (Center Top right) */}
                    <g 
                      id="svg-zone-salon"
                      onClick={() => setSeating('standard')}
                      className={`cursor-pointer transition-all ${
                        seating === 'standard' ? "opacity-100" : "opacity-60 hover:opacity-85"
                      }`}
                    >
                      <rect x="205" y="35" width="270" height="100" rx="8" fill={seating === 'standard' ? '#556B4F' : '#E6E1D8'} stroke="#C8A96A" strokeWidth={seating === 'standard' ? '2' : '0.5'} />
                      <text x="340" y="75" fill={seating === 'standard' ? '#FAF8F5' : '#2D2D2D'} className="text-[10px] font-bold" textAnchor="middle">GRAND SALON HEARTH</text>
                      <text x="340" y="90" fill={seating === 'standard' ? '#C8A96A' : '#777777'} className="text-[8px] font-mono italic" textAnchor="middle">Centerstone Brick Hearth</text>
                      <circle cx="250" cy="110" r="10" fill="#FAF8F5" stroke="gray" />
                      <circle cx="340" cy="110" r="10" fill="#FAF8F5" stroke="gray" />
                      <circle cx="430" cy="110" r="10" fill="#FAF8F5" stroke="gray" />
                    </g>
                  </svg>
                  <span className="text-[10px] text-gray-400 mt-4">*Select directly inside the graphical floorplan of DineEase to lock your seating area.</span>
                </div>

                {/* Seating detailed description Card */}
                <div className="bg-[#FAF8F5] border border-[#C8A96A]/20 rounded-2xl p-5 shadow-sm text-left">
                  <div className="flex items-start gap-4">
                    <Compass className="w-8 h-8 text-[#C8A96A] shrink-0" />
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#1A1816]">
                        {seatingDetails[seating].title} Selection
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-light mt-1.5">
                        {seatingDetails[seating].desc}
                      </p>
                      
                      {seatingDetails[seating].premiumFee > 0 ? (
                        <div className="inline-flex items-center gap-1.5 mt-3 py-1 px-2 rounded bg-[#C8A96A]/10 text-[#8C7646] font-bold text-[10px] uppercase">
                          <span>Premium Lounge Fee: +${seatingDetails[seating].premiumFee}</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 mt-3 py-1 px-2 rounded bg-[#556B4F]/10 text-[#43553E] font-bold text-[10px] uppercase">
                          <span>No Premium Lounge Surcharge</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Side: Reservation Booking Form (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-[#C8A96A]/15 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1816]">Seating Reservation Desk</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Define your parameters below to lock the table assignment.</p>
                  
                  {errorStatus && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-red-600 mt-4">
                      {errorStatus}
                    </div>
                  )}

                  <form onSubmit={handleMakeReservation} className="space-y-4 mt-6">
                    {/* User Identity Banner or Inputs */}
                    {user ? (
                      <div className="bg-[#F3EEE7]/40 border border-[#C8A96A]/20 rounded-lg p-3 text-xs flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-400">Authenticated Host</span>
                          <p className="font-semibold text-gray-800">{user.displayName || "Epicurean member"}</p>
                          <p className="text-[10px] text-gray-500 truncate max-w-[200px]">{user.email || "No email linked"}</p>
                        </div>
                        <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 font-extrabold uppercase px-1.5 py-0.5 rounded leading-none">VIP Verified</span>
                      </div>
                    ) : (
                      /* Anonymous reservation input fields */
                      <div className="space-y-3">
                        <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-3 text-[11px] text-amber-700">
                          To bind reservations with a profile and view active bookings anytime, we highly recommend <button type="button" onClick={onAuthTrigger} className="underline font-bold text-amber-800 focus:outline-none hover:text-amber-900 cursor-pointer">Signing In</button>. Or book instantly below:
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Host First & Last Name</label>
                          <input 
                            id="reserve-guest-name-input"
                            type="text" 
                            placeholder="Countess of Florence"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A96A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Notify Email Address</label>
                          <input 
                            id="reserve-guest-email-input"
                            type="email" 
                            placeholder="countess@milano.it"
                            required
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A96A]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Row 1: Date & Guests */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Guests Count</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <select
                            id="reserve-guests-select"
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A96A] appearance-none"
                          >
                            <option value={1}>1 Guest</option>
                            <option value={2}>2 Guests</option>
                            <option value={3}>3 Guests</option>
                            <option value={4}>4 Guests</option>
                            <option value={5}>5 Guests</option>
                            <option value={6}>6 Guests (Concierge verified)</option>
                            <option value={8}>8 Guests (Concierge verified)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Reserve Date</label>
                        <div className="relative">
                          <CalIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                          <input 
                            id="reserve-date-input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A96A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Time Slots Select wrapper */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Dinner Arrival Slot</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            id={`time-slot-pill-${slot.value}`}
                            type="button"
                            key={slot.value}
                            onClick={() => setTime(slot.value)}
                            className={`py-1.5 px-1 text-center rounded text-xs transition-all border cursor-pointer flex flex-col items-center justify-center ${
                              time === slot.value
                                ? "bg-[#556B4F] text-white border-transparent"
                                : "bg-white border-gray-200 text-gray-700 hover:border-[#C8A96A]"
                            }`}
                          >
                            <span className="font-semibold">{slot.label}</span>
                            {slot.isPeak && (
                              <span className={`text-[7px] uppercase font-bold ${time === slot.value ? 'text-[#C8A96A]' : 'text-amber-500'}`}>High Peak</span>
                            )}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-gray-400">
                        <Clock className="w-3 h-3 text-[#C8A96A]" />
                        <span>Peak slots represent high-density times. Table assignment will be strictly bound.</span>
                      </div>
                    </div>

                    {/* Row 3: Special Requests block */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Special Requests or Dietaries</label>
                      <textarea
                        id="reserve-requests-textarea"
                        placeholder="Please signify if you hold food constraints (such as truffle intolerance or nuts) or are celebrating a high-importance anniversary."
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8A96A]"
                      />
                    </div>

                    {/* Book action CTA */}
                    <button
                      id="submit-reserve-form-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#556B4F] hover:bg-[#43553E] disabled:bg-gray-400 text-white font-serif uppercase tracking-widest font-black text-xs min-h-[46px] rounded shadow hover:shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Syncing with Floor Blueprint...</span>
                        </>
                      ) : (
                        <span>Publish Table Reservation</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Footer notes */}
                <div className="border-t border-gray-100/60 pt-4 mt-6 text-[10px] text-gray-400 leading-relaxed font-light">
                  Need to cancel or adjust? You can view and manage your reservation status at any point by triggering the <strong>My Reservations History</strong> panel. Your booking is bound to our policy guidelines.
                </div>
              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
