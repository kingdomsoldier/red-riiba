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
 * Respuesta paginada del endpoint de listado.
 * Es lo que devuelve GET /api/publications?page=1&limit=12&tag=news&q=...
 *
 * Contrato con el backend:
 * - data: página actual de publicaciones
 * - total: número total de publicaciones que cumplen los filtros
 * - page: página actual (1-indexada)
 * - limit: tamaño de página solicitado
 * - hasMore: true si hay más páginas después de esta
 */
export interface PaginatedPublications {
  data: PublicationPreview[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Respuesta del endpoint de detalle.
 * Es lo que devuelve GET /api/publications/:slug.
 */
export interface PublicationDetailResponse {
  data: Publication;
}