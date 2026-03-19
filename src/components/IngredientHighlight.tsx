import { motion } from "framer-motion";
import { Zap, Brain, Leaf, Beaker, Pill } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  caffeine: <Zap className="w-6 h-6" />,
  theanine: <Brain className="w-6 h-6" />,
  lionsmane: <Beaker className="w-6 h-6" />,
  ashwagandha: <Leaf className="w-6 h-6" />,
  bcomplex: <Pill className="w-6 h-6" />,
};

interface Props {
  ingredient: { name: string; amount: string; description: string; icon: string };
  index: number;
}

export default function IngredientHighlight({ ingredient, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-navy-light/30 border border-primary-foreground/10 rounded-lg p-6 text-center hover:border-gold/40 transition-colors duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-3">
        {iconMap[ingredient.icon]}
      </div>
      <p className="text-gold font-bold text-lg mb-1">{ingredient.amount}</p>
      <p className="text-primary-foreground font-semibold text-sm">{ingredient.name}</p>
    </motion.div>
  );
}
