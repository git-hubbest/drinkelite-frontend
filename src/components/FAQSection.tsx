import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/products";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-14 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 lg:mb-12">
          <p className="text-gold font-semibold uppercase tracking-[0.25em] text-xs lg:text-sm mb-2 lg:mb-3">FAQ</p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground">
            Questions? We've Got Answers.
          </h2>
        </div>

        <div className="space-y-2 lg:space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-card rounded-lg shadow-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
              >
                <span className="font-semibold text-foreground pr-4 text-sm lg:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 lg:w-5 lg:h-5 text-gold flex-shrink-0 transition-transform duration-200 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-4 lg:px-5 pb-4 lg:pb-5 text-muted-foreground text-xs lg:text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
