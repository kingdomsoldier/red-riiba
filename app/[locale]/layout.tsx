import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";   // ← NUEVO
import { siteConfig } from "@/lib/config";
import PageClosing from "@/components/layout/PageClosing";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Red universitaria de investigacion en bienestar animal. Promovemos la adopción, el cuidado y el respeto por los animales.",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-riiba-green-dark bg-white">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">
            <PageHero />          {/* ← NUEVO */}
            {children}
            <PageClosing/>
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}