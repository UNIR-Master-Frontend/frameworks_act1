import { NextResponse } from "next/server";
import { getSpaces } from "@/server/coworking";

export async function GET() {
  try {
    const spaces = await getSpaces();

    return NextResponse.json({
      data: spaces,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
