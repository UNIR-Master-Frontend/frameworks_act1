import { NextResponse } from "next/server";
import { getSimilarBooks } from "@/server/libreria";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const books = await getSimilarBooks(id);

    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener libros similares" },
      { status: 500 },
    );
  }
}
