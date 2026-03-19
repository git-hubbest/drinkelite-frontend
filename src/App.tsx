import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import { lazy, Suspense } from "react";

// Lazy load all pages — only loads JS for the current page
const Index = lazy(() => import("./pages/Index.tsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.tsx"));
const ShopifyProductPage = lazy(() => import("./pages/ShopifyProductPage.tsx"));
const SciencePage = lazy(() => import("./pages/SciencePage.tsx"));
const OurStoryPage = lazy(() => import("./pages/OurStoryPage.tsx"));
const FAQPage = lazy(() => import("./pages/FAQPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{minHeight:'100vh',background:'#0d1b2e',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:40,height:40,border:'3px solid rgba(201,168,76,.3)',borderTopColor:'#c9a84c',borderRadius:'50%',animation:'spin 0.8s linear infinite'}} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:handle" element={<ShopifyProductPage />} />
          <Route path="/products/:slug" element={<ShopifyProductPage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
