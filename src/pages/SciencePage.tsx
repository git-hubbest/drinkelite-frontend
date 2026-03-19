import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NeuralNetBackground from "@/components/NeuralNetBackground";
import { ingredients } from "@/data/products";
import ingredientsBg from "@/assets/ingredients-bg.jpg";
import greenTeaImg from "@/assets/ingredient-green-tea.jpg";
import lTheanineImg from "@/assets/ingredient-l-theanine.jpg";
import lionsManeImg from "@/assets/ingredient-lions-mane.jpg";
import ashwagandhaImg from "@/assets/ingredient-ashwagandha.jpg";
import bComplexImg from "@/assets/ingredient-b-complex.jpg";

const ingredientImages = [greenTeaImg, lTheanineImg, lionsManeImg, ashwagandhaImg, bComplexImg];

const detailedIngredients = [
  {
    ...ingredients[0],
    image: greenTeaImg,
    longDescription:
      "Unlike synthetic caffeine found in most energy drinks, our caffeine is derived from green tea leaves. Green tea caffeine provides a smoother onset of energy and is naturally accompanied by trace antioxidants. At 200mg per can, it's equivalent to about two cups of coffee — enough to meaningfully boost alertness, reaction time, and endurance without the overstimulation that leads to jitters and crashes.",
    studies: "Haskell et al., 2008 – Psychopharmacology",
    keyBenefit: "Sustained alertness without the crash",
  },
  {
    ...ingredients[1],
    image: lTheanineImg,
    longDescription:
      "L-Theanine is an amino acid found naturally in tea leaves. When paired 1:1 with caffeine, clinical studies show it promotes a state of calm alertness — enhancing focus and attention while reducing the anxiety and restlessness often caused by caffeine alone. This synergistic combination is the gold standard in nootropic stacking.",
    studies: "Owen et al., 2008 – Nutritional Neuroscience",
    keyBenefit: "Calm focus & reduced anxiety",
  },
  {
    ...ingredients[2],
    image: lionsManeImg,
    longDescription:
      "Lion's Mane (Hericium erinaceus) is a medicinal mushroom with centuries of use in traditional medicine. Modern research has identified its ability to stimulate Nerve Growth Factor (NGF) synthesis, which supports neuron health, memory, and cognitive function. Our 200mg dose delivers meaningful levels of active hericenones and erinacines.",
    studies: "Mori et al., 2009 – Phytotherapy Research",
    keyBenefit: "Supports nerve growth & memory",
  },
  {
    ...ingredients[3],
    image: ashwagandhaImg,
    longDescription:
      "KSM-66® is the world's most clinically studied ashwagandha extract, backed by 24+ gold-standard clinical trials. It's a full-spectrum root extract standardized to ≥5% withanolides. Studies demonstrate its efficacy in reducing cortisol levels, managing stress, improving endurance, and supporting overall well-being.",
    studies: "Chandrasekhar et al., 2012 – Indian J Psychol Med",
    keyBenefit: "Cortisol reduction & stress relief",
  },
  {
    ...ingredients[4],
    image: bComplexImg,
    longDescription:
      "Our Methyl B-Complex delivers B12 (Methylcobalamin), B9 (Calcium L-5-Methyltetrahydrofolate), and B6 (Pyridoxal-5-Phosphate) — all in their bioavailable, methylated forms. Unlike cheaper synthetic forms (cyanocobalamin, folic acid), methylated B-vitamins are immediately usable by your body, supporting energy metabolism, red blood cell formation, and neurological function.",
    studies: "Kennedy, 2016 – Nutrients",
    keyBenefit: "Bioavailable energy metabolism",
  },
];

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero with Neural Net */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-navy">
        <NeuralNetBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/80" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-4">
              Clinical-Grade Formulation
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              Every Ingredient,
              <br />
              <span className="text-gradient-gold">Backed by Research</span>
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              We don't hide behind proprietary blends. Every ingredient is transparently dosed
              and clinically studied. Here's exactly what's in every can and why.
            </p>
          </motion.div>

          {/* Dosage summary pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {ingredients.map((ing) => (
              <span
                key={ing.name}
                className="bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full backdrop-blur-sm"
              >
                {ing.name} — {ing.amount}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full Ingredient Deep-Dives */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navy opacity-[0.02]">
          <NeuralNetBackground />
        </div>
        {detailedIngredients.map((ing, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={ing.name}
              className={`relative py-20 md:py-28 ${isEven ? "bg-background" : "bg-secondary"}`}
            >
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Image */}
                  <div className={isEven ? "" : "md:[direction:ltr]"}>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={ing.image}
                        alt={ing.name}
                        className="w-full aspect-square object-cover rounded-lg shadow-elevated"
                        loading="lazy"
                      />
                      {/* Dosage badge */}
                      <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2">
                        <span className="text-gold font-bold text-sm">{ing.amount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={isEven ? "" : "md:[direction:ltr]"}>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {ing.name}
                    </h2>
                    <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-6">
                      {ing.keyBenefit}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-base mb-6">
                      {ing.longDescription}
                    </p>
                    <div className="bg-navy/5 border border-border rounded-lg p-4">
                      <p className="text-xs text-muted-foreground font-medium">
                        <span className="text-gold font-semibold">Clinical Reference:</span>{" "}
                        <span className="italic">{ing.studies}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </section>

      {/* What's NOT in ELITE */}
      <section className="relative py-24 bg-navy text-primary-foreground overflow-hidden">
        <NeuralNetBackground />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-4">
              Clean Label Promise
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
              What's <span className="text-gradient-gold">Not</span> in ELITE
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              "Artificial Sweeteners",
              "Artificial Flavors",
              "Preservatives",
              "Added Colors",
              "Sugar Alcohols",
              "Sucralose",
              "Erythritol",
              "Gluten",
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-5 backdrop-blur-sm hover:border-gold/30 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mx-auto mb-2 text-destructive/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-primary-foreground/80 text-sm font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Ingredients Statement */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Full Transparency
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
            Complete Ingredients List
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Reverse Osmosis Sparkling Water, Natural Flavors, Citric Acid, Caffeine (from Green
            Tea), Acacia, L-Theanine, Lion's Mane Mushroom Extract, Organic Ashwagandha Root
            Extract (KSM-66®), Reb M, Methylcobalamin (Vitamin B12).
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-foreground">
            {["0 Sugar", "10 Calories", "Keto", "Vegan", "Non-GMO", "Gluten Free"].map((badge) => (
              <span key={badge} className="bg-card px-5 py-2.5 rounded-full shadow-card border border-border">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-gold text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Feel the Difference?
          </h2>
          <Link
            to="/shop"
            className="inline-block bg-navy text-primary-foreground font-bold uppercase tracking-widest px-12 py-4 rounded-sm hover:bg-navy-light transition-colors text-lg"
          >
            Shop ELITE →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
