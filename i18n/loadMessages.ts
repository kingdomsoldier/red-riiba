import { cacheLife, cacheTag } from "next/cache";
import type { AbstractIntlMessages } from "next-intl";

/**
 * Carga los mensajes de un locale.
 *
 * Orden de preferencia:
 *  1. Backend NestJS (GET /api/translations/:locale)
 *  2. JSON local en messages/:locale/*.json
 *
 * El resultado se cachea con "use cache" para que la ruta no bloquee
 * el prerenderizado de Next.js 16 con `cacheComponents: true`.
 */
export async function loadMessages(
  locale: string,
): Promise<AbstractIntlMessages> {
  "use cache";
  cacheLife({
    stale: 60,       // el cliente puede servir del cache 60s sin revalidar
    revalidate: 300, // el servidor revalida cada 5 min
    expire: 3600,    // expira duro a la hora
  });
  cacheTag(`translations-${locale}`);

  const backend = await tryLoadFromBackend(locale);
  if (backend) return backend;

  console.warn(
    `[i18n] Backend no disponible para "${locale}". Usando JSON local como fallback.`,
  );
  return await loadFromJson(locale);
}

// ─────────────────────────────────────────────
// Backend
// ─────────────────────────────────────────────

async function tryLoadFromBackend(
  locale: string,
): Promise<AbstractIntlMessages | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/translations/${locale}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.warn(
        `[i18n] Backend respondió ${res.status} para "${locale}"`,
      );
      return null;
    }

    const data: unknown = await res.json();

    // Validación mínima: objeto plano no vacío
    if (
      typeof data !== "object" ||
      data === null ||
      Array.isArray(data) ||
      Object.keys(data).length === 0
    ) {
      console.warn(
        `[i18n] Backend devolvió una respuesta vacía o inválida para "${locale}"`,
      );
      return null;
    }

    return data as AbstractIntlMessages;
  } catch (err) {
    console.error(
      `[i18n] Error de red al consultar el backend para "${locale}":`,
      err,
    );
    return null;
  }
}

// ─────────────────────────────────────────────
// Fallback: JSON local
// ─────────────────────────────────────────────

async function loadFromJson(locale: string): Promise<AbstractIntlMessages> {
  const [
    common,
    navigation,
    social,
    footer,
    home,
    about,
    members,
    contact,
    publications,
    policies,
  ] = await Promise.all([
    import(`../messages/${locale}/common.json`),
    import(`../messages/${locale}/navigation.json`),
    import(`../messages/${locale}/social.json`),
    import(`../messages/${locale}/footer.json`),
    import(`../messages/${locale}/home.json`),
    import(`../messages/${locale}/about.json`),
    import(`../messages/${locale}/members.json`),
    import(`../messages/${locale}/contact.json`),
    import(`../messages/${locale}/publications.json`),
    import(`../messages/${locale}/policies.json`),
  ]);

  return {
    ...common.default,
    ...navigation.default,
    ...social.default,
    ...footer.default,
    ...home.default,
    ...about.default,
    ...members.default,
    ...contact.default,
    ...publications.default,
    ...policies.default,
  };
}