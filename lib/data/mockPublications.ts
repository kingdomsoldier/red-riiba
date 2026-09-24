import type { PublicationPreview } from "@/lib/types/publication";

/**
 * Datos mock que simulan la respuesta del backend.
 * Se usan MIENTRAS no exista una API real.
 * Cuando el backend esté listo, este archivo se puede eliminar.
 *
 * Nota: los slugs son únicos, las fechas están en formato ISO (YYYY-MM-DD)
 * y los tags incluyen "news" en algunas para probar el filtrado.
 */
export const mockPublications: PublicationPreview[] = [
  {
    slug: "nueva-alianza-internacional-bienestar-animal",
    title: "RED-RIIBA firma nueva alianza internacional para el bienestar animal",
    author: "Comité Coordinador RED-RIIBA",
    date: "2026-09-10",
    excerpt:
      "La red amplía su alcance con la incorporación de tres nuevas instituciones de América Latina, reforzando la cooperación científica bajo el enfoque «Una Sola Salud – Un Bienestar».",
    coverImage:
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&q=80",
    tags: ["news", "cooperacion"],
  },
  {
    slug: "taller-internacional-diagnostico-fisiologico",
    title: "Taller internacional sobre diagnóstico fisiológico en rumiantes",
    author: "Dra. Ana Pérez",
    date: "2026-08-28",
    excerpt:
      "Investigadores de Cuba, México y Uruguay se reunieron para compartir avances en dispositivos de detección de parásitos gastrointestinales.",
    coverImage:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80",
    tags: ["news", "investigacion"],
  },
  {
    slug: "convocatoria-publicaciones-cientificas-2026",
    title: "Convocatoria abierta para publicaciones científicas 2026",
    author: "Secretaría Técnica",
    date: "2026-08-15",
    excerpt:
      "Invitamos a los miembros de la red a enviar sus artículos originales para la edición especial de Bienestar Animal y Sostenibilidad.",
    tags: ["news", "investigacion"],
  },
  {
    slug: "enfoque-una-sola-salud-bienestar",
    title: "El enfoque «Una Sola Salud – Un Bienestar» en la producción animal",
    author: "Dr. Carlos Méndez",
    date: "2026-07-30",
    excerpt:
      "Análisis de cómo la integración de la salud humana, animal y ambiental transforma las prácticas productivas en la región.",
    coverImage:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    tags: ["investigacion", "bienestar-animal"],
  },
  {
    slug: "mejoramiento-genetico-resistencia-gastrica",
    title: "Mejoramiento genético para resistencia a infecciones gástricas",
    author: "Dra. Marta Rodríguez",
    date: "2026-07-18",
    excerpt:
      "Resultados preliminares de un estudio multinacional sobre sementales resistentes a parásitos gastrointestinales en climas tropicales.",
    tags: ["investigacion", "genetica"],
  },
  {
    slug: "gestion-aguas-residuales-granjas",
    title: "Gestión sostenible de aguas residuales en granjas",
    author: "Ing. Luis Fernández",
    date: "2026-07-05",
    excerpt:
      "Sistemas de tratamiento que reducen la contaminación y protegen los recursos hídricos en sistemas de producción intensiva.",
    coverImage:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80",
    tags: ["sostenibilidad", "investigacion"],
  },
  {
    slug: "legislacion-bienestar-animal-latinoamerica",
    title: "Panorama de la legislación en bienestar animal en Latinoamérica",
    author: "Dra. Sofía Vargas",
    date: "2026-06-22",
    excerpt:
      "Estudio comparado de las normativas vigentes en ocho países de la región y recomendaciones para su armonización.",
    tags: ["legislacion", "investigacion"],
  },
  {
    slug: "movilidad-academica-convocatoria-2026",
    title: "Convocatoria de movilidad académica entre instituciones miembros",
    author: "Secretaría Técnica",
    date: "2026-06-10",
    excerpt:
      "Programa de intercambio para investigadores y estudiantes de posgrado interesados en bienestar animal y sostenibilidad.",
    tags: ["news", "cooperacion"],
  },
  {
    slug: "modelos-predictivos-enfermedades-animales",
    title: "Modelos predictivos para la detección temprana de enfermedades animales",
    author: "Dr. Alejandro Núñez",
    date: "2026-05-28",
    excerpt:
      "Aplicación de análisis de datos y machine learning en la predicción de brotes en sistemas de producción ganadera.",
    coverImage:
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=1200&q=80",
    tags: ["investigacion", "tecnologia"],
  },
  {
    slug: "educacion-nutricional-comunidades-rurales",
    title: "Educación nutricional en comunidades rurales y bienestar animal",
    author: "Dra. Elena Castillo",
    date: "2026-05-14",
    excerpt:
      "Programas educativos que vinculan la alimentación animal, la seguridad alimentaria y la salud comunitaria.",
    tags: ["educacion", "bienestar-animal"],
  },
  {
    slug: "construccion-sostenible-instalaciones-ganaderas",
    title: "Construcción sostenible de instalaciones ganaderas",
    author: "Arq. Pablo Herrera",
    date: "2026-04-30",
    excerpt:
      "Materiales y técnicas ecológicas compatibles con las necesidades fisiológicas y de bienestar de los animales.",
    coverImage:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    tags: ["sostenibilidad", "infraestructura"],
  },
  {
    slug: "impacto-social-bienestar-animal-comunidades",
    title: "Impacto social del bienestar animal en comunidades locales",
    author: "Dra. Rosa Delgado",
    date: "2026-04-12",
    excerpt:
      "Estudio sobre cómo las prácticas inadecuadas de bienestar animal afectan la economía y la cohesión social.",
    tags: ["investigacion", "social"],
  },
  {
    slug: "reproduccion-biotecnologia-aplicada",
    title: "Biotecnologías reproductivas aplicadas al bienestar animal",
    author: "Dr. Fernando Ríos",
    date: "2026-03-25",
    excerpt:
      "Avances en inseminación artificial, transferencia de embriones y criopreservación con enfoque en bienestar.",
    coverImage:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80",
    tags: ["investigacion", "biotecnologia"],
  },
  {
    slug: "productos-naturales-prevencion-enfermedades",
    title: "Productos naturales en la prevención de enfermedades animales",
    author: "Dra. Carmen Solís",
    date: "2026-03-08",
    excerpt:
      "Validación científica de alternativas naturales para reducir la dependencia de productos sintéticos.",
    tags: ["investigacion", "bienestar-animal"],
  },
  {
    slug: "ingenieria-informatica-produccion-animal",
    title: "Ingeniería informática aplicada a la producción animal",
    author: "Ing. Daniel Ortiz",
    date: "2026-02-20",
    excerpt:
      "Soluciones digitales para la optimización de sistemas productivos y el monitoreo del bienestar animal.",
    coverImage:
      "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=1200&q=80",
    tags: ["tecnologia", "investigacion"],
  },
  {
    slug: "optimizacion-recursos-sistemas-productivos",
    title: "Optimización de recursos en sistemas productivos sostenibles",
    author: "Ing. Laura Jiménez",
    date: "2026-02-05",
    excerpt:
      "Algoritmos y modelos matemáticos para la gestión eficiente del agua, alimento y energía en granjas.",
    tags: ["sostenibilidad", "tecnologia"],
  },
  {
    slug: "seguridad-alimentaria-bienestar-animal",
    title: "Seguridad alimentaria y bienestar animal: una relación inseparable",
    author: "Dr. Roberto Aguilar",
    date: "2026-01-22",
    excerpt:
      "Reflexión sobre cómo las prácticas de bienestar animal impactan directamente en la calidad e inocuidad de los alimentos.",
    coverImage:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
    tags: ["investigacion", "bienestar-animal"],
  },
  {
    slug: "fundacion-red-riiba-la-habana",
    title: "Constitución oficial de RED-RIIBA en La Habana",
    author: "Comité Fundador",
    date: "2026-01-15",
    excerpt:
      "Representantes de seis países formalizaron la creación de la red internacional bajo el enfoque «Una Sola Salud – Un Bienestar».",
    tags: ["news", "cooperacion"],
  },
];