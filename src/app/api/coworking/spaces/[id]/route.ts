import { NextRequest, NextResponse } from "next/server";
import { getSpaceById } from "@/server/coworking";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const space = await getSpaceById(id);

    if (!space) {
      return NextResponse.json(
        { error: "Espacio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: space,
    });
  } catch (error: any) {
    console.error("ERROR BD:", error);

    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
