import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Flavor } from "@/data/products";

interface Props {
  flavor: Flavor;
  index: number;
}

export default function FlavorCard({ flavor, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <Link
        to={`/product/${flavor.slug}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
      >
        <div className="relative bg-secondary p-6 lg:p-8 flex items-center justify-center h-52 lg:h-80 overflow-hidden">
          <motion.img
            src={flavor.image}
            alt={flavor.name}
            className="h-40 lg:h-64 object-contain transition-transform duration-500 group-hover:scale-105"
            whileHover={{ rotate: 2 }}
          />
        </div>
        <div className="p-4 lg:p-6 text-center">
          <p className="text-xs lg:text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-1">{flavor.tagline}</p>
          <h3 className="font-display text-xl lg:text-xl font-bold text-foreground mb-1.5 lg:mb-2 uppercase">{flavor.name}</h3>
          <p className="text-muted-foreground text-sm lg:text-sm mb-3 lg:mb-4 line-clamp-2">{flavor.description}</p>
          <span className="inline-block bg-gradient-gold text-primary font-bold uppercase tracking-widest text-xs lg:text-xs px-5 lg:px-6 py-2.5 lg:py-2.5 rounded-sm group-hover:shadow-gold transition-all">
            Shop Now
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
