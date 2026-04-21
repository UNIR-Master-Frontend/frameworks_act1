const API_BASE_URL = "https://mock.apidog.com/m1/1132117-1124102-default";

export const getSpaces = async () => {
  const response = await fetch(`${API_BASE_URL}/espacios-v2`);
  const data = await response.json();
  return data;
};

export const getSpaceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/espacios/${id}`);
  const data = await response.json();
  return data;
};

export const getReservations = async () => {
  const response = await fetch(`${API_BASE_URL}/reservas`);
  const data = await response.json();
  return data;
};

export const createReservation = async (reservationData) => {
  const response = await fetch(`${API_BASE_URL}/reservas/reservar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });
  const data = await response.json();
  return data;
};

export const deleteReservation = async (id) => {
  const response = await fetch(`${API_BASE_URL}/eliminar-reservas/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
