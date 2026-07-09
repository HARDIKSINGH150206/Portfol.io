import { NextResponse } from "next/server";
import { getPinnedRepositories } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const repositories = await getPinnedRepositories();

    return NextResponse.json(repositories, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub pinned repositories API failed:", error);
    return NextResponse.json(
      { error: "Unable to load GitHub pinned repositories." },
      { status: 500 },
    );
  }
}
