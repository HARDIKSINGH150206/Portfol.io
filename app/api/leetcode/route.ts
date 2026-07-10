import { NextResponse } from "next/server";
import { getLeetCodeStats } from "@/lib/leetcode";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await getLeetCodeStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "LeetCode stats temporarily unavailable.",
      },
      { status: 500 },
    );
  }
}
