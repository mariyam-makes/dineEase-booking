import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInAnonymously,
  updateProfile 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { X, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      console.error("Google Auth failed, trying redirect or showing fallback:", err);
      setError(
        "Google authentication could not open inside the iframe sandboxed browser. Please use the 'Email' or 'Experience as Guest' options below."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (!displayName) {
          setError("Please provide a name.");
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      console.error("Email auth error:", err);
      let errMsg = "Authentication failed. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errMsg = "This email is already in use.";
      } else if (err.code === "auth/invalid-credential") {
        errMsg = "Incorrect email or password.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        errMsg = "Invalid email format.";
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await signInAnonymously(auth);
      await updateProfile(resp.user, { displayName: "Guest Epicurean" });
      onClose();
    } catch (err: any) {
      console.error("Anonymous auth failed:", err);
      setError("Could not complete anonymous guest sign in. Please try email login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1816]/75 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div 
        id="auth-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-md bg-[#FAF8F5] text-[#2D2D2D] rounded-xl overflow-hidden border border-[#C8A96A]/20 shadow-2xl z-10 p-8"
      >
        {/* Close Button */}
        <button 
          id="close-auth-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#F3EEE7] text-gray-500 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <span className="font-serif italic text-sm tracking-widest text-[#C8A96A] block mb-1">DINEEASE</span>
          <h3 className="font-serif text-2xl font-bold text-[#1A1816] tracking-tight">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isSignUp ? "Join our inner circle for premier booking benefits" : "Access your premium table reservations and status"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-600 flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  id="auth-name-input"
                  type="text" 
                  placeholder="Lord Byron"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white border border-[#C8A96A]/20 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96A] lg:focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                id="auth-email-input"
                type="email" 
                placeholder="vip@dineease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#C8A96A]/20 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96A] lg:focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                id="auth-password-input"
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#C8A96A]/20 rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A96A] lg:focus:border-transparent"
              />
            </div>
          </div>

          <button 
            id="auth-submit-btn"
            type="submit" 
            disabled={loading}
            className="w-full bg-[#556B4F] hover:bg-[#43553E] text-white font-medium text-sm py-2.5 px-4 rounded-md shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gray-200"></div>
          <span className="relative bg-[#FAF8F5] px-3 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Or Continue With</span>
        </div>

        {/* Alternatives */}
        <div className="space-y-2">
          {/* Google Button */}
          <button 
            id="auth-google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm py-2 px-4 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.106C18.222 1.924 15.462 1 12.24 1 6.133 1 1.14 5.922 1.14 12s4.993 11 11.1 11c6.381 0 10.605-4.407 10.605-10.792 0-.726-.077-1.282-.175-1.923H12.24z"/>
            </svg>
            Sign In with Google
          </button>

          {/* Guest/Demo Button */}
          <button 
            id="auth-guest-btn"
            onClick={handleAnonymousSignIn}
            disabled={loading}
            className="w-full bg-[#C8A96A]/10 hover:bg-[#C8A96A]/20 border border-[#C8A96A]/40 text-[#8C7646] font-medium text-xs py-2 px-4 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Experience Instantly as Elegant Guest</span>
          </button>
        </div>

        {/* Toggle Mode */}
        <div className="text-center mt-5 text-xs text-gray-500">
          {isSignUp ? "Already have an account?" : "New to DineEase?"}{" "}
          <button 
            id="auth-toggle-mode-btn"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#C8A96A] hover:underline font-semibold focus:outline-none ml-1 cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Register"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
