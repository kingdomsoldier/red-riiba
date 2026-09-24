import { cacheLife, cacheTag } from "next/cache";
import type { PaginatedPublications } from "@/lib/types/publication";
import { mockPublications } from "@/lib/data/mockPublications";

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