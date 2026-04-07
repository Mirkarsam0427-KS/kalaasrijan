import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Loader2, Facebook, Linkedin } from 'lucide-react';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const FORMSPREE_URL = "https://formspree.io/f/xdapydbz"; 

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!mounted) return null;

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center relative p-4 md:p-8 overflow-hidden bg-[#F5E6D3]">
      {/* Animated Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Warm Beige Overlay to ensure text readability while keeping the theme */}
      <div className="absolute inset-0 bg-[#F5E6D3]/80 z-0 backdrop-blur-[2px]"></div>

      {/* Main Content - Centered */}
      <main className="z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl flex-1 mt-8 md:mt-0">
        {/* Logo */}
        <motion.img 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          src="https://i.ibb.co/fG2JRcyz/GUIDLINES-LOGO-GRID.png" 
          alt="Kalaasrijan Logo" 
          className="h-16 md:h-24 lg:h-28 w-auto object-contain opacity-90 mb-6 md:mb-8"
          style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(50%) saturate(3000%) hue-rotate(340deg) brightness(90%) contrast(90%)' }}
          referrerPolicy="no-referrer"
        />

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-playfair text-5xl md:text-7xl lg:text-[5.5rem] leading-tight font-bold tracking-tight text-[#1C1C1C] mb-6 md:mb-8"
        >
          We Are Coming Soon
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-playfair italic text-[#1C1C1C]/80 text-xs md:text-sm lg:text-base font-medium mb-6 md:mb-8 max-w-2xl leading-relaxed px-4"
        >
          Our Website is Under Construction. We'll be here Soon with our New Awesome Site, Subscribe to be Notified.
        </motion.p>

        {/* Subscribe Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="w-full max-w-md relative px-4 md:px-0"
        >
          {status === 'success' ? (
            <div className="bg-[#5A1F1F]/10 border border-[#5A1F1F]/20 rounded-full py-3 md:py-4 px-6 text-[#5A1F1F] font-semibold text-sm text-center">
              Thank you! We will notify you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex items-center w-full">
              <Mail className="absolute left-4 md:left-6 text-[#1C1C1C]/50" size={18} strokeWidth={1.5} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                placeholder="Enter your email address" 
                className="w-full bg-white/40 border border-[#1C1C1C]/20 rounded-full py-3 md:py-4 pl-12 md:pl-14 pr-32 md:pr-36 text-[#1C1C1C] placeholder:text-[#1C1C1C]/50 focus:outline-none focus:border-[#5A1F1F] focus:bg-white/60 transition-all font-medium text-xs md:text-sm shadow-sm disabled:opacity-70"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 bg-[#5A1F1F] text-[#F5E6D3] px-4 md:px-8 rounded-full font-semibold uppercase text-[10px] md:text-xs tracking-wider hover:bg-[#1C1C1C] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[90px] md:min-w-[110px]"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : 'Notify Me'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-xs mt-2 text-center font-medium">Something went wrong. Please try again.</p>
          )}
        </motion.div>

        {/* WhatsApp Minimal Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-4 md:mt-5"
        >
          <a 
            href="https://wa.me/919503374006" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#5A1F1F]/30 text-[#5A1F1F] font-medium text-[10px] md:text-xs hover:bg-[#5A1F1F] hover:text-[#F5E6D3] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="fill-current stroke-none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat with us
          </a>
        </motion.div>

        {/* Social Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 md:mt-10 flex flex-col items-center gap-3"
        >
          <span className="text-[#1C1C1C]/60 text-[10px] md:text-xs font-semibold uppercase tracking-widest">Share</span>
          <div className="flex items-center gap-4">
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Check out Kalaasrijan! They are coming soon.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#1C1C1C]/20 text-[#1C1C1C]/70 hover:bg-[#1C1C1C] hover:text-[#F5E6D3] hover:border-[#1C1C1C] transition-all duration-300 flex items-center justify-center w-[34px] h-[34px]"
              aria-label="Share on X (Twitter)"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="stroke-none">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#1C1C1C]/20 text-[#1C1C1C]/70 hover:bg-[#1C1C1C] hover:text-[#F5E6D3] hover:border-[#1C1C1C] transition-all duration-300 flex items-center justify-center w-[34px] h-[34px]"
              aria-label="Share on Facebook"
            >
              <Facebook size={16} strokeWidth={1.5} />
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent("Kalaasrijan - Coming Soon")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-[#1C1C1C]/20 text-[#1C1C1C]/70 hover:bg-[#1C1C1C] hover:text-[#F5E6D3] hover:border-[#1C1C1C] transition-all duration-300 flex items-center justify-center w-[34px] h-[34px]"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={16} strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="z-10 w-full text-center text-[#1C1C1C]/50 text-[10px] md:text-xs tracking-wide pb-2 font-medium"
      >
        © {new Date().getFullYear()} Kalaasrijan. All rights reserved.
      </motion.footer>

    </div>
  );
}
