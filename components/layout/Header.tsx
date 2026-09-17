import { useTranslations } from "next-intl";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Header() {
  const t = useTranslations("Common");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <MobileMenu />
            <div className="hidden lg:flex items-center gap-3">
              <Button href="/unete">{t("join")}</Button>
              
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}