import { cacheLife, cacheTag } from "next/cache";
import type {
  PaginatedPublications,
  Publication,
  PublicationPreview,
} from "@/lib/types/publication";
import { mockPublications } from "@/lib/data/mockPublications";
import { mockPublicationContent } from "@/lib/data/mockPublicationContent";

interface GetPublicationsParams {
  page?: number;
  limit?: number;
  tag?: string;
  q?: string;
  locale?: string;
}

/**
 * Obtiene una lista paginada de publicaciones.
 *
 * Estrategia:
 * - Si NEXT_PUBLIC_API_URL está definida → fetch real al backend.
 * - Si no → usa datos mock (mientras el backend no exista).
 *
 * La respuesta se cachea con 'use cache' durante horas, para evitar
 * golpear el backend en cada petición.
 */
export async function getPublications(
  params: GetPublicationsParams = {}
): Promise<PaginatedPublications> {
  "use cache";
  cacheLife("hours");
  cacheTag("publications");

  const { page = 1, limit = 12, tag, q, locale = "es" } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ─── Modo mock (sin backend) ─────────────────────────────
  if (!apiUrl) {
    return filterAndPaginate(mockPublications, { page, limit, tag, q });
  }

  // ─── Modo real (con backend) ─────────────────────────────
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    locale,
  });

  if (tag) searchParams.set("tag", tag);
  if (q) searchParams.set("q", q);

  const res = await fetch(
    `${apiUrl}/publications?${searchParams.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`Error fetching publications: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtiene una publicación completa por su slug.
 *
 * Estrategia:
 * - Si NEXT_PUBLIC_API_URL está definida → fetch real al backend.
 * - Si no → busca en el mock.
 *
 * Devuelve null si la publicación no existe.
 */
export async function getPublicationBySlug(
  slug: string,
  locale: string = "es"
): Promise<Publication | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("publications", `publication-${slug}`);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ─── Modo mock (sin backend) ─────────────────────────────
  if (!apiUrl) {
    const preview = mockPublications.find((p) => p.slug === slug);
    if (!preview) return null;

    const content =
      mockPublicationContent[slug] ?? buildFallbackContent(preview);

    return { ...preview, content };
  }

  // ─── Modo real (con backend) ─────────────────────────────
  const res = await fetch(
    `${apiUrl}/publications/${slug}?locale=${locale}`,
    { next: { revalidate: 3600 } }
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Error fetching publication: ${res.status}`);
  }

  const data = (await res.json()) as { data: Publication };
  return data.data;
}

/**
 * Filtra y pagina el array de publicaciones mock.
 * Simula exactamente lo que haría el backend.
 */
function filterAndPaginate(
  all: typeof mockPublications,
  options: { page: number; limit: number; tag?: string; q?: string }
): PaginatedPublications {
  const { page, limit, tag, q } = options;
  let filtered = [...all];

  if (tag) {
    filtered = filtered.filter((p) => p.tags.includes(tag));
  }

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(query)
    );
  }

  // Orden por fecha descendente (más recientes primero)
  filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  const hasMore = start + limit < total;

  return { data, total, page, limit, hasMore };
}

/**
 * Genera contenido de relleno para publicaciones mock que no
 * tienen contenido MDX definido.
 */
function buildFallbackContent(preview: PublicationPreview): string {
  return `
## Resumen

${preview.excerpt}

## Contenido en preparación

El contenido completo de esta publicación estará disponible próximamente. Mientras tanto, puedes consultar el resumen arriba o volver al listado para explorar otras publicaciones de la red.
`.trim();
}