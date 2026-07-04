import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface BehanceProject {
  id: string;
  title: string;
  link: string;
  description: string;
  image: string;
  pubDate: string;
  source: string;
}

const sizeClasses = ["col-span-1 row-span-2", "col-span-1 row-span-1", "col-span-1 row-span-1", "col-span-1 md:col-span-2 row-span-1"];

const ProjectCard = ({ project, index }: { project: BehanceProject; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const sizeClass = sizeClasses[index % sizeClasses.length];

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden bg-card font-mono ${sizeClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver proyecto: ${project.title}`}
        className="absolute inset-0 z-10"
      />
      <motion.div className="w-full h-full" style={{ y }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-mono">
            no_preview.jpg
          </div>
        )}
      </motion.div>

      {/* Terminal overlay */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/90 transition-all duration-500 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
        <div className="absolute top-3 left-3 text-xs text-muted-foreground opacity-60">
          [{String(index + 1).padStart(2, "0")}]
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 text-background space-y-2">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-destructive/80" />
            <span className="w-2 h-2 rounded-full bg-muted/50" />
            <span className="w-2 h-2 rounded-full bg-muted/50" />
            <span className="text-[10px] ml-2 opacity-60">behance.exe</span>
          </div>
          <h3 className="text-base md:text-lg font-medium">
            <span className="text-background/50">$ </span>
            {project.title}
          </h3>
          {project.description && (
            <p className="text-[11px] opacity-70 line-clamp-2">{project.description}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] px-2 py-0.5 border border-background/30 text-background/80">
              behance ↗
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectGrid = () => {
  const [projects, setProjects] = useState<BehanceProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/behance-projects.json`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section id="proyectos" className="px-4 md:px-8 py-12 md:py-20">
      <div className="font-mono text-muted-foreground text-sm mb-6">
        <span className="opacity-50">// fetching projects...</span>
        <br />
        <span className="text-foreground font-medium">$ ls ./proyectos</span>
        {!loading && (
          <span className="ml-2 opacity-60">
            =&gt; {projects.length} items found
          </span>
        )}
      </div>

      {loading && (
        <div className="font-mono text-sm text-muted-foreground animate-pulse">
          $ loading projects...
        </div>
      )}

      {error && (
        <div className="font-mono text-sm text-destructive">
          error: no se pudieron cargar los proyectos
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[280px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectGrid;
