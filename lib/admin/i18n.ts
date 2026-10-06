import adminMessages from "@/admin-messages/es.json";

export function t(path: string): string {
  const parts = path.split(".");
  let current: unknown = adminMessages;

  for (const part of parts) {
    if (typeof current !== "object" || current === null) return path;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : path;
}