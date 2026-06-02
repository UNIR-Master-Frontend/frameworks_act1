import { NextResponse } from "next/server";
import pool from "@/helpers/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        e.id,
        ee.nombre AS estado,
        e.capacidad
      FROM public.espacio e
      INNER JOIN public.estado_espacio ee
        ON e.estado_id = ee.id
      ORDER BY e.id
    `);

    return NextResponse.json({
      data: result.rows,
    });
  } catch (error: any) {
    console.error("ERROR BD:", error);

    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}