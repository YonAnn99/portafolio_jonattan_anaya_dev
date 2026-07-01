export interface Profile {
  name: string;
  shortName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  summary: string;
}

export interface SkillGroup {
  table: string;
  label: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  points: string[];
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
}

export interface Education {
  title: string;
  org: string;
  period: string;
}

export interface Certification {
  title: string;
  org: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface NavItem {
  href: string;
  label: string;
  table: string;
}

export const profile: Profile = {
  name: "Pablo Jonattan Alonso Anaya",
  shortName: "Jonattan Alonso",
  role: "Ingeniero en Informática · Data Developer · Data Analyst",
  location: "Ecatepec de Morelos, México",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "(56) 35-3635-77",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "jonattan10.99@hotmail.com",
  github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/YonAnn99",
  summary:
    "Ingeniero en Informática especializado en el desarrollo de bases de datos, automatización de procesos (ETL) y análisis de datos de negocio. Experiencia sólida diseñando e implementando soluciones tecnológicas con Python y SQL aplicadas a la optimización de inventarios, auditoría de datos y sistemas de gestión de capital humano. Proactivo, analítico y enfocado en transformar grandes volúmenes de datos en ventajas operativas y financieras mediante el uso de lógica estructurada e inteligencia artificial.",
};

export const skillGroups: SkillGroup[] = [
  {
    table: "lenguajes",
    label: "Lenguajes de programación",
    items: ["Python (Pandas, NumPy, Django, Requests)", "Java", "VBA (Excel avanzado / Macros)"],
  },
  {
    table: "bases_de_datos",
    label: "Gestión de bases de datos — SQL Server",
    items: [
      "Stored Procedures y funciones definidas por el usuario (UDF)",
      "Vistas e integridad referencial",
      "Optimización de consultas (indexing, execution plans)",
    ],
  },
  {
    table: "analisis_datos",
    label: "Análisis y visualización de datos",
    items: ["Power BI", "Tratamiento de datos (data cleansing)", "Estructuras de datos"],
  },
  {
    table: "tecnologias_emergentes",
    label: "Tecnologías emergentes",
    items: [
      "Prompt engineering (IA generativa aplicada al análisis de mercado)",
      "Fundamentos de Machine Learning",
      "Redes neuronales",
    ],
  },
  {
    table: "herramientas",
    label: "Herramientas y entornos",
    items: ["GitHub", "Linux", "Windows", "Arquitectura de integración de datos corporativos"],
  },
];

export const experience: Experience[] = [
  {
    id: "acrylitec",
    role: "Desarrollador de Software Integral",
    org: "ACRYLITEC — Proyecto de Residencias Profesionales",
    period: "Enero 2026 — Junio 2026",
    points: [
      "Diseñé y desarrollé desde cero un sistema centralizado de inventarios y cotizaciones utilizando Python (Django) y bases de datos relacionales, acumulando más de 400 horas de ingeniería de software.",
      "Aseguré el control y la integridad de los datos operativos de la empresa, implementando lógica de validación que redujo errores de captura.",
      "Brindé soporte técnico avanzado y capacitación sobre la gestión de la base de datos, garantizando la escalabilidad del sistema.",
    ],
    stack: ["Python", "Django", "SQL", "Arquitectura de datos"],
  },
  {
    id: "premium-brand",
    role: "Desarrollador de Base de Datos y Automatización (RH)",
    org: "Premium Brand Restaurant",
    period: "Julio 2025 — Enero 2026",
    points: [
      "Desarrollo SQL avanzado: creación, depuración y mantenimiento de Stored Procedures, vistas y funciones para la gestión masiva y migración de datos de colaboradores (altas, bajas e incidencias).",
      "Automatización (ETL): diseño e implementación de scripts en Python para automatizar flujos de trabajo repetitivos y conciliaciones de reportes masivos, reduciendo tiempos de procesamiento.",
      "Integridad de datos: administración y depuración de registros biométricos de asistencia y vacaciones a nivel nacional, garantizando la integridad de la información crítica para el cálculo de nómina.",
    ],
    stack: ["SQL Server", "Python", "ETL", "Automatización"],
  },
];

export const projects: Project[] = [
  {
    id: "inventario-acrylitec",
    title: "Sistema de inventarios y cotizaciones",
    org: "ACRYLITEC",
    description:
      "Plataforma centralizada construida con Django para gestionar inventario y cotizaciones en tiempo real, con reglas de validación que redujeron los errores de captura y una arquitectura pensada para escalar junto con la operación.",
    tags: ["Python", "Django", "SQL", "Validación de datos"],
  },
  {
    id: "etl-rh",
    title: "Automatización ETL para gestión de personal",
    org: "Premium Brand Restaurant",
    description:
      "Scripts en Python que automatizan la conciliación de reportes masivos de RH y depuran registros biométricos de asistencia a nivel nacional, apoyados en Stored Procedures y vistas de SQL Server para un cálculo de nómina confiable.",
    tags: ["SQL Server", "Python", "ETL", "Stored Procedures"],
  },
];

export const education: Education[] = [
  {
    title: "Ingeniería Informática",
    org: "Tecnológico de Estudios Superiores de Ecatepec",
    period: "Titulación",
  },
];

export const certifications: Certification[] = [
  { title: "Data Analytics", org: "Google", year: "2025" },
  { title: "Microsoft Office Specialist: Excel Certification", org: "Santander Open Academy", year: "2024" },
  { title: "Curso Desarrollo de Apps Móviles", org: "Google · Azcapotzalco, CDMX", year: "2023" },
  { title: "MTA: Introduction to Programming Using Python", org: "Santander Open Academy", year: "2024" },
];

export const languages: Language[] = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "B1 · Preparación activa para B2" },
];

export const nav: NavItem[] = [
  { href: "#sobre-mi", label: "Sobre mí", table: "about" },
  { href: "#habilidades", label: "Habilidades", table: "skills" },
  { href: "#experiencia", label: "Experiencia", table: "experience" },
  { href: "#proyectos", label: "Proyectos", table: "projects" },
  { href: "#contacto", label: "Contacto", table: "contact" },
];
