import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Error: name is required" })
    .max(100, { message: "Error: name exceeds 100 chars" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Error: email is required" })
    .email({ message: "Error: invalid email format" })
    .max(255, { message: "Error: email exceeds 255 chars" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Error: message is required" })
    .max(1000, { message: "Error: message exceeds 1000 chars" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const validateField = (field: keyof ContactFormData, value: string) => {
    const fieldSchema = contactSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.errors[0].message,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormErrors;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "✓ Message sent successfully",
      description: "I'll get back to you soon. Thanks!",
    });

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <section id="contacto" ref={sectionRef} className="w-full py-24 md:py-32 bg-background overflow-hidden font-mono">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Info */}
          <motion.div style={{ y: leftY }}>
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
              <span className="ml-2 text-muted-foreground">~/contact/init.sh</span>
            </motion.div>

            <motion.div
              className="text-xs text-muted-foreground mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="opacity-50">$ </span>
              mail --new-message
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
                ¿Tienes un proyecto en mente?
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="text-muted-foreground opacity-60">{"// "}</span>
                Me encantaría escucharte y explorar cómo puedo ayudarte a hacerlo realidad.
              </p>
            </motion.div>
            
            <motion.div
              className="mt-8 text-xs md:text-sm space-y-1 bg-primary/5 p-4 border border-border"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                <span className="text-muted-foreground">const </span>
                <span className="text-foreground">contact</span>
                <span className="text-muted-foreground"> = </span>
                <span className="text-foreground">{`{`}</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">email: </span>
                <span className="text-foreground">"michelvalencastillo@gmail.com"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">phone: </span>
                <span className="text-foreground">"+56 9 4794 7310"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">linkedin: </span>
                <span className="text-foreground">"@michelvalenzuelacastillo"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">behance: </span>
                <span className="text-foreground">"behance.net/Emmeuve"</span>
                <span className="text-muted-foreground">,</span>
              </p>
              <p className="pl-4">
                <span className="text-muted-foreground">portfolio: </span>
                <span className="text-foreground">"emmeuve.github.io"</span>
              </p>
              <p>
                <span className="text-foreground">{`}`}</span>
                <span className="text-muted-foreground">;</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div style={{ y: rightY }}>
            <motion.div
              className="text-xs text-muted-foreground mb-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="opacity-50">{">"} </span>
              new Message()
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6 border border-border p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-2"
              >
                <label htmlFor="name" className="text-xs block text-muted-foreground">
                  <span className="opacity-60">const </span>
                  name<span className="opacity-60"> = </span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors ${
                    errors.name
                      ? "border-destructive"
                      : "border-border focus:border-foreground"
                  }`}
                  placeholder='"Tu nombre"'
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-xs block text-muted-foreground">
                  <span className="opacity-60">const </span>
                  email<span className="opacity-60"> = </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors ${
                    errors.email
                      ? "border-destructive"
                      : "border-border focus:border-foreground"
                  }`}
                  placeholder='"tu@email.com"'
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <label htmlFor="message" className="text-xs block text-muted-foreground">
                  <span className="opacity-60">const </span>
                  message<span className="opacity-60"> = </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? "border-destructive"
                      : "border-border focus:border-foreground"
                  }`}
                  placeholder='`Cuéntame sobre tu proyecto...`'
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive"
                  >
                    {errors.message}
                  </motion.p>
                )}
                <p className="text-[10px] text-muted-foreground text-right opacity-60">
                  {formData.message.length}/1000 chars
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full px-6 py-3 text-xs tracking-wider transition-all duration-300 border ${
                    isSuccess
                      ? "bg-green-500/20 border-green-500 text-green-500"
                      : "bg-foreground text-background border-foreground hover:bg-transparent hover:text-foreground"
                  } disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-pulse">⟳</span>
                      $ sending...
                    </span>
                  ) : isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      ✓ message.sent()
                    </span>
                  ) : (
                    <span>$ npm run send_message</span>
                  )}
                </button>
              </motion.div>
            </form>

            <p className="text-[10px] text-muted-foreground mt-3 opacity-50">
              {"// "} All fields are required. Your data is safe.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
