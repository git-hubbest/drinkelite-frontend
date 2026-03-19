import { Link } from "react-router-dom";
import logoWhiteGold from "@/assets/logo-white-gold.png";
import crownIcon from "@/assets/crown-icon-gold.png";

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Sub & Save CTA */}
      <div className="bg-gradient-gold text-primary py-8 lg:py-12">
        <div className="container mx-auto text-center px-4">
          <img src={crownIcon} alt="" className="h-8 lg:h-10 mx-auto mb-3 lg:mb-4" />
          <h3 className="font-display text-2xl lg:text-4xl font-bold mb-2 lg:mb-3">
            Join the ELITE Club
          </h3>
          <p className="text-primary/80 max-w-xl mx-auto mb-4 lg:mb-6 font-body text-sm lg:text-base">
            Subscribe & Save 10% on every order. Free shipping on all US orders, plus exclusive rewards and early access to new flavors.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-navy text-primary-foreground font-bold uppercase tracking-widest px-8 lg:px-10 py-3 lg:py-3.5 rounded-sm hover:bg-navy-light transition-colors text-sm lg:text-base"
          >
            Subscribe & Save →
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          <div className="col-span-2 md:col-span-1">
            <img src={logoWhiteGold} alt="ELITE Energy" className="h-10 lg:h-12 w-auto mb-3 lg:mb-4" />
            <p className="text-primary-foreground/60 text-xs lg:text-sm leading-relaxed">
              Clean energy for intentional living. Nootropics + adaptogens. Zero sugar. All performance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-xs lg:text-sm text-gold mb-3 lg:mb-4">Shop</h4>
            <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-primary-foreground/60">
              <li><Link to="/product/elite-energy-lychee-pomegranate" className="hover:text-gold transition-colors">Lychee Pomegranate</Link></li>
              <li><Link to="/product/elite-energy-blood-orange-yuzu" className="hover:text-gold transition-colors">Blood Orange Yuzu</Link></li>
              <li><Link to="/product/elite-energy-crisp-apple-pear" className="hover:text-gold transition-colors">Crisp Apple Pear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-xs lg:text-sm text-gold mb-3 lg:mb-4">Learn</h4>
            <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-primary-foreground/60">
              <li><Link to="/science" className="hover:text-gold transition-colors">Science & Ingredients</Link></li>
              <li><Link to="/our-story" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-widest text-xs lg:text-sm text-gold mb-3 lg:mb-4">Support</h4>
            <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-primary-foreground/60">
              <li><a href="mailto:hello@drinkelite.com" className="hover:text-gold transition-colors">hello@drinkelite.com</a></li>
              <li><span>Fort Lauderdale, FL 33301</span></li>
            </ul>
            <div className="flex gap-3 mt-3 lg:mt-4">
              <a href="#" className="text-primary-foreground/40 hover:text-gold transition-colors text-lg">𝕏</a>
              <a href="#" className="text-primary-foreground/40 hover:text-gold transition-colors text-lg">IG</a>
              <a href="#" className="text-primary-foreground/40 hover:text-gold transition-colors text-lg">TT</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 lg:mt-12 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 lg:gap-4 text-[10px] lg:text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} ELITE Energy™. All rights reserved.</p>
          <p>www.drinkelite.com</p>
        </div>
      </div>
    </footer>
  );
}
