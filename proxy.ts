import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excluir /admin, /api, /_next, /_vercel y archivos estáticos
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};