import { NextRequest, NextResponse } from "next/server";
import pool from "@/helpers/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `
      SELECT
        e.id,
        ee.nombre AS estado,
        e.capacidad
      FROM public.espacio e
      INNER JOIN public.estado_espacio ee
        ON e.estado_id = ee.id
      WHERE e.id = $1
      `,
      [Number(id)]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Espacio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: result.rows[0],
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