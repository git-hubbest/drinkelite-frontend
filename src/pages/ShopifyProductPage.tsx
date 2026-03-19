import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Zap, Brain, Leaf, Beaker, Pill } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY, STOREFRONT_PRODUCTS_QUERY, fetchSellingPlans, getSubscriptionPrice, type ShopifyProduct, type SellingPlan, type SellingPlanGroup } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { flavors, ingredients } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import FlavorWipeTransition from "@/components/FlavorWipeTransition";
import StickyAddToCart from "@/components/StickyAddToCart";
import crownIcon from "@/assets/crown-icon-gold.png";

type PurchaseType = "one-time" | "subscribe";
type PackSize = "12" | "24";

const TWENTY_FOUR_PACK_PRICE = 74.90;
const BUNDLE_DISCOUNT_CODE = "BUNDLE24";

// Map Shopify handles to local flavor data
const HANDLE_TO_FLAVOR: Record<string, string> = {
  "elite-energy-lychee-pomegranate": "elite-energy-lychee-pomegranate",
  "elite-energy-blood-orange-yuzu": "elite-energy-blood-orange-yuzu",
  "elite-energy-crisp-apple-pear": "elite-energy-crisp-apple-pear",
};

// Copy from drinkelite.com for each flavor
const FLAVOR_DETAILS: Record<string, { tagline: string; bullets: string[] }> = {
  "elite-energy-lychee-pomegranate": {
    tagline: "Floral Lychee and rich Pomegranate fuse in this smooth, elegant blend of sweet and tart.",
    bullets: [
      "Clean Energy That Lasts – 200mg of Green Tea Caffeine and L-Theanine support calm alertness",
      "Energy Metabolism Support – Methyl B-Complex fuels your body at the cellular level",
      "Mind–Body Balance – Ashwagandha and Lion's Mane help maintain focus and composure",
      "Easy on Your Gut – Free from sucralose, sugar alcohols, gluten, and harsh additives",
    ],
  },
  "elite-energy-blood-orange-yuzu": {
    tagline: "Lush Blood Orange and zesty Yuzu collide in this bold, citrus-forward flavor with a touch of refined edge.",
    bullets: [
      "Smooth, Feel-Good Energy – 200mg of Green Tea Caffeine paired with L-Theanine delivers steady focus",
      "Metabolism & Mental Clarity – Methyl B-Complex supports cellular energy and brain performance",
      "Calm Focus, Locked-In Flow – Ashwagandha and Lion's Mane help balance stress",
      "Gut-Conscious Formula – No sucralose, sugar alcohols, gluten, or bloating additives",
    ],
  },
  "elite-energy-crisp-apple-pear": {
    tagline: "Crisp Apple and Juicy Pear meet in this clean, refreshing take on a timeless duo.",
    bullets: [
      "Smooth, Feel-Good Energy – 200mg of Green Tea Caffeine paired with L-Theanine delivers steady focus",
      "Metabolism & Mental Clarity – Methyl B-Complex supports cellular energy and brain performance",
      "Calm Focus, Locked-In Flow – Ashwagandha and Lion's Mane help balance stress",
      "Gut-Conscious Formula – No sucralose, sugar alcohols, gluten, or bloating additives",
    ],
  },
};

export default function ShopifyProductPage() {
  const params = useParams<{ handle: string; slug: string }>();
  const initialHandle = params.handle || params.slug;
  const navigate = useNavigate();
  
  const [activeHandle, setActiveHandle] = useState(initialHandle || "");
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [sellingPlanGroups, setSellingPlanGroups] = useState<SellingPlanGroup[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [wipeKey, setWipeKey] = useState("");
  const addToCartRef = useRef<HTMLButtonElement>(null);
  const [wipeColor, setWipeColor] = useState("transparent");

  const [packSize, setPackSize] = useState<PackSize>("12");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("one-time");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const applyDiscountCode = useCartStore(state => state.applyDiscountCode);
  const isCartLoading = useCartStore(state => state.isLoading);

  // Sync URL param changes (e.g. direct navigation)
  useEffect(() => {
    const h = params.handle || params.slug;
    if (h && h !== activeHandle) {
      setActiveHandle(h);
    }
  }, [params.handle, params.slug]);

  // Current flavor data from local assets
  const currentFlavor = flavors.find(f => f.slug === activeHandle);
  const flavorDetails = activeHandle ? FLAVOR_DETAILS[activeHandle] : undefined;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle: activeHandle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
        const plans = await fetchSellingPlans(activeHandle!);
        setSellingPlanGroups(plans);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    if (activeHandle) {
      fetchProduct();
    }
  }, [activeHandle]);

  const sellingPlan = useMemo<SellingPlan | null>(() => {
    if (!sellingPlanGroups?.length) return null;
    return sellingPlanGroups[0]?.sellingPlans?.edges?.[0]?.node ?? null;
  }, [sellingPlanGroups]);

  const hasSubscription = !!sellingPlan;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 flex justify-center py-40">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 text-center py-40">
          <p className="text-muted-foreground text-lg">Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[0]?.node;
  const twelvePackPrice = selectedVariant ? parseFloat(selectedVariant.price.amount) : 0;
  const packCount = packSize === "24" ? 24 : 12;
  const basePrice = packSize === "24" ? TWENTY_FOUR_PACK_PRICE : twelvePackPrice;
  const subPrice = sellingPlan ? getSubscriptionPrice(basePrice, sellingPlan) : +(basePrice * 0.90).toFixed(2);
  const displayPrice = purchaseType === "subscribe" ? subPrice : basePrice;
  const formattedPrice = displayPrice.toFixed(2);
  const formattedBasePrice = basePrice.toFixed(2);
  const perCan = (displayPrice / packCount).toFixed(2);
  const savingsPercent = sellingPlan?.priceAdjustments?.[0]?.adjustmentValue?.adjustmentPercentage ?? 10;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    const cartQuantity = packSize === "24" ? quantity * 2 : quantity;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: purchaseType === "subscribe"
        ? { amount: subPrice.toString(), currencyCode: selectedVariant.price.currencyCode }
        : selectedVariant.price,
      quantity: cartQuantity,
      selectedOptions: selectedVariant.selectedOptions || [],
      sellingPlanId: purchaseType === "subscribe" && sellingPlan ? sellingPlan.id : null,
    });
    if (packSize === "24") {
      await applyDiscountCode(BUNDLE_DISCOUNT_CODE);
    }
    // Cart drawer opens automatically via store
  };

  const handleFlavorSelect = (slug: string) => {
    const flavor = flavors.find(f => f.slug === slug);
    if (flavor && slug !== activeHandle) {
      setWipeColor(flavor.colorHex);
      setWipeKey(slug + Date.now());
      // Update URL without scroll reset
      window.history.replaceState(null, "", `/product/${slug}`);
      setActiveHandle(slug);
    }
  };

  const flavorColor = currentFlavor?.colorHex || "#c8a951";

  return (
    <div className="min-h-screen bg-background">
      <FlavorWipeTransition color={wipeColor} triggerKey={wipeKey} />
      <Header />
      <div className="pt-20 lg:pt-28" />

      <section className="container mx-auto px-4 py-6 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-start">
          {/* Image with flavor aura */}
          <div className="lg:sticky lg:top-32">
            <div className="relative flex items-center justify-center p-4 lg:p-12 min-h-[14rem] lg:min-h-[28rem]">
              {/* Aura glow */}
              <motion.div
                key={activeHandle + "-aura"}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }}
                transition={{ opacity: { duration: 0.3 }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute inset-0 rounded-full blur-[60px] lg:blur-[80px]"
                style={{
                  background: `radial-gradient(circle, ${flavorColor}66 0%, ${flavorColor}22 50%, transparent 75%)`,
                }}
              />
              {/* Render all flavor images, only show active — no load delay */}
              {flavors.map((flavor) => (
                <motion.img
                  key={flavor.slug}
                  src={flavor.image}
                  alt={flavor.name}
                  className="absolute z-10 h-52 md:h-72 lg:h-[28rem] object-contain drop-shadow-2xl"
                  animate={{
                    opacity: flavor.slug === activeHandle ? 1 : 0,
                    y: flavor.slug === activeHandle ? [0, -8, 0] : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: flavor.slug === activeHandle ? 0.15 : 0 },
                    y: { duration: 6, repeat: Infinity },
                  }}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm lg:text-sm mb-1 lg:mb-2">ELITE Energy</p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2 lg:mb-3 uppercase">{product.title.replace(/^Elite Energy\s*/i, '')}</h1>
            
            {/* Flavor tagline */}
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-4 lg:mb-6">
              {flavorDetails?.tagline || product.description}
            </p>

            {/* Flavor Selector */}
            <div className="mb-4 lg:mb-6">
              <p className="text-sm lg:text-sm font-semibold uppercase tracking-wider text-foreground mb-2 lg:mb-3">Flavor:</p>
              <div className="flex gap-2 lg:gap-3">
                {flavors.map((flavor) => {
                  const isActive = flavor.slug === activeHandle;
                  return (
                    <button
                      key={flavor.slug}
                      onClick={() => handleFlavorSelect(flavor.slug)}
                      className={`group relative flex flex-col items-center gap-1.5 lg:gap-2 p-2 lg:p-3 rounded-xl border-2 transition-all flex-1 lg:w-28 lg:flex-none ${
                        isActive
                          ? "border-gold bg-gold/10 shadow-sm"
                          : "border-border hover:border-gold/50 hover:bg-secondary"
                      }`}
                    >
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        className={`h-10 lg:h-14 object-contain transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                      />
                      <span className={`text-xs lg:text-[11px] font-semibold text-center leading-tight uppercase ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {flavor.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="flavor-indicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 lg:w-6 h-1 rounded-full bg-gold"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3 mb-5 lg:mb-8">
              {["0 Sugar", "10 Calories", "Keto", "Vegan", "Non-GMO", "No Artificial Anything"].map((b) => (
                <span key={b} className="bg-secondary text-foreground text-xs lg:text-xs font-semibold uppercase tracking-wider px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full">
                  {b}
                </span>
              ))}
            </div>

            {/* Pack Size Selector */}
            <div className="mb-4 lg:mb-6">
              <p className="text-sm lg:text-sm font-semibold uppercase tracking-wider text-foreground mb-2 lg:mb-3">Pack Size:</p>
              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                <button
                  onClick={() => setPackSize("12")}
                  className={`py-2.5 lg:py-3 px-3 lg:px-4 rounded-lg border-2 text-center transition-all ${
                    packSize === "12"
                      ? "border-gold bg-gold/10"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <span className="block text-lg lg:text-lg font-semibold text-foreground">12 Pack</span>
                  <span className="block text-base font-bold text-foreground">${twelvePackPrice.toFixed(2)}</span>
                  <span className="text-xs lg:text-xs text-gold font-medium">${(twelvePackPrice / 12).toFixed(2)}/can</span>
                </button>
                <button
                  onClick={() => setPackSize("24")}
                  className={`py-2.5 lg:py-3 px-3 lg:px-4 rounded-lg border-2 text-center transition-all relative ${
                    packSize === "24"
                      ? "border-gold bg-gold/10"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    BEST VALUE
                  </span>
                  <span className="block text-lg lg:text-lg font-semibold text-foreground">24 Pack</span>
                  <span className="block text-base font-bold text-foreground">${TWENTY_FOUR_PACK_PRICE.toFixed(2)}</span>
                  <span className="text-xs lg:text-xs text-gold font-medium">${(TWENTY_FOUR_PACK_PRICE / 24).toFixed(2)}/can</span>
                </button>
              </div>
            </div>

            {/* Purchase Options Toggle */}
            <div className="mb-4 lg:mb-6">
              <p className="text-sm lg:text-sm font-semibold uppercase tracking-wider text-foreground mb-2 lg:mb-3">Purchase Options:</p>
              <div className="space-y-2 lg:space-y-3">
                <button
                  onClick={() => setPurchaseType("one-time")}
                  className={`w-full flex items-center justify-between py-3 lg:py-3.5 px-3 lg:px-4 rounded-lg border-2 transition-all ${
                    purchaseType === "one-time"
                      ? "border-gold bg-gold/5"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${
                      purchaseType === "one-time" ? "border-gold" : "border-muted-foreground"
                    }`}>
                      {purchaseType === "one-time" && <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-gold" />}
                    </div>
                    <span className="font-semibold text-foreground text-base lg:text-base">One-Time Purchase</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-foreground text-base lg:text-base">${formattedBasePrice}</span>
                    <span className="block text-xs lg:text-xs text-muted-foreground">${(basePrice / packCount).toFixed(2)}/can</span>
                  </div>
                </button>

                <button
                  onClick={() => setPurchaseType("subscribe")}
                  className={`w-full flex items-center justify-between py-3 lg:py-3.5 px-3 lg:px-4 rounded-lg border-2 transition-all ${
                    purchaseType === "subscribe"
                      ? "border-gold bg-gold/5"
                      : "border-border hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${
                      purchaseType === "subscribe" ? "border-gold" : "border-muted-foreground"
                    }`}>
                      {purchaseType === "subscribe" && <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-gold" />}
                    </div>
                    <span className="font-semibold text-foreground text-base lg:text-base">Subscribe & Save</span>
                    <span className="bg-accent text-accent-foreground text-[10px] lg:text-[10px] px-2 lg:px-2 py-0.5 rounded font-bold uppercase">
                      SAVE {savingsPercent}%
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <span className="font-bold text-foreground text-base lg:text-base">${subPrice.toFixed(2)}</span>
                      <span className="text-muted-foreground line-through text-sm lg:text-sm">${formattedBasePrice}</span>
                    </div>
                    <span className="block text-xs lg:text-xs text-gold font-medium">${(subPrice / packCount).toFixed(2)}/can</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Subscriber Perks */}
            <AnimatePresence>
              {purchaseType === "subscribe" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 lg:mb-6 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row flex-wrap gap-1.5 lg:gap-x-6 lg:gap-y-2 text-sm lg:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> Save {savingsPercent}% on every order</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> Free shipping in the contiguous US</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> No commitment, cancel anytime</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Price */}
            <div className="flex items-baseline gap-2 lg:gap-3 mb-4 lg:mb-6">
              <span className="font-display text-4xl lg:text-4xl font-bold text-foreground">${formattedPrice}</span>
              {purchaseType === "subscribe" && (
                <span className="text-muted-foreground line-through text-lg lg:text-lg">${formattedBasePrice}</span>
              )}
              <span className="text-gold text-sm lg:text-sm font-semibold">(${perCan}/can)</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
              <p className="text-sm lg:text-sm font-semibold uppercase tracking-wider text-foreground">Qty:</p>
              <div className="flex items-center border-2 border-border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="w-10 lg:w-12 text-center font-semibold text-foreground text-base lg:text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              ref={addToCartRef}
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedVariant?.availableForSale}
              className="w-full bg-gradient-gold gold-shimmer text-primary font-bold uppercase tracking-widest px-8 lg:px-10 py-3.5 lg:py-4 rounded-sm hover:shadow-gold transition-all duration-300 text-base lg:text-lg mb-2 lg:mb-3 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCartLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : purchaseType === "subscribe" ? "Subscribe & Save" : "Add to Cart"}
            </button>
            <p className="text-center text-xs lg:text-xs text-muted-foreground">
              Free shipping on all US orders · 30-day money-back guarantee
            </p>

            {/* Flavor Benefits */}
            {flavorDetails?.bullets && (
              <div className="mt-6 lg:mt-8 space-y-2.5 lg:space-y-3">
                {flavorDetails.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-2 lg:gap-3 text-sm lg:text-sm">
                    <span className="text-gold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <TrustBadges />

      {/* Ingredients */}
      <section className="py-12 lg:py-20 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm lg:text-sm mb-2 lg:mb-3">What's Inside</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">The ELITE Formula</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
            {ingredients.map((ing) => {
              const iconMap: Record<string, React.ReactNode> = {
                caffeine: <Zap className="w-6 h-6" />,
                theanine: <Brain className="w-6 h-6" />,
                lionsmane: <Beaker className="w-6 h-6" />,
                ashwagandha: <Leaf className="w-6 h-6" />,
                bcomplex: <Pill className="w-6 h-6" />,
              };
              return (
                <div key={ing.name} className="text-center p-3 lg:p-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-2">
                    {iconMap[ing.icon]}
                  </div>
                  <p className="text-gold font-bold text-lg lg:text-lg">{ing.amount}</p>
                  <p className="text-primary-foreground/80 text-sm lg:text-sm font-medium">{ing.name}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-6 lg:mt-8">
            <Link to="/science" className="text-gold font-semibold uppercase tracking-wider text-sm lg:text-sm hover:underline">
              Learn More About Our Ingredients →
            </Link>
          </div>
        </div>
      </section>

      {/* Sub & Save banner */}
      <section className="py-10 lg:py-16 bg-gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <img src={crownIcon} alt="" className="h-8 lg:h-10 mx-auto mb-3 lg:mb-4" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-2 lg:mb-3">
            Subscribe & Save {savingsPercent}%
          </h2>
          <p className="text-primary/80 max-w-xl mx-auto mb-4 lg:mb-6 text-base lg:text-base">
            Save {savingsPercent}% on every order, free shipping in the contiguous US, and no commitment — cancel anytime.
          </p>
        </div>
      </section>

      <FAQSection />
      <Footer />

      <StickyAddToCart
        productTitle={product.title.replace(/^Elite Energy\s*/i, '')}
        price={formattedPrice}
        onAddToCart={handleAddToCart}
        isLoading={isCartLoading}
        targetRef={addToCartRef}
        purchaseType={purchaseType}
      />
    </div>
  );
}
