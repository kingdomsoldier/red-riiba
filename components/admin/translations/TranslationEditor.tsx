"use client";

import type {
  AdminLocale,
  TranslationSchemaSummary,
} from "@/lib/admin/types";
import { useTranslationEditor } from "@/lib/admin/hooks/useTranslationEditor";
import { useIsMobile } from "./shared/useMediaQuery";
import MobileEditor from "./mobile/MobileEditor";
import DesktopEditor from "./desktop/DesktopEditor";

interface TranslationEditorProps {
  schemas: TranslationSchemaSummary[];
  locales: AdminLocale[];
}

export default function TranslationEditor({
  schemas,
  locales,
}: TranslationEditorProps) {
  const editor = useTranslationEditor(schemas, locales);
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileEditor editor={editor} schemas={schemas} locales={locales} />
  ) : (
    <DesktopEditor editor={editor} schemas={schemas} locales={locales} />
  );
}