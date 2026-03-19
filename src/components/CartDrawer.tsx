import { useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2, Sparkles, Package } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const BUNDLE_DISCOUNT_CODE = "BUNDLE24";

export default function CartDrawer() {
  const {
    items, isLoading, isSyncing, isCartOpen, lastAddedItem,
    updateQuantity, removeItem, getCheckoutUrl, syncCart,
    openCart, closeCart, addItem, applyDiscountCode,
  } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isCartOpen) syncCart(); }, [isCartOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      closeCart();
    }
  };

  // Upsell: check if user could benefit from adding another case
  const hasNonSubscriptionItem = items.some(i => !i.sellingPlanId);
  const hasSingleCase = items.some(i => i.quantity === 1 && !i.sellingPlanId);

  const handleUpsellAddCase = async () => {
    // Find the first single-case item and bump to 2
    const singleItem = items.find(i => i.quantity === 1 && !i.sellingPlanId);
    if (singleItem) {
      await updateQuantity(singleItem.variantId, 2);
      await applyDiscountCode(BUNDLE_DISCOUNT_CODE);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
      <SheetTrigger asChild>
        <button className="relative text-inherit hover:text-gold transition-colors" aria-label="Cart" onClick={openCart}>
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-gold text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-card">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-xl">Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Add some ELITE to get started.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Upsell Banner */}
              {hasSingleCase && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Add another case & save $5!</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Get 2 cases (24 cans) for $74.90 instead of $79.90</p>
                      <button
                        onClick={handleUpsellAddCase}
                        disabled={isLoading}
                        className="mt-2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Add Case — Save $5"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Subscribe & Save upsell */}
              {hasNonSubscriptionItem && (
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Subscribe & Save 10%</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Free shipping + cancel anytime. Switch to subscription on the product page.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 bg-secondary rounded-lg">
                      <div className="w-16 h-16 bg-card rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="h-14 object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.variantTitle}
                          {item.sellingPlanId && <span className="ml-1 text-gold">• Subscription</span>}
                        </p>
                        <p className="font-bold text-foreground text-sm mt-1">${parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground hover:border-gold transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground hover:border-gold transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  🚚 Free shipping on all US orders
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                  className="w-full bg-gradient-gold text-primary font-bold uppercase tracking-widest py-4 rounded-sm hover:shadow-gold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Checkout
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  Secure checkout powered by Shopify
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
