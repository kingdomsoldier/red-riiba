import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import RelatedLinks from "./RelatedLinks";
import Container from "@/components/ui/Container";
import { footerLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/config";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  const tLinks = useTranslations("Footer.links");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-riiba-green-dark text-white mt-auto">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/red-riiba_logo.png"
                alt={siteConfig.name}
                width={96}
                height={96}
                className="h-20 w-auto shrink-0"
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-4">
              {siteConfig.fullName.toUpperCase()}
            </h3>
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-md leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-riiba-orange transition-colors"
                  >
                    {tLinks(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-4">
              {t("relatedLinks")}
            </h3>
            <RelatedLinks />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-riiba-orange mb-4">
              {t("contact")}
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-white/80 hover:text-riiba-orange transition-colors block mb-4"
            >
              {siteConfig.email}
            </a>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-white/60 text-center">
            {t("copyright", { year: currentYear, name: siteConfig.name })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
