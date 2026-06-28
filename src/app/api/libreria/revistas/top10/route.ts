import { NextResponse } from "next/server";
import { getTop10Magazines } from "@/server/libreria";

export async function GET() {
  try {
    const magazines = await getTop10Magazines();
    return NextResponse.json(magazines);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el listado de libros" },
      { status: 500 },
    );
  }
}
