import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-mono">
      <Header />
      <main className="flex-1">
        <section className="container px-4 md:px-8 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-3 h-3" /> cd ..
            </Link>

            <p className="text-xs text-muted-foreground">
              <span className="opacity-50">{"// "}</span>notas y aprendizajes
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">
              <span className="text-muted-foreground">$ </span>blog
            </h1>
          </motion.div>

          <div className="mt-12 space-y-8 max-w-2xl">
            {posts.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Todavía no hay posts publicados.
              </p>
            )}

            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="border-b border-border pb-8"
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  {post.date && (
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold mt-1 group-hover:underline underline-offset-4">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs mt-3 text-foreground/70 group-hover:text-foreground transition-colors">
                    leer más <ArrowRight className="w-3 h-3" />
                  </span>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wide border border-border px-2 py-0.5 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
