import Image from "next/image";
// components/layout/Logo.tsx
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config";

type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  variant?: "default" | "light";
  size?: LogoSize;
}

const imageSizes: Record<LogoSize, string> = {
  sm: "h-10 w-auto",
  md: "h-16 w-auto",   // ← antes era h-15
  lg: "h-20 w-auto",
  xl: "h-24 w-auto",
};

const textSizes: Record<LogoSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-3xl",
};

export default function Logo({
  variant = "default",
  size = "md",
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image
        src="/images/red-riiba_logo.png"
        alt={`${siteConfig.name} - Bienestar Animal Universitario`}
        width={96}
        height={96}
        className={imageSizes[size]}
        priority
      />
      <span
        className={`hidden sm:block font-bold tracking-tight ${textSizes[size]} ${
          variant === "light" ? "text-white" : "text-riiba-green-dark"
        }`}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}