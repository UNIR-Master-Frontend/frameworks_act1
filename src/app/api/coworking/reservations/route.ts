import { NextRequest, NextResponse } from 'next/server'
import pool from '@/helpers/db'

// GET - Listado de reservas
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM public.reserva')
    return NextResponse.json({ data: result.rows })
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 })
  }
}

// POST - Crear reserva
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fecha_reserva, fecha_salida, activo, usuario_id, espacio_id } = body

    if (!fecha_reserva || !fecha_salida || !usuario_id || !espacio_id) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const result = await pool.query(
      `INSERT INTO public.reserva (fecha_reserva, fecha_salida, activo, usuario_id, espacio_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fecha_reserva, fecha_salida, activo ?? true, usuario_id, espacio_id]
    )

    return NextResponse.json({ data: result.rows[0] }, { status: 201 })
} catch (error) {
  console.error("ERROR AL CREAR RESERVA:")
  console.error(error)

  return NextResponse.json(
    { error: 'Error al crear reserva' },
    { status: 500 }
  )
}
}