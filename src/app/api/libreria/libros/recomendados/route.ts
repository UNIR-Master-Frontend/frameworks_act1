import { NextResponse } from "next/server";
import { getRecommendedBooks } from "@/server/libreria";

export async function GET() {
  try {
    const books = await getRecommendedBooks();
    return NextResponse.json({ recomendaciones: books });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener libros recomendados" },
      { status: 500 },
    );
  }
}
