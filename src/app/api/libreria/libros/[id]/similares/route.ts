import pool from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await pool.query(`
        SELECT producto.*, tipo_producto.nombre AS tipo_producto_nombre
        FROM public.producto
        JOIN tipo_producto ON tipo_producto.id = producto.tipo_producto_id
        WHERE  tipo_producto.id = 1
        ORDER BY RANDOM()
        LIMIT 10;
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener libros similares" },
      { status: 500 },
    );
  }
}
