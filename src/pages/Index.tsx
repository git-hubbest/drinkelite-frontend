import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Brain, Leaf } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import lyPomImg from "@/assets/lychee-pomegranate.png";
import boYuzuImg from "@/assets/blood-orange-yuzu.png";
import caPearImg from "@/assets/crisp-apple-pear.png";
import crownIcon from "@/assets/crown-icon-gold.png";
import { flavors, ingredients } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FlavorCard from "@/components/FlavorCard";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import IngredientHighlight from "@/components/IngredientHighlight";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/50 to-navy/90" />
        
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.4) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center pt-28 pb-10 lg:pt-32 lg:pb-20">
          
          {/* Crown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-5 lg:mb-6"
          >
            <div className="absolute inset-0 blur-xl bg-gold/30 rounded-full scale-150" />
            <img src={crownIcon} alt="" className="relative h-10 lg:h-14" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gold font-semibold uppercase tracking-[0.3em] text-sm lg:text-base mb-4 lg:mb-5"
          >
            Nootropics + Adaptogens
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-[3.5rem] leading-[1.05] md:text-6xl lg:text-8xl font-bold text-primary-foreground mb-5 lg:mb-6"
          >
            Energy That<br />
            <span className="text-gradient-gold">Elevates</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-primary-foreground/70 text-lg lg:text-xl max-w-md lg:max-w-lg mb-8 lg:mb-10 font-body leading-relaxed"
          >
            Clean energy powered by science. 0 sugar. 10 calories. No artificial anything.
          </motion.p>

          {/* Cans */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="relative flex items-end justify-center gap-0 md:gap-3 mb-10 lg:mb-12"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 lg:h-48 bg-gold/10 blur-3xl rounded-full" />
            
            <motion.img
              src={caPearImg}
              alt="Crisp Apple Pear"
              className="relative h-48 md:h-64 lg:h-[22rem] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
            <motion.img
              src={lyPomImg}
              alt="Lychee Pomegranate"
              className="relative h-56 md:h-80 lg:h-[28rem] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] -mx-3 md:-mx-2 z-10"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.img
              src={boYuzuImg}
              alt="Blood Orange Yuzu"
              className="relative h-48 md:h-64 lg:h-[22rem] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4"
          >
            <Link
              to="/shop"
              className="bg-gradient-gold gold-shimmer text-primary font-bold uppercase tracking-widest px-10 lg:px-12 py-4 lg:py-4 rounded-sm hover:shadow-gold transition-all duration-300 text-center text-base lg:text-lg"
            >
              Shop Now
            </Link>
            <Link
              to="/science"
              className="border-2 border-primary-foreground/30 text-primary-foreground font-semibold uppercase tracking-widest px-10 lg:px-12 py-4 lg:py-4 rounded-sm hover:border-gold hover:text-gold transition-all duration-300 text-center text-base lg:text-lg"
            >
              The Science
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2"
            >
              <div className="w-1 h-2 rounded-full bg-gold" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <TrustBadges />

      {/* WHAT MAKES US ELITE */}
      <section className="py-16 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">Why ELITE</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Not for Everybody. <span className="text-gradient-gold">For Anybody.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base lg:text-lg">
              We believe everyone deserves clean energy that actually works — no compromises, no junk, no gimmicks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {[
              { icon: <Zap className="w-6 h-6" />, title: "Clean Energy", desc: "200mg green tea caffeine + L-Theanine for smooth, sustained focus without the crash." },
              { icon: <Brain className="w-6 h-6" />, title: "Mind & Body", desc: "Lion's Mane + Ashwagandha (KSM-66®) support cognitive function, stress response, and recovery." },
              { icon: <Leaf className="w-6 h-6" />, title: "Nothing Artificial", desc: "Zero sugar, naturally sweetened with Reb M. No artificial sweeteners, flavors, preservatives, or colors." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-xl p-8 lg:p-10 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-gold/20 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-gold mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAVORS */}
      <section className="py-16 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">The Lineup</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
              Choose Your ELITE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {flavors.map((f, i) => (
              <FlavorCard key={f.slug} flavor={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* KEY INGREDIENTS */}
      <section className="py-16 lg:py-28 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-20"
          >
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">The Formula</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Science You Can <span className="text-gradient-gold">Feel</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto text-base lg:text-lg">
              Every ingredient is clinically studied, purposefully dosed, and chosen because it works.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-10 lg:mb-14">
            {ingredients.map((ing, i) => (
              <IngredientHighlight key={ing.name} ingredient={ing} index={i} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/science"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold font-bold uppercase tracking-widest px-8 lg:px-10 py-3 lg:py-3.5 rounded-sm hover:bg-gold hover:text-primary transition-all duration-300 text-sm lg:text-base group"
            >
              Explore the Science
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE & SAVE */}
      <section className="py-16 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-navy rounded-2xl lg:rounded-3xl p-8 lg:p-20 text-center relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/10 blur-[120px] rounded-full" />
            
            <div className="relative z-10">
              <img src={crownIcon} alt="" className="h-10 lg:h-12 mx-auto mb-5 lg:mb-6" />
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Subscribe & Save 10%
              </h2>
              <p className="text-primary-foreground/60 max-w-2xl mx-auto mb-6 lg:mb-8 text-base lg:text-lg">
                Join thousands who've made ELITE their daily ritual. Lock in 10% off every order with free shipping — plus exclusive rewards and early access to new flavors.
              </p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-primary-foreground/50 mb-8 lg:mb-10">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> 10% Off Every Order</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> Free Shipping</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> Cancel Anytime</span>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> Exclusive Rewards</span>
              </div>
              <Link
                to="/shop"
                className="inline-block bg-gradient-gold gold-shimmer text-primary font-bold uppercase tracking-widest px-10 lg:px-14 py-4 lg:py-4 rounded-sm hover:shadow-gold transition-all text-base lg:text-lg"
              >
                Start Your Subscription
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default Index;
