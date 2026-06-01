import pool from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      usuario_id: searchParams.get("usuario_id")
        ? Number(searchParams.get("usuario_id"))
        : undefined,
      tipo_producto_id: searchParams.get("tipo_producto_id")
        ? Number(searchParams.get("tipo_producto_id"))
        : undefined,
    };

    const conditions: string[] = [];

    if (filters.usuario_id !== undefined) {
      conditions.push(`compra.usuario_id = ${filters.usuario_id}`);
    }

    if (filters.tipo_producto_id !== undefined) {
      conditions.push(`tipo_producto.id = ${filters.tipo_producto_id}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    console.log(where);

    const result = await pool.query(
      `
        SELECT producto.*, tipo_producto.nombre FROM public.detalle_compra
        JOIN compra on compra.id = detalle_compra.compra_id
        JOIN producto on producto.id = detalle_compra.producto_id
        JOIN tipo_producto ON tipo_producto.id = producto.tipo_producto_id
        ${where}
        ORDER BY id ASC
    `,
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el listado de libros" },
      { status: 500 },
    );
  }
}
