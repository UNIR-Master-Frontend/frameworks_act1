import { NextResponse } from 'next/server'
import pool from '@/helpers/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM public.usuario')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}