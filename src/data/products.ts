// Shared product data for the Elite Energy site
import lyPomImg from "@/assets/lychee-pomegranate.png";
import boYuzuImg from "@/assets/blood-orange-yuzu.png";
import caPearImg from "@/assets/crisp-apple-pear.png";

export interface Flavor {
  slug: string;
  name: string;
  tagline: string;
  color: string; // tailwind text-color class token
  colorHex: string;
  image: string;
  description: string;
}

export const flavors: Flavor[] = [
  {
    slug: "elite-energy-lychee-pomegranate",
    name: "Lychee Pomegranate",
    tagline: "Exotic & Refreshing",
    color: "text-pink-500",
    colorHex: "#e84393",
    image: lyPomImg,
    description:
      "A vibrant fusion of tropical lychee and tart pomegranate. Bright, exotic, and endlessly refreshing — this is the flavor that turns heads.",
  },
  {
    slug: "elite-energy-blood-orange-yuzu",
    name: "Blood Orange Yuzu",
    tagline: "Citrus & Invigorating",
    color: "text-orange-500",
    colorHex: "#e17055",
    image: boYuzuImg,
    description:
      "Bold blood orange meets bright Japanese yuzu for a citrus rush that awakens every sense. Zesty, smooth, and impossibly drinkable.",
  },
  {
    slug: "elite-energy-crisp-apple-pear",
    name: "Crisp Apple Pear",
    tagline: "Crisp & Balanced",
    color: "text-green-500",
    colorHex: "#00b894",
    image: caPearImg,
    description:
      "Clean, crisp apple blended with sweet pear for the smoothest sip imaginable. Light, balanced, and perfect any time of day.",
  },
];

export const ingredients = [
  {
    name: "Green Tea Caffeine",
    amount: "200 mg",
    description:
      "Slow-release energy from green tea — no jitters, no crash. Supports sustained alertness and thermogenesis so you stay sharp for hours.",
    icon: "caffeine",
  },
  {
    name: "L-Theanine",
    amount: "200 mg",
    description:
      "The amino acid behind calm focus. Paired with caffeine, L-Theanine smooths out the energy curve for a state of relaxed concentration.",
    icon: "theanine",
  },
  {
    name: "Lion's Mane",
    amount: "200 mg",
    description:
      "A powerhouse functional mushroom studied for its role in supporting nerve growth factor, memory, and cognitive performance.",
    icon: "lionsmane",
  },
  {
    name: "Ashwagandha (KSM-66®)",
    amount: "111 mg",
    description:
      "The world's most clinically studied ashwagandha. KSM-66® is shown to help the body manage stress, support cortisol balance, and promote recovery.",
    icon: "ashwagandha",
  },
  {
    name: "Methyl B-Complex",
    amount: "100% DV",
    description:
      "Bioavailable B12, B9, and B6 in their active methylated forms — the kind your body actually recognizes and uses for energy metabolism and mental clarity.",
    icon: "bcomplex",
  },
];

export const faqs = [
  {
    q: "How much caffeine is in each can?",
    a: "Each 12 oz can contains 200 mg of caffeine sourced from green tea, paired with 200 mg of L-Theanine for smooth, sustained energy without the crash.",
  },
  {
    q: "Is ELITE Energy sugar-free?",
    a: "Yes! ELITE contains 0 grams of sugar with only 10 calories per can. We use Reb M, a naturally derived sweetener, instead of artificial sweeteners like sucralose or aspartame.",
  },
  {
    q: "What makes ELITE different from other energy drinks?",
    a: "ELITE combines nootropics and adaptogens — including Lion's Mane, Ashwagandha (KSM-66®), and L-Theanine — for energy that supports mood, focus, and performance. No artificial sweeteners, flavors, preservatives, or added colors.",
  },
  {
    q: "Is ELITE keto / vegan / non-GMO?",
    a: "Yes to all three. ELITE is keto-friendly, 100% vegan, and made with non-GMO ingredients. It's also gluten-free.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day money-back guarantee. If you're not 100% satisfied, contact us and we'll make it right — no questions asked.",
  },
  {
    q: "Do you offer subscriptions?",
    a: "Yes! Subscribe & Save to get 10% off every order plus free shipping in the contiguous US. You can modify, pause, or cancel anytime — no commitment.",
  },
  {
    q: "Where does ELITE ship?",
    a: "We ship to all 50 US states with free shipping on every order within the contiguous United States.",
  },
  {
    q: "How should I store ELITE?",
    a: "For the best taste, refrigerate before enjoying. Store in a cool, dry place away from direct sunlight.",
  },
];

export const trustBadges = [
  { icon: "shield", title: "30-Day Money Back", subtitle: "100% Satisfaction Guarantee" },
  { icon: "truck", title: "Free Shipping", subtitle: "On All US Orders" },
  { icon: "repeat", title: "Subscribe & Save", subtitle: "10% off + Free Shipping" },
  { icon: "flag", title: "Made in the USA", subtitle: "Premium Ingredients" },
];
