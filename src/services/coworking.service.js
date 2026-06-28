import { COWORKING_API_BASE_URL } from "@/constants/url";

const readData = async (response) => {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Error en la peticion");
  }

  return payload?.data ?? payload;
};

export const getSpaces = async () => {
  return fetch(`${COWORKING_API_BASE_URL}/spaces`).then(readData);
};

export const getSpaceById = async (id) =>
  fetch(`${COWORKING_API_BASE_URL}/spaces/${id}`).then(readData);

export const getReservations = async () =>
  fetch(`${COWORKING_API_BASE_URL}/reservations`).then(readData);

export const createReservation = async (data) =>
  fetch(`${COWORKING_API_BASE_URL}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(readData);

export const deleteReservation = async (id) =>
  fetch(`${COWORKING_API_BASE_URL}/reservations/${id}`, {
    method: "DELETE",
  }).then(readData);
