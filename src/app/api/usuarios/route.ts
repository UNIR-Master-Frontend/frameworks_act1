import { NextResponse } from "next/server";
import pool from "@/helpers/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT usuario.id,
             usuario.nombre,
             usuario.dni,
             usuario.tipo_usuario_id,
             tipo_usuario.nombre AS tipo_usuario_nombre
      FROM public.usuario
      LEFT JOIN public.tipo_usuario ON tipo_usuario.id = usuario.tipo_usuario_id
      ORDER BY usuario.id ASC
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 },
    );
  }
}
