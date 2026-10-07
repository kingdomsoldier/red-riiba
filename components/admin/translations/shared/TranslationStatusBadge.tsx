import {
  FiCircle,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiAlertTriangle,
  FiCpu,
} from "react-icons/fi";
import type { TranslationStatus } from "@/lib/admin/types";

export type ExtendedStatus =
  | TranslationStatus
  | "SYNCING"
  | "SYNC_ERROR"
  | "AI";

const config: Record<
  ExtendedStatus,
  { label: string; Icon: typeof FiCircle; className: string }
> = {
  PENDING: { label: "Pendiente", Icon: FiCircle, className: "text-gray-600 bg-gray-100 border-gray-200" },
  TRANSLATED: { label: "Traducido", Icon: FiCheckCircle, className: "text-green-700 bg-green-50 border-green-200" },
  OUTDATED: { label: "Desactualizado", Icon: FiAlertCircle, className: "text-amber-700 bg-amber-50 border-amber-200" },
  SYNCING: { label: "Sincronizando", Icon: FiLoader, className: "text-riiba-orange bg-riiba-orange/10 border-riiba-orange/30" },
  SYNC_ERROR: { label: "Error de sync", Icon: FiAlertTriangle, className: "text-red-700 bg-red-50 border-red-200" },
  AI: { label: "Sugerido por IA", Icon: FiCpu, className: "text-riiba-orange bg-riiba-orange/10 border-riiba-orange/30" },
};

interface Props {
  status: ExtendedStatus;
  compact?: boolean;
}

export default function TranslationStatusBadge({ status, compact = false }: Props) {
  const { label, Icon, className } = config[status];
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${className} ${
        status === "SYNCING" ? "[&_svg]:animate-spin" : ""
      }`}
    >
      <Icon size={11} />
      {!compact && <span>{label}</span>}
    </span>
  );
}