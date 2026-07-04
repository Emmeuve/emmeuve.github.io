import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  size: "small" | "medium" | "large" | "wide";
  tech: string[];
  year: string;
  role: string;
  client: string;
  overview: string;
  problem: string;
  process: string[];
  outcome: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "brand-identity",
    title: "brand_identity",
    category: "branding",
    image: project1,
    size: "large",
    tech: ["figma", "ai"],
    year: "2025",
    role: "Lead Brand Designer",
    client: "Independent Studio",
    overview:
      "Sistema de identidad visual completo para un estudio creativo emergente, enfocado en transmitir innovación y artesanía.",
    problem:
      "El estudio carecía de coherencia visual entre canales y necesitaba una identidad que escalara desde aplicaciones digitales hasta material impreso premium.",
    process: [
      "Investigación de marca y benchmarking competitivo",
      "Definición de territorio visual y moodboards",
      "Sistema tipográfico, paleta y construcción de logo",
      "Aplicaciones, guidelines y handoff",
    ],
    outcome:
      "Identidad lanzada en 8 semanas con un sistema modular que redujo el tiempo de producción de assets en un 40%.",
    gallery: [project1, project4, project7],
  },
  {
    id: 2,
    slug: "ecommerce-platform",
    title: "ecommerce_platform",
    category: "web_design",
    image: project2,
    size: "medium",
    tech: ["react", "ts"],
    year: "2024",
    role: "Product Designer",
    client: "Retail DTC",
    overview:
      "Rediseño del flujo de compra de una plataforma DTC, priorizando velocidad, claridad y conversión.",
    problem:
      "Tasa de abandono del carrito superior al 70% y un checkout fragmentado en 5 pasos con fricción visual.",
    process: [
      "Auditoría UX y análisis de funnels",
      "Wireframes de checkout en un paso",
      "Prototipos en alta fidelidad y pruebas con 12 usuarios",
      "Implementación con el equipo de ingeniería",
    ],
    outcome:
      "Aumento del 28% en conversión y reducción del 45% en tiempo de checkout tras 3 meses en producción.",
    gallery: [project2, project5, project8],
  },
  {
    id: 3,
    slug: "mobile-app",
    title: "mobile_app",
    category: "ui_ux",
    image: project3,
    size: "small",
    tech: ["swift", "figma"],
    year: "2024",
    role: "UI/UX Designer",
    client: "FinTech Startup",
    overview:
      "Diseño de una app móvil de finanzas personales centrada en hábitos de ahorro accionables.",
    problem:
      "Los usuarios no encontraban valor más allá de la primera semana; la retención a 30 días era del 14%.",
    process: [
      "Entrevistas con 18 usuarios objetivo",
      "Mapeo de journey y oportunidades",
      "Iteración de onboarding gamificado",
      "Pruebas de usabilidad y ajustes finales",
    ],
    outcome: "Retención a 30 días subió al 38% en el primer trimestre tras el rediseño.",
    gallery: [project3, project6, project1],
  },
  {
    id: 4,
    slug: "editorial-design",
    title: "editorial_design",
    category: "print",
    image: project4,
    size: "wide",
    tech: ["indesign", "ps"],
    year: "2023",
    role: "Art Director",
    client: "Cultural Magazine",
    overview:
      "Dirección de arte y diagramación de una revista cultural trimestral de 120 páginas.",
    problem:
      "La publicación necesitaba renovar su lenguaje visual sin perder la familiaridad de sus lectores históricos.",
    process: [
      "Definición de retícula modular",
      "Sistema tipográfico editorial",
      "Dirección fotográfica y colaboración con ilustradores",
      "Cierre de arte y supervisión de imprenta",
    ],
    outcome: "Edición agotada en 3 semanas y nominación a premios de diseño editorial.",
    gallery: [project4, project1, project7],
  },
  {
    id: 5,
    slug: "digital-campaign",
    title: "digital_campaign",
    category: "marketing",
    image: project5,
    size: "medium",
    tech: ["meta", "analytics"],
    year: "2024",
    role: "Creative Lead",
    client: "SaaS B2B",
    overview:
      "Campaña digital integrada para el lanzamiento de un producto SaaS en 4 mercados.",
    problem:
      "Bajo awareness en mercados nuevos y mensajes inconsistentes entre canales pagos y orgánicos.",
    process: [
      "Workshop de posicionamiento",
      "Sistema modular de assets para 6 formatos",
      "Test A/B de copies y creatividades",
      "Optimización quincenal basada en datos",
    ],
    outcome: "CTR 2.3x sobre benchmark de industria y CAC reducido en 31%.",
    gallery: [project5, project2, project8],
  },
  {
    id: 6,
    slug: "product-design",
    title: "product_design",
    category: "3d",
    image: project6,
    size: "small",
    tech: ["blender", "c4d"],
    year: "2023",
    role: "3D Designer",
    client: "Hardware Brand",
    overview:
      "Renders 3D de producto para landing page y materiales de campaña de lanzamiento.",
    problem:
      "Plazos de fotografía tradicional incompatibles con el roadmap de marketing.",
    process: [
      "Modelado a partir de archivos CAD",
      "Estudio de materiales y lighting",
      "Iteraciones de composición con marketing",
      "Render final y entregables animados",
    ],
    outcome: "12 piezas entregadas en una semana, ahorrando 60% vs. producción fotográfica.",
    gallery: [project6, project3, project8],
  },
  {
    id: 7,
    slug: "photography",
    title: "photography",
    category: "visual",
    image: project7,
    size: "large",
    tech: ["lightroom", "ps"],
    year: "2024",
    role: "Photographer & Retoucher",
    client: "Fashion Label",
    overview:
      "Dirección visual y fotografía de campaña de temporada para marca de moda independiente.",
    problem:
      "Necesidad de un look diferenciado en un mercado saturado con presupuesto ajustado.",
    process: [
      "Moodboard y casting",
      "Producción en locación con equipo reducido",
      "Selección y revelado de 40 piezas finales",
      "Retoque y entrega de master files",
    ],
    outcome: "Engagement en redes 3x superior a campañas previas de la marca.",
    gallery: [project7, project4, project1],
  },
  {
    id: 8,
    slug: "motion-graphics",
    title: "motion_graphics",
    category: "animation",
    image: project8,
    size: "wide",
    tech: ["ae", "figma"],
    year: "2025",
    role: "Motion Designer",
    client: "Tech Conference",
    overview:
      "Sistema de motion graphics para identidad en pantalla de una conferencia tech internacional.",
    problem:
      "La identidad estática perdía impacto en pantallas grandes y streams en vivo.",
    process: [
      "Definición de principios de movimiento",
      "Plantillas modulares en After Effects",
      "Loops, transiciones y stings",
      "Entrega de toolkit reutilizable",
    ],
    outcome: "Toolkit reutilizado en 3 ediciones siguientes del evento.",
    gallery: [project8, project5, project2],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
