import { NextResponse } from "next/server";
import { getRecommendedMagazines } from "@/server/libreria";

export async function GET() {
  try {
    const magazines = await getRecommendedMagazines();
    return NextResponse.json({ recomendaciones: magazines });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener revistas recomendadas" },
      { status: 500 },
    );
  }
}
