import { NextResponse } from "next/server";
import { getTop10Books } from "@/server/libreria";

export async function GET() {
  try {
    const books = await getTop10Books();
    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el listado de libros" },
      { status: 500 },
    );
  }
}
