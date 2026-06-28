import "server-only";

import pool from "@/helpers/db";

const toTime = (value: Date | string | null) => {
  if (!value) return null;

  return new Date(value).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export async function getSpaces() {
  const result = await pool.query(`
    SELECT
      e.id,
      e.nombre,
      NULL::text AS descripcion,
      e.imagen,
      CASE
        WHEN r.id IS NOT NULL THEN 'reservado'
        ELSE ee.nombre
      END AS estado,
      e.capacidad,
      r.fecha_reserva,
      r.fecha_salida,
      u.nombre AS ocupado_por,
      r.id AS reserva_id
    FROM public.espacio e
    INNER JOIN public.estado_espacio ee ON e.estado_id = ee.id
    LEFT JOIN LATERAL (
      SELECT reserva.*
      FROM public.reserva
      WHERE reserva.espacio_id = e.id
        AND COALESCE(reserva.activo, true) = true
        AND (reserva.fecha_salida IS NULL OR reserva.fecha_salida > NOW())
      ORDER BY reserva.fecha_reserva DESC
      LIMIT 1
    ) r ON true
    LEFT JOIN public.usuario u ON u.id = r.usuario_id
    ORDER BY e.id ASC
  `);

  return result.rows.map((space) => {
    const estado = space.estado ?? "";
    const reservado = Boolean(space.reserva_id);
    const noDisponiblePorEstado = ["ocupado", "reservado"].includes(
      estado.toLowerCase(),
    );

    return {
      id: space.id,
      nombre: space.nombre,
      descripcion: space.descripcion,
      imagen: space.imagen,
      estado,
      capacidad: space.capacidad,
      disponible: !reservado && !noDisponiblePorEstado,
      ocupadoPor: space.ocupado_por ?? null,
      ocupadoDesde: toTime(space.fecha_reserva),
      ocupadoHasta: toTime(space.fecha_salida),
    };
  });
}

export async function getSpaceById(id: string | number) {
  const spaces = await getSpaces();
  return spaces.find((space) => Number(space.id) === Number(id)) ?? null;
}

export async function getReservations() {
  const result = await pool.query(`
    SELECT
      reserva.id,
      reserva.fecha_reserva,
      reserva.fecha_salida,
      reserva.activo,
      reserva.usuario_id,
      reserva.espacio_id,
      reserva.espacio_id AS "espacioId",
      usuario.nombre AS usuario_nombre
    FROM public.reserva
    LEFT JOIN public.usuario ON usuario.id = reserva.usuario_id
    ORDER BY reserva.fecha_reserva DESC, reserva.id DESC
  `);

  return result.rows;
}

export async function createReservation({
  fecha_reserva,
  fecha_salida,
  activo = true,
  usuario_id,
  espacio_id,
}: {
  fecha_reserva: string;
  fecha_salida: string;
  activo?: boolean;
  usuario_id: number;
  espacio_id: number;
}) {
  const result = await pool.query(
    `
      INSERT INTO public.reserva
        (fecha_reserva, fecha_salida, activo, usuario_id, espacio_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *, espacio_id AS "espacioId"
    `,
    [fecha_reserva, fecha_salida, activo, usuario_id, espacio_id],
  );

  return result.rows[0];
}

export async function deleteReservation(id: string | number) {
  const result = await pool.query(
    "DELETE FROM public.reserva WHERE id = $1 RETURNING *, espacio_id AS \"espacioId\"",
    [Number(id)],
  );

  return result.rows[0] ?? null;
}
