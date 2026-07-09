import { NextResponse } from "next/server";
import { getGitHubContributionStats } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await getGitHubContributionStats();

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub contributions API failed:", error);
    return NextResponse.json(
      { error: "Unable to load GitHub contribution stats." },
      { status: 500 },
    );
  }
}
