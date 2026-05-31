import { NextRequest, NextResponse } from "next/server";
import pool from "@/helpers/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("ID recibido:", id);

    const result = await pool.query(
      "DELETE FROM public.reserva WHERE id = $1 RETURNING *",
      [Number(id)]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}