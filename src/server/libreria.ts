import "server-only";

import pool from "@/helpers/db";

const BOOK_TYPE_ID = 1;
const MAGAZINE_TYPE_ID = 2;

const productSelect = `
  SELECT
    producto.*,
    producto.titulo AS nombre,
    producto.numero_edicion AS edicion,
    categoria.nombre AS categoria,
    NULL::text AS editorial,
    NULL::integer AS anio_publicacion,
    NULL::text AS periodicidad,
    tipo_producto.nombre AS tipo_producto_nombre
  FROM public.producto
  JOIN public.tipo_producto ON tipo_producto.id = producto.tipo_producto_id
  LEFT JOIN public.categoria ON categoria.id = producto.categoria_id
`;

const typeCondition = "producto.tipo_producto_id = $1";

export async function getProductsByType(tipoProductoId: number) {
  const result = await pool.query(
    `
      ${productSelect}
      WHERE ${typeCondition}
      ORDER BY producto.id ASC
    `,
    [tipoProductoId],
  );

  return result.rows;
}

export async function getTopProductsByType(tipoProductoId: number) {
  const result = await pool.query(
    `
      ${productSelect}
      WHERE ${typeCondition}
      ORDER BY producto.calificacion DESC NULLS LAST, producto.id ASC
      LIMIT 10
    `,
    [tipoProductoId],
  );

  return result.rows;
}

export async function getRecommendedProductsByType(tipoProductoId: number) {
  const result = await pool.query(
    `
      ${productSelect}
      WHERE ${typeCondition}
      ORDER BY producto.calificacion DESC NULLS LAST, producto.id DESC
      LIMIT 10
    `,
    [tipoProductoId],
  );

  return result.rows;
}

export async function getProductByIdAndType(id: string | number, tipoProductoId: number) {
  const result = await pool.query(
    `
      ${productSelect}
      WHERE producto.id = $1 AND producto.tipo_producto_id = $2
    `,
    [Number(id), tipoProductoId],
  );

  return result.rows[0] ?? null;
}

export async function getSimilarProductsByType(
  id: string | number,
  tipoProductoId: number,
) {
  const result = await pool.query(
    `
      ${productSelect}
      WHERE producto.tipo_producto_id = $1 AND producto.id <> $2
      ORDER BY RANDOM()
      LIMIT 10
    `,
    [tipoProductoId, Number(id)],
  );

  return result.rows;
}

export async function getPurchasedProductsByUserAndType(
  usuarioId?: string | number,
  tipoProductoId?: string | number,
) {
  const conditions: string[] = [];
  const values: number[] = [];

  if (usuarioId !== undefined && usuarioId !== null) {
    values.push(Number(usuarioId));
    conditions.push(`compra.usuario_id = $${values.length}`);
  }

  if (tipoProductoId !== undefined && tipoProductoId !== null) {
    values.push(Number(tipoProductoId));
    conditions.push(`tipo_producto.id = $${values.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await pool.query(
    `
      SELECT
        producto.*,
        producto.titulo AS nombre,
        producto.numero_edicion AS edicion,
        categoria.nombre AS categoria,
        NULL::text AS editorial,
        NULL::integer AS anio_publicacion,
        NULL::text AS periodicidad,
        tipo_producto.nombre AS tipo_producto_nombre
      FROM public.detalle_compra
      JOIN public.compra ON compra.id = detalle_compra.compra_id
      JOIN public.producto ON producto.id = detalle_compra.producto_id
      JOIN public.tipo_producto ON tipo_producto.id = producto.tipo_producto_id
      LEFT JOIN public.categoria ON categoria.id = producto.categoria_id
      ${where}
      ORDER BY producto.id ASC
    `,
    values,
  );

  return result.rows;
}

export const getBooks = () => getProductsByType(BOOK_TYPE_ID);
export const getTop10Books = () => getTopProductsByType(BOOK_TYPE_ID);
export const getRecommendedBooks = () => getRecommendedProductsByType(BOOK_TYPE_ID);
export const getBookById = (id: string | number) =>
  getProductByIdAndType(id, BOOK_TYPE_ID);
export const getSimilarBooks = (id: string | number) =>
  getSimilarProductsByType(id, BOOK_TYPE_ID);

export const getMagazines = () => getProductsByType(MAGAZINE_TYPE_ID);
export const getTop10Magazines = () => getTopProductsByType(MAGAZINE_TYPE_ID);
export const getRecommendedMagazines = () =>
  getRecommendedProductsByType(MAGAZINE_TYPE_ID);
export const getMagazineById = (id: string | number) =>
  getProductByIdAndType(id, MAGAZINE_TYPE_ID);
export const getSimilarMagazines = (id: string | number) =>
  getSimilarProductsByType(id, MAGAZINE_TYPE_ID);
