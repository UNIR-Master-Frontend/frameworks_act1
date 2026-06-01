import { NextRequest, NextResponse } from "next/server";
import pool from "@/helpers/db";

// POST - COMPRAR
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { detalles, usuario_id } = body;
    const fecha = new Date();
    const total = detalles.reduce((prev, current) => {
      prev = prev + current.subtotal;
      return prev;
    }, 0);

    const result = await pool.query(
      `INSERT INTO public.compra (usuario_id, estado_compra_id, fecha, total)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [usuario_id, 1, fecha, total],
    );

    const { id: compra_id, ...compra } = result.rows[0];
    const detalle_compra = [];

    for (const detalle of detalles) {
      const { cantidad, subtotal, producto_id } = detalle;
      const response = await pool.query(
        `INSERT INTO public.detalle_compra (compra_id, cantidad, subtotal, producto_id)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [compra_id, cantidad, subtotal, producto_id],
      );
      detalle_compra.push(response.rows[0]);
    }

    await pool.query(
      `
      UPDATE public.compra 
      SET estado_compra_id = 5
      WHERE id = $1
    `,
      [compra_id],
    );

    return NextResponse.json(
      {
        data: {
          id: compra_id,
          ...compra,
          detalle_compra,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al crear la compra" },
      { status: 500 },
    );
  }
}
