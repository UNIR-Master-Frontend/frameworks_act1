import { NextResponse } from "next/server";
import { getPurchasedProductsByUserAndType } from "@/server/libreria";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get("usuario_id");
    const tipoProductoId = searchParams.get("tipo_producto_id");

    const filters = {
      usuario_id: usuarioId ? Number(usuarioId) : undefined,
      tipo_producto_id: tipoProductoId ? Number(tipoProductoId) : undefined,
    };

    if (
      (usuarioId && !Number.isInteger(filters.usuario_id)) ||
      (tipoProductoId && !Number.isInteger(filters.tipo_producto_id))
    ) {
      return NextResponse.json([]);
    }

    const purchases = await getPurchasedProductsByUserAndType(
      filters.usuario_id,
      filters.tipo_producto_id,
    );
    return NextResponse.json(purchases);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el listado de libros" },
      { status: 500 },
    );
  }
}
