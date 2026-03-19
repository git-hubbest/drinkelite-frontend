import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28" />
      <FAQSection />
      <Footer />
    </div>
  );
}
