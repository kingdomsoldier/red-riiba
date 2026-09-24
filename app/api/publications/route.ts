import { NextRequest, NextResponse } from "next/server";
import { getPublications } from "@/lib/api/publications";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(50, Number(searchParams.get("limit")) || 12);
  const tag = searchParams.get("tag") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const locale = searchParams.get("locale") ?? "es";

  try {
    const data = await getPublications({ page, limit, tag, q, locale });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 }
    );
  }
}