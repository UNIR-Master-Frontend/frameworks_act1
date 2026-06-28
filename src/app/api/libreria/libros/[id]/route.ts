import { NextResponse } from "next/server";
import { getBookById } from "@/server/libreria";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const book = await getBookById(id);

    if (!book) {
      return NextResponse.json(
        { error: "El registro no existe" },
        { status: 400 },
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el libro" },
      { status: 500 },
    );
  }
}
