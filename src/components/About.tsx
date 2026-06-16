import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "figma", level: 92 },
  { name: "adobe_xd", level: 85 },
  { name: "illustrator", level: 88 },
  { name: "photoshop", level: 90 },
  { name: "html5_css3", level: 85 },
  { name: "javascript", level: 70 },
  { name: "ruby_on_rails", level: 65 },
  { name: "wordpress", level: 78 },
];

const experience = [
  { role: "diseñador_independiente", company: "freelance", period: "2024 — actualidad", status: "active" },
  { role: "admin_sistemas", company: "tivit", period: "2018 — 2025", status: "completed" },
  { role: "operador_sistemas_I", company: "dxc_technology", period: "2016 — 2017", status: "completed" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rightY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="sobre-mi" ref={sectionRef} className="w-full py-24 md:py-32 bg-card overflow-hidden font-mono">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column */}
          <motion.div style={{ y: leftY, opacity }}>
            {/* Terminal header */}
            <motion.div
              className="flex items-center gap-2 text-xs mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/60" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              </div>
              <span className="ml-2 text-muted-foreground">~/about/readme.md</span>
            </motion.div>

            <motion.div
              className="text-xs text-muted-foreground mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="opacity-50">$ </span>
              cat sobre_mi.txt
            </motion.div>

            <motion.div
              className="border-l-2 border-muted-foreground/30 pl-4 space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm md:text-base leading-relaxed">
                <span className="text-muted-foreground opacity-60">{"// "}</span>
                Diseñador Gráfico con especialización en UX/UI y Desarrollo 
                Web Front-End.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="text-muted-foreground opacity-60">{"// "}</span>
                Combino base técnica y visual para crear soluciones digitales 
                centradas en el usuario.
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="opacity-60">{"// "}</span>
                Experiencia en branding, interfaces, prototipado y desarrollo 
                con Ruby on Rails y PostgreSQL.
              </p>
            </motion.div>

            {/* Code block info */}
            <motion.div
              className="mt-8 text-xs md:text-sm space-y-1 bg-primary/5 p-4 border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                <span className="text-muted-foreground">const </span>
                <span className="text-foreground">designer</span>
                <span className="text-muted-foreground"> = </span>
                <span className="text-foreground">{`{`}</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">name: </span>
                <span className="text-foreground">"michel.valenzuela"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">role: </span>
                <span className="text-foreground">"UX/UI Designer"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">location: </span>
                <span className="text-foreground">"Santiago, CL"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">available: </span>
                <span className="text-green-500">true</span>
              </p>
              <p>
                <span className="text-foreground">{`}`}</span>
                <span className="text-muted-foreground">;</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills & Experience */}
          <motion.div style={{ y: rightY }} className="space-y-10">
            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-xs mb-4 text-muted-foreground">
                <span className="opacity-50">$ </span>
                <span>npm run check_skills</span>
              </div>
              
              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-1"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <div className="flex justify-between text-xs">
                      <span>
                        <span className="text-muted-foreground opacity-60">skill.</span>
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1" />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-3 opacity-60">
                {"=>"} 8 skills loaded successfully
              </p>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-xs mb-4 text-muted-foreground">
                <span className="opacity-50">$ </span>
                <span>git log --experience</span>
              </div>
              
              <ul className="space-y-3 text-sm">
                {experience.map((exp, i) => (
                  <motion.li
                    key={exp.role}
                    className="border border-border p-3 space-y-1"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground opacity-60">
                        commit #{String(3 - i).padStart(3, "0")}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 ${
                        exp.status === "active" 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {exp.status}
                      </span>
                    </div>
                    <p className="font-medium">
                      <span className="text-muted-foreground opacity-60">{">"} </span>
                      {exp.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @ {exp.company} · {exp.period}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-xs mb-4 text-muted-foreground">
                <span className="opacity-50">$ </span>
                <span>cat /education/*.cert</span>
              </div>

              <ul className="space-y-3 text-sm">
                {[
                  { title: "diseño_gráfico_profesional", institution: "instituto_profesional_aiep", year: "2021", type: "título" },
                  { title: "bootcamp_ux_ui_design", institution: "talento_digital", year: "2024", type: "certificación" },
                  { title: "bootcamp_ruby_on_rails", institution: "talento_digital", year: "2023", type: "certificación" },
                ].map((edu, i) => (
                  <motion.li
                    key={edu.title}
                    className="border border-border p-3 space-y-1"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground opacity-60">
                        cert #{String(i + 1).padStart(3, "0")}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-accent text-accent-foreground">
                        {edu.type}
                      </span>
                    </div>
                    <p className="font-medium">
                      <span className="text-muted-foreground opacity-60">{">"} </span>
                      {edu.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @ {edu.institution} · {edu.year}
                    </p>
                  </motion.li>
                ))}
              </ul>

              <p className="text-xs text-muted-foreground mt-3 opacity-60">
                {"=>"} 3 certificates verified
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
