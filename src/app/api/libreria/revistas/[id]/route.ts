import pool from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(`
        SELECT producto.*, tipo_producto.nombre AS tipo_producto_nombre
        FROM public.producto
        JOIN tipo_producto ON tipo_producto.id = producto.tipo_producto_id
        WHERE producto.id = ${id} AND tipo_producto.id = 2
    `);

    if (!result.rows.length) {
      return NextResponse.json(
        { error: "El registro no existe" },
        { status: 400 },
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el libro" },
      { status: 500 },
    );
  }
}
