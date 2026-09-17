import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import type { Institution } from "@/lib/data/memberCountries";

interface InstitutionCardProps {
  institution: Institution;
  visitLabel: string;
}

export default function InstitutionCard({
  institution,
  visitLabel,
}: InstitutionCardProps) {
  const initials = institution.name
    .split(" ")
    .filter((w) => w.length > 3)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const inner = (
    <>
      <div className="relative aspect-[3/2] rounded-lg bg-riiba-green-bg mb-4 overflow-hidden">
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-riiba-green-dark/20"
        >
          {initials}
        </span>
        <Image
          src={institution.logo}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-4 relative"
        />
      </div>

      <p className="text-sm font-medium text-riiba-green-dark text-center leading-snug">
        {institution.name}
      </p>
    </>
  );

  if (institution.website) {
    return (
      <a
        href={institution.website}
        target="_blank"
        rel="noopener noreferrer"
        title={visitLabel}
        className="group block p-4 rounded-xl bg-white border border-riiba-green/5 hover:border-riiba-orange/40 transition-colors"
      >
        {inner}
        <span className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-riiba-orange opacity-0 group-hover:opacity-100 transition-opacity">
          {visitLabel}
          <FiExternalLink size={12} />
        </span>
      </a>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-white border border-riiba-green/5">
      {inner}
    </div>
  );
}