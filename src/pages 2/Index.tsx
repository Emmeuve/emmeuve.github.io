import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <Header />
      <ProjectGrid />
      <About />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
