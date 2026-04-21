const API_BASE_URL = "https://mock.apidog.com/m1/1132117-1124102-default";

export const getSpaces = async () => {
  const [spacesRes, reservationsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/espacios-v2`).then((r) => r.json()),
    fetch(`${API_BASE_URL}/reservas`)
      .then((r) => r.json())
      .catch(() => []),
  ]);

  if (!Array.isArray(spacesRes) || !reservationsRes.length) return spacesRes;

  const spacesById = new Map(spacesRes.map((s) => [s.id, s]));
  const occupied = new Set();

  reservationsRes.forEach((res) => {
    const space =
      spacesById.get(res?.espacio?.id) ||
      spacesRes.find(
        (s) => !occupied.has(s.id) && s.capacidad === res?.espacio?.capacidad,
      );

    if (!space) return;

    occupied.add(space.id);
    Object.assign(space, {
      estado: res?.espacio?.estado || "reservado",
      disponible: false,
      ocupadoPor: res?.usuarios?.[0]?.nombre || "Reserva activa",
      ocupadoDesde: res?.fecha_reserva
        ? new Date(res.fecha_reserva).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
      ocupadoHasta: res?.fecha_salida
        ? new Date(res.fecha_salida).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null,
    });
  });

  return spacesRes;
};

export const getSpaceById = async (id) =>
  fetch(`${API_BASE_URL}/espacios/${id}`).then((r) => r.json());

export const getReservations = async () =>
  fetch(`${API_BASE_URL}/reservas`).then((r) => r.json());

export const createReservation = async (data) =>
  fetch(`${API_BASE_URL}/reservas/reservar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteReservation = async (id) =>
  fetch(`${API_BASE_URL}/eliminar-reservas/${id}`, { method: "DELETE" }).then(
    (r) => r.json(),
  );
