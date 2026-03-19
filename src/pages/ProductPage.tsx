import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { flavors, ingredients, trustBadges, faqs } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import crownIcon from "@/assets/crown-icon-gold.png";

type PackSize = 12 | 24;
type PurchaseType = "one-time" | "subscribe";

const prices: Record<PackSize, number> = { 12: 39.95, 24: 71.95 };

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const flavor = flavors.find((f) => f.slug === slug) || flavors[0];
  const otherFlavors = flavors.filter((f) => f.slug !== flavor.slug);

  const [packSize, setPackSize] = useState<PackSize>(12);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscribe");

  const basePrice = prices[packSize];
  const displayPrice = purchaseType === "subscribe" ? +(basePrice * 0.90).toFixed(2) : basePrice;
  const perCan = +(displayPrice / packSize).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28" />

      {/* Product Hero */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center bg-secondary rounded-2xl p-12"
          >
            <motion.img
              src={flavor.image}
              alt={flavor.name}
              className="h-80 md:h-[28rem] object-contain drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-2">
              {flavor.tagline}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 uppercase">
              {flavor.name}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {flavor.description}
            </p>

            {/* Quick badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["0 Sugar", "10 Calories", "Keto", "Vegan", "Non-GMO", "No Artificial Anything"].map((b) => (
                <span key={b} className="bg-secondary text-foreground text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {b}
                </span>
              ))}
            </div>

            {/* Purchase Type Toggle */}
            <div className="bg-secondary rounded-lg p-1 flex mb-6">
                <button
                onClick={() => setPurchaseType("subscribe")}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold uppercase tracking-wider transition-all ${
                  purchaseType === "subscribe"
                    ? "bg-gradient-gold text-primary shadow-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Subscribe & Save <span className="bg-accent/20 text-accent text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold">SAVE 10%</span>
              </button>
              <button
                onClick={() => setPurchaseType("one-time")}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold uppercase tracking-wider transition-all ${
                  purchaseType === "one-time"
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                One-Time Purchase
              </button>
            </div>

            {/* Sub & Save callout */}
            {purchaseType === "subscribe" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6"
              >
                <p className="text-foreground font-semibold text-sm mb-1">🎉 Subscriber Perks</p>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>✓ Save 10% on every subscription</li>
                  <li>✓ Free shipping in the contiguous US</li>
                  <li>✓ No commitment, cancel anytime</li>
                </ul>
              </motion.div>
            )}

            {/* Pack Size */}
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">Pack Size</p>
              <div className="flex gap-3">
                {([12, 24] as PackSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setPackSize(size)}
                    className={`flex-1 py-3 rounded-lg border-2 text-center font-semibold transition-all ${
                      packSize === size
                        ? "border-gold bg-gold/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-gold/50"
                    }`}
                  >
                    <span className="block text-lg">{size} Pack</span>
                    <span className="text-xs text-muted-foreground">
                      Free Shipping
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-foreground">${displayPrice}</span>
              {purchaseType === "subscribe" && (
                <span className="text-muted-foreground line-through text-lg">${basePrice}</span>
              )}
              <span className="text-muted-foreground text-sm">(${perCan}/can)</span>
            </div>

            {/* CTA */}
            <button className="w-full bg-gradient-gold text-primary font-bold uppercase tracking-widest px-10 py-4 rounded-sm hover:shadow-gold transition-all duration-300 text-lg mb-3">
              {purchaseType === "subscribe" ? "Subscribe & Save" : "Add to Cart"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Free shipping on all US orders · 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      <TrustBadges />

      {/* Ingredients Quick */}
      <section className="py-20 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">What's Inside</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">The ELITE Formula</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ingredients.map((ing) => (
              <div key={ing.name} className="text-center p-4">
                <span className="text-3xl block mb-2">{ing.icon}</span>
                <p className="text-gold font-bold text-lg">{ing.amount}</p>
                <p className="text-primary-foreground/80 text-sm font-medium">{ing.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/science" className="text-gold font-semibold uppercase tracking-wider text-sm hover:underline">
              Learn More About Our Ingredients →
            </Link>
          </div>
        </div>
      </section>

      {/* Sub & Save banner */}
      <section className="py-16 bg-gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <img src={crownIcon} alt="" className="h-10 mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Subscribe & Save 10%
          </h2>
          <p className="text-primary/80 max-w-xl mx-auto mb-6">
            Save 10% on every order, free shipping in the contiguous US, and no commitment — cancel anytime.
          </p>
          <button
            onClick={() => setPurchaseType("subscribe")}
            className="bg-navy text-primary-foreground font-bold uppercase tracking-widest px-10 py-3.5 rounded-sm hover:bg-navy-light transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </section>

      {/* Other Flavors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Try Another Flavor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {otherFlavors.map((f) => (
              <Link
                key={f.slug}
                to={`/products/${f.slug}`}
                className="group flex items-center gap-6 bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all"
              >
                <img src={f.image} alt={f.name} className="h-28 object-contain group-hover:scale-105 transition-transform" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">{f.tagline}</p>
                  <h3 className="font-display text-lg font-bold text-foreground uppercase">{f.name}</h3>
                  <span className="text-sm text-gold font-semibold">Shop →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
