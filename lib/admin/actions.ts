"use server";

import { updateTag } from "next/cache";

export async function revalidateTranslations(locales: string[]) {
  const unique = Array.from(new Set(locales.filter(Boolean)));
  for (const locale of unique) {
    updateTag(`translations-${locale}`);
  }
  return { revalidated: unique };
}