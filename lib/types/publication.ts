/**
 * Autor de una publicación.
 * Por ahora lo tratamos como un string simple ("Dra. Ana Pérez").
 * Si en el futuro necesitas afiliación, avatar, ORCID, etc.,
 * puedes cambiarlo a un objeto sin romper demasiado el código.
 */
export type PublicationAuthor = string;

/**
 * Datos mínimos para renderizar una tarjeta en el listado.
 * Es lo que devolverá GET /api/publications (versión ligera).
 */
export interface PublicationPreview {
  /** Identificador único usado en la URL: /publications/[slug] */
  slug: string;

  /** Título visible de la publicación */
  title: string;

  /** Autor o autores */
  author: PublicationAuthor;

  /** Fecha en formato ISO 8601, ej: "2026-06-15" */
  date: string;

  /** Resumen corto para la tarjeta y para SEO */
  excerpt: string;

  /** URL de la imagen de portada (opcional) */
  coverImage?: string;

  /** Etiquetas para filtrar o relacionar publicaciones */
  tags: string[];
}

/**
 * Publicación completa, incluyendo el contenido MDX.
 * Es lo que devolverá GET /api/publications/:slug.
 *
 * Nota: extiende PublicationPreview, así que hereda
 * todos sus campos y solo añade `content`.
 */
export interface Publication extends PublicationPreview {
  /** Contenido en formato MDX (string crudo, sin compilar) */
  content: string;
}

/**
 * Respuesta del endpoint de listado.
 * Útil si más adelante añades paginación.
 */
export interface PublicationsListResponse {
  data: PublicationPreview[];
  total: number;
}

/**
 * Respuesta del endpoint de detalle.
 */
export interface PublicationDetailResponse {
  data: Publication;
}