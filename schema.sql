CREATE TABLE IF NOT EXISTS public.tipo_usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS public.usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL,
  dni BIGINT NOT NULL,
  tipo_usuario_id INTEGER REFERENCES public.tipo_usuario(id)
);

CREATE TABLE IF NOT EXISTS public.tipo_producto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS public.categoria (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.producto (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR NOT NULL,
  autor VARCHAR NOT NULL,
  numero_edicion INTEGER,
  calificacion NUMERIC,
  tipo_producto_id INTEGER NOT NULL REFERENCES public.tipo_producto(id),
  categoria_id INTEGER REFERENCES public.categoria(id),
  precio NUMERIC
);

CREATE TABLE IF NOT EXISTS public.estado_espacio (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.espacio (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  capacidad INTEGER NOT NULL,
  imagen VARCHAR,
  estado_id INTEGER NOT NULL REFERENCES public.estado_espacio(id)
);

CREATE TABLE IF NOT EXISTS public.reserva (
  id SERIAL PRIMARY KEY,
  fecha_reserva TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  fecha_salida TIMESTAMP WITHOUT TIME ZONE,
  activo BOOLEAN DEFAULT TRUE,
  usuario_id INTEGER REFERENCES public.usuario(id),
  espacio_id INTEGER REFERENCES public.espacio(id)
);

CREATE TABLE IF NOT EXISTS public.estado_compra (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.compra (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES public.usuario(id),
  estado_compra_id INTEGER NOT NULL REFERENCES public.estado_compra(id),
  fecha TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  total NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS public.detalle_compra (
  id SERIAL PRIMARY KEY,
  compra_id INTEGER NOT NULL REFERENCES public.compra(id),
  cantidad INTEGER NOT NULL,
  subtotal NUMERIC NOT NULL,
  producto_id INTEGER REFERENCES public.producto(id)
);
