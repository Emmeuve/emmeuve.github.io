import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profileImg from "@/assets/profile.jpg";

const glitchWords = ["UX/UI Designer", "Front-End Dev", "Graphic Designer", "Creative", "Problem Solver"];

const GlitchText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % glitchWords.length);
        setIsGlitching(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[180px]">
      <span
        className={`transition-all duration-100 ${
          isGlitching
            ? "opacity-0 blur-sm translate-x-2"
            : "opacity-100 blur-0 translate-x-0"
        }`}
      >
        {glitchWords[currentIndex]}
      </span>
      {isGlitching && (
        <>
          <span className="absolute inset-0 text-destructive opacity-70 translate-x-[2px] translate-y-[1px]">
            {glitchWords[(currentIndex + 1) % glitchWords.length]}
          </span>
          <span className="absolute inset-0 text-accent-foreground opacity-70 -translate-x-[2px] -translate-y-[1px]">
            {glitchWords[(currentIndex + 2) % glitchWords.length]}
          </span>
        </>
      )}
    </span>
  );
};

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
    </span>
  );
};

const Header = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.header
      ref={ref}
      className="w-full bg-primary text-primary-foreground py-12 md:py-20 relative overflow-hidden font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="container px-4 md:px-8" style={{ y, opacity }}>
        <div className="flex flex-col gap-6">
          {/* Terminal Header */}
          <motion.div
            className="flex items-center gap-2 text-xs opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            </div>
            <span className="ml-2">~/portfolio/Michel.Valenzuela</span>
          </motion.div>

          {/* Code-style intro */}
          <motion.div
            className="text-xs md:text-sm opacity-70 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-muted-foreground">
              <span className="text-primary-foreground/60">{"// "}</span>
              <TypingText text="Initializing portfolio..." delay={500} />
            </p>
            <p>
              <span className="text-primary-foreground/60">$ </span>
              <span className="text-primary-foreground">whoami</span>
            </p>
          </motion.div>

          {/* Name with glitch effect */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={profileImg}
              alt="Michel Valenzuela"
              className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-2 border-primary-foreground/20 shrink-0"
            />
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                <span className="text-primary-foreground/40">{">"} </span>
                Michel Valenzuela Castillo
              </h1>
              <p className="text-lg md:text-xl font-light">
                <span className="text-primary-foreground/40">{"=>"} </span>
                <GlitchText />
              </p>
            </div>
          </motion.div>

          {/* Code block info */}
          <motion.div
            className="text-xs md:text-sm space-y-2 mt-4 border-l-2 border-primary-foreground/20 pl-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p>
              <span className="text-primary-foreground/50">const </span>
              <span className="text-primary-foreground">role</span>
              <span className="text-primary-foreground/50"> = </span>
              <span className="text-primary-foreground">"Diseñador UX/UI – Desarrollador Web Front-End"</span>
              <span className="text-primary-foreground/50">;</span>
            </p>
            <p>
              <span className="text-primary-foreground/50">const </span>
              <span className="text-primary-foreground">location</span>
              <span className="text-primary-foreground/50"> = </span>
              <span className="text-primary-foreground">"Santiago, Chile"</span>
              <span className="text-primary-foreground/50">;</span>
            </p>
            <p>
              <span className="text-primary-foreground/50">const </span>
              <span className="text-primary-foreground">status</span>
              <span className="text-primary-foreground/50"> = </span>
              <span className="text-green-400">"available"</span>
              <span className="text-primary-foreground/50">;</span>
            </p>
          </motion.div>

          {/* Navigation Links as commands */}
          <motion.nav
            className="flex flex-wrap gap-4 md:gap-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {[
              { href: "#proyectos", label: "proyectos", cmd: "cd" },
              { href: "#sobre-mi", label: "sobre_mi", cmd: "cat" },
              { href: "#contacto", label: "contacto", cmd: "mail" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm hover:text-primary-foreground/100 text-primary-foreground/70 transition-all duration-300 relative group flex items-center gap-1"
              >
                <span className="text-primary-foreground/40 group-hover:text-primary-foreground/60">
                  {link.cmd}
                </span>
                <span className="group-hover:underline underline-offset-4">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </motion.nav>

          {/* Blinking cursor line */}
          <motion.div
            className="text-xs opacity-50 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <span className="text-primary-foreground/40">$ </span>
            <span className="animate-pulse">█</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
