import { NextResponse } from 'next/server';
import pool from "@/helpers/db"


export async function GET(
  request: Request,
  
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (isNaN(Number(id))) {
      return NextResponse.json({ error: 'El ID debe ser un número válido' }, { status: 400 });
    }

    const queryText = 'SELECT * FROM categoria WHERE id = $1';
    const { rows } = await pool.query(queryText, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    console.error('Error al obtener la categoría por ID:', error);
    return NextResponse.json({ error: 'Error interno de base de datos' }, { status: 500 });
  }
}

// eliminar categoria
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (isNaN(Number(id))) {
      return NextResponse.json({ error: 'El ID debe ser un número válido' }, { status: 400 });
    }

    const queryText = 'DELETE FROM categoria WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(queryText, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Categoría no encontrada' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Categoría eliminada con éxito', categoriaEliminada: rows[0] },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    return NextResponse.json({ error: 'Error interno de base de datos' }, { status: 500 });
  }
}