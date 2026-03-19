import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import crownIcon from "@/assets/crown-icon-gold.png";
import heroBg from "@/assets/hero-bg.jpg";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={crownIcon} alt="" className="h-14 mx-auto mb-6" />
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-4">Our Story</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Built for People Who<br /><span className="text-gradient-gold">Choose Better</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-12 text-lg text-muted-foreground leading-relaxed">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Problem</h2>
              <p>
                We looked at the energy drink market and saw the same thing everywhere: excessive sugar, synthetic chemicals, artificial sweeteners, and mystery blends hidden behind proprietary labels. The industry was built on hype — not health.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Mission</h2>
              <p>
                ELITE was born from a simple belief: you shouldn't have to choose between energy and wellness. We set out to create an energy drink that performs at the highest level — while using only ingredients that support your mind and body.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Formula</h2>
              <p>
                We spent over two years researching, formulating, and testing before ELITE was ready. Every ingredient was chosen based on clinical evidence — from KSM-66® Ashwagandha to Lion's Mane mushroom to green tea caffeine paired with L-Theanine. No proprietary blends, no corners cut.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">The Standard</h2>
              <p>
                ELITE isn't for everybody — but anybody can be ELITE. It's for the people who read labels, who care about what they put in their bodies, and who know that real performance starts with real ingredients. Welcome to intentional energy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-gradient-gold">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Transparency", desc: "Full ingredient disclosure, clinical dosing, and zero proprietary blends." },
              { title: "Quality", desc: "Premium ingredients sourced globally, manufactured in the USA to the highest standards." },
              { title: "Community", desc: "Building a movement of intentional, health-conscious people who demand better." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <h3 className="font-display text-xl font-bold text-gold mb-2">{v.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-gold text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Be ELITE?
          </h2>
          <Link
            to="/shop"
            className="inline-block bg-navy text-primary-foreground font-bold uppercase tracking-widest px-12 py-4 rounded-sm hover:bg-navy-light transition-colors text-lg"
          >
            Shop Now →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
