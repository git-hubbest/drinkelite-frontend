import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "energy-drink-industry-2025",
    title: "The State of Energy Drinks in 2025: What the Data Says (And Why It Matters)",
    excerpt: "New research reveals that 73% of energy drink consumers are actively seeking cleaner alternatives. Here's what the latest data tells us about where the industry is headed.",
    date: "March 12, 2025",
    readTime: "6 min read",
    category: "Science & Wellness",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 lg:pt-28" />

      <section className="container mx-auto px-4 py-10 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-16">
          <p className="text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-2">The ELITE Journal</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-4">Guides & Insights</h1>
          <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto">
            Deep dives into the science of energy, performance, and what actually goes into your can.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block group border border-border rounded-xl p-6 lg:p-8 hover:border-gold/50 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <span className="text-gold text-xs font-bold uppercase tracking-wider">{post.category}</span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2 mb-3 group-hover:text-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
