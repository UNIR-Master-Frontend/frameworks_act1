import { NextResponse } from "next/server";
import { getSimilarMagazines } from "@/server/libreria";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const magazines = await getSimilarMagazines(id);

    return NextResponse.json(magazines);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener revistas similares" },
      { status: 500 },
    );
  }
}
