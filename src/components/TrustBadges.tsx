import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Flag } from "lucide-react";
import { trustBadges } from "@/data/products";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  repeat: <RefreshCw className="w-5 h-5" />,
  flag: <Flag className="w-5 h-5" />,
};

export default function TrustBadges() {
  return (
    <section className="bg-card border-y border-border py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustBadges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-gold mb-2.5">
                {iconMap[b.icon]}
              </div>
              <p className="font-semibold text-foreground text-sm">{b.title}</p>
              <p className="text-muted-foreground text-xs">{b.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
