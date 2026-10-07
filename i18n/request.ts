import * as rootParams from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "./routing";
import { loadMessages } from "./loadMessages";

export default getRequestConfig(async () => {
  const paramValue = await rootParams.locale();

  if (!hasLocale(routing.locales, paramValue)) {
    notFound();
  }

  const locale = paramValue;
  const messages = await loadMessages(locale);

  return { locale, messages };
});