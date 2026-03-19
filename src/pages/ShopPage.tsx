import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Sparkles, Truck, Shield, Zap, Brain, Leaf, Pill } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { flavors } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import crownIcon from "@/assets/crown-icon-gold.png";

export default function ShopPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 10 });
        if (data?.data?.products?.edges) {
          setProducts(data.data.products.edges);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: ShopifyProduct, variantIdx: number = 0) => {
    const variant = product.node.variants.edges[variantIdx]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`Added ${product.node.title} to cart`);
  };

  const displayProducts = products.filter(p => !p.node.title.toLowerCase().includes('24 pack'));

  // Match shopify products to local flavor data for colors
  const getFlavorData = (handle: string) => flavors.find(f => f.slug === handle);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 lg:pt-28" />

      {/* Hero banner */}
      <section className="bg-navy text-primary-foreground py-14 lg:py-24 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/30 blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/20 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={crownIcon} alt="" className="h-8 lg:h-10 mx-auto mb-4" />
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4">
              Shop <span className="text-gradient-gold">ELITE</span> Energy
            </h1>
            <p className="text-primary-foreground/70 text-base lg:text-lg max-w-xl mx-auto mb-8">
              Clean energy that performs. 200mg green tea caffeine, adaptogens, nootropics — zero sugar, zero compromise.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-gold" /> Free US Shipping</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-gold" /> Subscribe & Save 10%</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold" /> 30-Day Guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {displayProducts.map((product, i) => {
              const flavorData = getFlavorData(product.node.handle);
              const colorHex = flavorData?.colorHex || "#c8a951";
              const price = parseFloat(product.node.priceRange.minVariantPrice.amount);

              return (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 border border-border hover:border-gold/30">
                    {/* Image area with flavor aura */}
                    <Link to={`/product/${product.node.handle}`}>
                      <div className="relative flex items-center justify-center py-10 lg:py-14 px-8 min-h-[280px] lg:min-h-[340px] overflow-hidden">
                        {/* Aura glow */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `radial-gradient(circle at 50% 60%, ${colorHex}25 0%, transparent 70%)`,
                          }}
                        />
                        {product.node.images.edges[0]?.node && (
                          <img
                            src={product.node.images.edges[0].node.url}
                            alt={product.node.images.edges[0].node.altText || product.node.title}
                            className="h-48 lg:h-64 object-contain transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-xl"
                          />
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="p-5 lg:p-6 pt-0">
                      {/* Flavor tag */}
                      {flavorData && (
                        <span
                          className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                          style={{
                            backgroundColor: `${colorHex}15`,
                            color: colorHex,
                          }}
                        >
                          {flavorData.tagline}
                        </span>
                      )}

                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-1.5 group-hover:text-gold transition-colors uppercase">
                          {product.node.title.replace(/^Elite Energy\s*/i, '')}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                        {flavorData?.description || product.node.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-display text-2xl font-bold text-foreground">
                            ${price.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1.5">/ 12 pack</span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isCartLoading}
                          className="bg-gradient-gold gold-shimmer text-primary font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-sm hover:shadow-gold transition-all disabled:opacity-50 flex items-center gap-1.5"
                        >
                          {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                            <>Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View product CTA */}
        {!loading && displayProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 lg:mt-16"
          >
            <p className="text-muted-foreground text-sm mb-3">Can't decide? Try our most popular flavor.</p>
            <Link
              to="/product/elite-energy-lychee-pomegranate"
              className="inline-flex items-center gap-2 text-gold font-semibold uppercase tracking-wider text-sm hover:gap-3 transition-all"
            >
              Shop Lychee Pomegranate <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </section>

      {/* Value props strip */}
      <section className="bg-secondary py-8 lg:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Zap className="w-5 h-5 text-gold" />, label: "Green Tea Caffeine", sub: "200mg per can" },
              { icon: <Brain className="w-5 h-5 text-gold" />, label: "Lion's Mane", sub: "Cognitive clarity" },
              { icon: <Leaf className="w-5 h-5 text-gold" />, label: "Ashwagandha", sub: "Stress adaptation" },
              { icon: <Pill className="w-5 h-5 text-gold" />, label: "B-Complex", sub: "Cellular energy" },
            ].map((item) => (
              <div key={item.label} className="py-2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
      <Footer />
    </div>
  );
}
