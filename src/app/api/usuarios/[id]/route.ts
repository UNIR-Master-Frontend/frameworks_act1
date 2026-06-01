import { NextResponse } from "next/server";
import pool from "@/helpers/db";

// Usuarios por ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `
        SELECT usuario.id,
               usuario.nombre,
               usuario.dni,
               usuario.tipo_usuario_id,
               tipo_usuario.nombre AS tipo_usuario_nombre
        FROM public.usuario
        LEFT JOIN public.tipo_usuario ON tipo_usuario.id = usuario.tipo_usuario_id
        WHERE usuario.id = $1
      `,
      [id],
    );

    if (!result.rows.length) {
      return NextResponse.json(
        { error: "El usuario no existe" },
        { status: 404 },
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener el usuario" },
      { status: 500 },
    );
  }
}

// Eliminar un usuario
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const result = await pool.query(
      `DELETE FROM public.usuario WHERE id = $1 RETURNING *`,
      [id],
    );

    if (!result.rows.length) {
      return NextResponse.json(
        { error: "El usuario no existe" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Usuario eliminado correctamente",
      usuario: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al eliminar el usuario" },
      { status: 500 },
    );
  }
}
