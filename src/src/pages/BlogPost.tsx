import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col font-mono">
        <Header />
        <main className="flex-1 container px-4 md:px-8 py-24">
          <p className="text-sm text-muted-foreground">
            <span className="opacity-50">{"// "}</span>error 404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            <span className="text-muted-foreground">$ </span>post_not_found
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 mt-8 text-sm border border-border px-4 py-2 hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> volver al blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-mono">
      <Header />
      <main className="flex-1">
        <article className="container px-4 md:px-8 py-12 md:py-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-3 h-3" /> cd ../blog
            </Link>

            {post.date && (
              <p className="text-xs text-muted-foreground">{post.date}</p>
            )}
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{post.title}</h1>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-neutral dark:prose-invert max-w-none mt-10
              prose-headings:font-mono prose-headings:font-bold
              prose-p:text-foreground/90 prose-p:leading-relaxed
              prose-a:text-foreground prose-a:underline
              prose-strong:text-foreground
              prose-li:text-foreground/90"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
