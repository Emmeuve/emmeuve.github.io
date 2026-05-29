import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import { projects, type Project } from "@/data/projects";

const sizeClasses = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 row-span-1",
  large: "col-span-1 row-span-2",
  wide: "col-span-1 md:col-span-2 row-span-1",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden bg-card font-mono ${sizeClasses[project.size]}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        to={`/case-study/${project.slug}`}
        aria-label={`Ver caso de estudio: ${project.title}`}
        className="absolute inset-0 z-10"
      />
      <motion.div className="w-full h-full" style={{ y }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-30"
        />
      </motion.div>

      {/* Terminal overlay */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/90 transition-all duration-500 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
        {/* Always visible index */}
        <div className="absolute top-3 left-3 text-xs text-muted-foreground opacity-60">
          [{String(index + 1).padStart(2, "0")}]
        </div>

        {/* Hover content */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 text-background space-y-2">
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-destructive/80" />
            <span className="w-2 h-2 rounded-full bg-muted/50" />
            <span className="w-2 h-2 rounded-full bg-muted/50" />
            <span className="text-[10px] ml-2 opacity-60">project.exe</span>
          </div>

          <p className="text-[10px] uppercase tracking-widest opacity-60">
            <span className="text-background/50">// </span>
            {project.category}
          </p>

          <h3 className="text-base md:text-lg font-medium">
            <span className="text-background/50">$ </span>
            {project.title}
          </h3>

          {/* Tech stack */}
          <div className="flex gap-2 flex-wrap mt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 border border-background/30 text-background/70"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-xs opacity-50 mt-3">
            <span className="text-background/40">{">"} </span>
            click to view_
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectGrid = () => {
  return (
    <section id="proyectos" className="w-full py-8 md:py-12 font-mono">
      <div className="container px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="mb-6 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground">
            <span className="opacity-50">{"// "}</span>
            fetching projects...
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-muted-foreground">$ ls </span>
            ./proyectos
          </h2>
          <p className="text-sm text-muted-foreground">
            <span className="opacity-50">{"=>"} </span>
            {projects.length} items found
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[250px] md:auto-rows-[300px]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
