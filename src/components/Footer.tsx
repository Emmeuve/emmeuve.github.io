import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full py-12 bg-primary text-primary-foreground font-mono"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container px-4 md:px-8">
        {/* Terminal header */}
        <motion.div
          className="flex items-center gap-2 text-xs mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/20" />
          </div>
          <span className="ml-2 opacity-60">~/portfolio/footer.sh</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
>
  <p className="text-xs opacity-50">
    <span className="opacity-60">{"// "}</span>
    © 2025 michel.valenzuela.castillo
  </p>
  <p className="text-xs opacity-40">
    <span className="opacity-60">{"// "}</span>
    Built with React + TypeScript
  </p>
</motion.div>

          <motion.nav
            className="flex flex-wrap gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { href: "#proyectos", label: "proyectos", cmd: "cd" },
              { href: "#sobre-mi", label: "sobre_mi", cmd: "cat" },
              { href: "#contacto", label: "contacto", cmd: "mail" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs hover:opacity-100 opacity-60 transition-opacity duration-300 flex items-center gap-1 group"
              >
                <span className="opacity-50 group-hover:opacity-70">{link.cmd}</span>
                <span className="group-hover:underline underline-offset-4">{link.label}</span>
              </a>
            ))}
          </motion.nav>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { name: "LinkedIn", prefix: "@", href: "https://linkedin.com/in/michelvalenzuelacastillo" },
              { name: "Behance", prefix: "~/", href: "https://behance.net/Emmeuve" },
              { name: "Portfolio", prefix: "git:", href: "https://emmeuve.github.io" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:opacity-100 opacity-60 transition-opacity duration-300 group flex items-center"
              >
                <span className="opacity-50 group-hover:opacity-70">{social.prefix}</span>
                <span className="group-hover:underline underline-offset-4">{social.name.toLowerCase()}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Closing terminal line */}
        <motion.div
          className="mt-8 pt-4 border-t border-primary-foreground/10 text-xs opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="opacity-60">$ </span>
          exit <span className="animate-pulse">█</span>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
