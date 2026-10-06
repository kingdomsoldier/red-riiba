// Enlaces de navegación (solo keys + href, el label se traduce)
export const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "publications", href: "/publications" },
  { key: "members", href: "/members" },
  { key: "contact", href: "/contact" },
] as const;

// Redes sociales (el label es el mismo en ambos idiomas, solo se traduce el aria-label)
export const socialLinks = [
  {
    key: "instagram",
    href: "https://instagram.com/redriiba",
    icon: "instagram",
  },
  { key: "facebook", href: "https://facebook.com/redriiba", icon: "facebook" },
  { key: "twitter", href: "https://twitter.com/redriiba", icon: "twitter" },
] as const;

// Enlaces del footer (Enlaces Rápidos)
export const footerLinks = [
  { key: "policies", href: "/policies" },
  { key: "faq", href: "/faq" },
  { key: "transparency", href: "/transparencia" },
] as const;

// Enlaces relacionados (recursos externos)
export const relatedLinks = [
  { key: "unica", href: "https://unica.edu.cu", external: true },
  {
    key: "catedra",
    href: "https://bienestar-animal.unica.edu.cu",
    external: true,
  },
] as const;

// Enlaces del panel de administración
export const adminNavItems = [
  {
    href: "/admin",
    key: "sidebar.dashboard",
    exact: true,
  },
  {
    href: "/admin/locales",
    key: "sidebar.locales",
    exact: false,
  },
  {
    href: "/admin/translations",
    key: "sidebar.translations",
    exact: false,
  },
  {
    href: "/admin/settings",
    key: "sidebar.settings",
    exact: false,
  },
] as const;
