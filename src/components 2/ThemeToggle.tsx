import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 text-xs font-mono px-3 py-1.5 border border-primary-foreground/30 bg-primary/80 text-primary-foreground backdrop-blur-sm hover:bg-primary transition-colors duration-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      aria-label="Toggle theme"
    >
      <span className="opacity-50">$ </span>
      {isDark ? "theme --light" : "theme --dark"}
    </motion.button>
  );
};

export default ThemeToggle;
