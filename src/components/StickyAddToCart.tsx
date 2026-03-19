import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface StickyAddToCartProps {
  productTitle: string;
  price: string;
  onAddToCart: () => void;
  isLoading: boolean;
  targetRef: React.RefObject<HTMLElement | null>;
  purchaseType: "one-time" | "subscribe";
}

export default function StickyAddToCart({
  productTitle,
  price,
  onAddToCart,
  isLoading,
  targetRef,
  purchaseType,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    const el = targetRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [targetRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-lg"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{productTitle}</p>
              <p className="text-lg font-bold text-foreground">${price}</p>
            </div>
            <button
              onClick={onAddToCart}
              disabled={isLoading}
              className="flex-shrink-0 bg-gradient-gold gold-shimmer text-primary font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:shadow-gold transition-all text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                purchaseType === "subscribe" ? "Subscribe" : "Add to Cart"
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
