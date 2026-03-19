import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import wordmarkWhiteGold from "@/assets/wordmark-white-gold.png";
import wordmarkNavyGold from "@/assets/wordmark-navy-gold.png";
import CartDrawer from "@/components/CartDrawer";

const learnLinks = [
  { label: "Science", href: "/science" },
  { label: "Our Story", href: "/our-story" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const location = useLocation();
  const isHeroPage = location.pathname === "/";
  const learnRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const linkClass = `text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${isHeroPage ? "text-primary-foreground/80" : "text-foreground/70"} hover:text-gold`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-gradient-gold text-primary text-center py-1.5 lg:py-2 text-[10px] lg:text-xs font-semibold tracking-widest uppercase px-2">
        Free Shipping on All US Orders
      </div>

      <nav className={`transition-colors duration-300 ${isHeroPage ? "bg-navy/90 backdrop-blur-md" : "bg-card/95 backdrop-blur-md border-b border-border"}`}>
        <div className="container mx-auto flex items-center py-3 lg:py-4 px-4 lg:px-8">
          {/* Left: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            <Link to="/shop" className={linkClass}>Shop</Link>
            <a href="https://www.amazon.com/dp/B0DQXPDN4N?keywords=healthy+energy+drink" target="_blank" rel="noopener noreferrer" className={linkClass}>Amazon</a>
            {/* Learn dropdown */}
            <div ref={learnRef} className="relative">
              <button
                onClick={() => setLearnOpen(!learnOpen)}
                className={`${linkClass} flex items-center gap-1`}
              >
                Learn
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${learnOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {learnOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-3 w-44 bg-card rounded-lg border border-border shadow-elevated py-2 z-50"
                  >
                    {learnLinks.map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        className="block px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-gold hover:bg-secondary/50 transition-colors"
                        onClick={() => setLearnOpen(false)}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="flex-shrink-0 mx-auto md:mx-0 h-8 lg:h-10 overflow-hidden flex items-center">
            <img
              src={isHeroPage ? wordmarkWhiteGold : wordmarkNavyGold}
              alt="ELITE Energy"
              className="h-20 lg:h-28 w-auto max-w-none"
            />
          </Link>

          {/* Right: Cart + CTA */}
          <div className="hidden md:flex items-center gap-5 flex-1 justify-end">
            <div className={isHeroPage ? "text-primary-foreground" : "text-foreground"}>
              <CartDrawer />
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary font-bold text-sm uppercase tracking-widest px-6 py-2.5 rounded-sm hover:shadow-gold transition-all duration-300"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile: hamburger (left) + cart (right) */}
          <div className="flex md:hidden items-center gap-4 absolute left-4">
            <button
              className={isHeroPage ? "text-primary-foreground" : "text-foreground"}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className="flex md:hidden items-center absolute right-4">
            <div className={isHeroPage ? "text-primary-foreground" : "text-foreground"}>
              <CartDrawer />
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="container mx-auto py-6 px-4 flex flex-col gap-4">
              <Link
                to="/shop"
                className="text-foreground font-semibold uppercase tracking-wider py-2 hover:text-gold transition-colors"
                onClick={() => setOpen(false)}
              >
                Shop
              </Link>

              {/* Mobile Learn accordion */}
              <button
                onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                className="flex items-center justify-between text-foreground font-semibold uppercase tracking-wider py-2 hover:text-gold transition-colors"
              >
                Learn
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileLearnOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileLearnOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-4 flex flex-col gap-3"
                  >
                    {learnLinks.map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        className="text-foreground/70 font-semibold uppercase tracking-wider py-1 hover:text-gold transition-colors"
                        onClick={() => { setOpen(false); setMobileLearnOpen(false); }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                to="/shop"
                className="bg-gradient-gold text-primary font-bold text-center uppercase tracking-widest px-6 py-3 rounded-sm mt-2"
                onClick={() => setOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
