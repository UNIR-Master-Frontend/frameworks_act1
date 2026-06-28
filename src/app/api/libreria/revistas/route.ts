import { NextResponse } from "next/server";
import { getMagazines } from "@/server/libreria";

export async function GET() {
  try {
    const magazines = await getMagazines();
    return NextResponse.json(magazines);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el listado de revistas" },
      { status: 500 },
    );
  }
}
