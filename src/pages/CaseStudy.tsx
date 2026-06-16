import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col font-mono">
        <Header />
        <main className="flex-1 container px-4 md:px-8 py-24">
          <p className="text-sm text-muted-foreground">
            <span className="opacity-50">{"// "}</span>error 404
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            <span className="text-muted-foreground">$ </span>project_not_found
          </h1>
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2 mt-8 text-sm border border-border px-4 py-2 hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> volver a proyectos
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen flex flex-col font-mono">
      <Header />
      <main className="flex-1">
        <article className="container px-4 md:px-8 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#proyectos"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-3 h-3" /> cd ../proyectos
            </Link>

            <p className="text-xs text-muted-foreground">
              <span className="opacity-50">{"// "}</span>
              {project.category} · {project.year}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">
              <span className="text-muted-foreground">$ </span>
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl">
              {project.overview}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 text-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { label: "client", value: project.client },
              { label: "role", value: project.role },
              { label: "year", value: project.year },
              { label: "stack", value: project.tech.join(", ") },
            ].map((item) => (
              <div key={item.label} className="border border-border p-3">
                <p className="text-muted-foreground uppercase tracking-widest text-[10px]">
                  {item.label}
                </p>
                <p className="mt-1">{item.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 overflow-hidden border border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <section className="mt-16 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-semibold">
                <span className="text-muted-foreground">{"// "}</span>problem
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                <span className="text-muted-foreground">{"// "}</span>outcome
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold">
              <span className="text-muted-foreground">{"// "}</span>process
            </h2>
            <ol className="mt-4 space-y-3">
              {project.process.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm border-l border-border pl-4"
                >
                  <span className="text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <h2 className="text-xl font-semibold mb-4">
              <span className="text-muted-foreground">{"// "}</span>gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {project.gallery.map((src, i) => (
                <div key={i} className="overflow-hidden border border-border">
                  <img
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <Link
            to={`/case-study/${next.slug}`}
            className="mt-20 flex items-center justify-between border-t border-border pt-8 group"
          >
            <div>
              <p className="text-xs text-muted-foreground">next_project {">"}</p>
              <p className="text-xl md:text-2xl font-semibold mt-1 group-hover:translate-x-1 transition-transform">
                {next.title}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
