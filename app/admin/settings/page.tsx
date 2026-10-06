import { t } from "@/lib/admin/i18n";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-2xl font-bold text-riiba-green-dark">
        {t("settings.title")}
      </h1>
      <p className="text-riiba-green-dark/70">
        {t("settings.comingSoon")}
      </p>
    </div>
  );
}