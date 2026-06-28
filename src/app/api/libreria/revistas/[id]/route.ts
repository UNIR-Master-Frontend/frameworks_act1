import { NextResponse } from "next/server";
import { getMagazineById } from "@/server/libreria";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const magazine = await getMagazineById(id);

    if (!magazine) {
      return NextResponse.json(
        { error: "El registro no existe" },
        { status: 400 },
      );
    }

    return NextResponse.json(magazine);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el libro" },
      { status: 500 },
    );
  }
}
