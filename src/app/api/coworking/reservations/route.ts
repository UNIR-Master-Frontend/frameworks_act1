import { NextRequest, NextResponse } from 'next/server'
import { createReservation, getReservations } from '@/server/coworking'

// GET - Listado de reservas
export async function GET() {
  try {
    const reservations = await getReservations()
    return NextResponse.json({ data: reservations })
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

    const reservation = await createReservation({
      fecha_reserva,
      fecha_salida,
      activo: activo ?? true,
      usuario_id,
      espacio_id,
    })

    return NextResponse.json({ data: reservation }, { status: 201 })
} catch (error) {
  console.error("ERROR AL CREAR RESERVA:")
  console.error(error)

  return NextResponse.json(
    { error: 'Error al crear reserva' },
    { status: 500 }
  )
}
}
