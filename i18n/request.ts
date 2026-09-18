import * as rootParams from "next/root-params";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  const paramValue = await rootParams.locale();

  if (!hasLocale(routing.locales, paramValue)) {
    notFound();
  }

  const locale = paramValue;

  const [common, navigation, social, footer, home, about, members, contact] =
    await Promise.all([
      import(`../messages/${locale}/common.json`),
      import(`../messages/${locale}/navigation.json`),
      import(`../messages/${locale}/social.json`),
      import(`../messages/${locale}/footer.json`),
      import(`../messages/${locale}/home.json`),
      import(`../messages/${locale}/about.json`),
      import(`../messages/${locale}/members.json`),
      import(`../messages/${locale}/contact.json`),
    ]);

  const messages = {
    ...common.default,
    ...navigation.default,
    ...social.default,
    ...footer.default,
    ...home.default,
    ...about.default,
    ...members.default,
    ...contact.default,
  };

  return { locale, messages };
});