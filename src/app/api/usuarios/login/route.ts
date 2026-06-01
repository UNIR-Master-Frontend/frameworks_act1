import { NextRequest, NextResponse } from "next/server";
import pool from "@/helpers/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dni } = body ?? {};

    if (!dni) {
      return NextResponse.json(
        { error: "El campo 'dni' es obligatorio" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `
        SELECT usuario.id,
               usuario.nombre,
               usuario.dni,
               usuario.tipo_usuario_id,
               tipo_usuario.nombre AS tipo_usuario_nombre
        FROM public.usuario
        LEFT JOIN public.tipo_usuario ON tipo_usuario.id = usuario.tipo_usuario_id
        WHERE usuario.dni = $1
      `,
      [dni],
    );

    if (!result.rows.length) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Login correcto",
      usuario: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error en el login" }, { status: 500 });
  }
}
