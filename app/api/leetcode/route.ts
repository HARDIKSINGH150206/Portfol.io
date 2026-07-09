import { NextResponse } from "next/server";
import { getLeetCodeStats } from "@/lib/leetcode";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await getLeetCodeStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("LeetCode API failed:", error);
    return NextResponse.json(
      { error: "LeetCode stats temporarily unavailable." },
      { status: 500 },
    );
  }
}
