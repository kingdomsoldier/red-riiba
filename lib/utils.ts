/**
 * Convierte un texto en un slug seguro para usar como `id` o ancla HTML.
 * Ej: "México" → "mexico", "Costa Rica" → "costa-rica"
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}