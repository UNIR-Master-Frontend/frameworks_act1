import { NextResponse } from 'next/server';
import pool from "@/helpers/db"

export async function GET() {
  try {
    
    const { rows } = await pool.query('SELECT * FROM categoria ORDER BY id ASC');
    
   
    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    return NextResponse.json({ error: 'Error interno conectando a la base de datos' }, { status: 500 });
  }
}

// Nueva categoría
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre } = body;

    if (!nombre) {
      return NextResponse.json({ error: 'El campo nombre es obligatorio' }, { status: 400 });
    }

    const queryText = 'INSERT INTO categoria (nombre) VALUES ($1) RETURNING *';
    const values = [nombre];
    
    const { rows } = await pool.query(queryText, values);

    return NextResponse.json(rows[0], { status: 201 });

  } catch (error) {
    console.error('Error al crear la categoría:', error);
    return NextResponse.json({ error: 'Error interno al guardar en la base de datos' }, { status: 500 });
  }
}