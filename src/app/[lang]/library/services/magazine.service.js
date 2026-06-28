import { LIBRARY_API_BASE_URL } from "@/constants/url";

export const MAGAZINES_REVALIDATE_SECONDS = 15 * 60;
export const MAGAZINE_DETAIL_REVALIDATE_SECONDS = 60 * 60;

const fetchJson = async (url, revalidate = MAGAZINES_REVALIDATE_SECONDS) => {
  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.status}`);
  }

  return response.json();
};

export const getMagazines = async () => {
  try {
    return fetchJson(`${LIBRARY_API_BASE_URL}/revistas`);
  } catch (error) {
    console.error("Fallo al conectar con el backend:", error);
    return [];
  }
};

export const getMagazineById = async (id) => {
  try {
    return fetchJson(
      `${LIBRARY_API_BASE_URL}/revistas/${id}`,
      MAGAZINE_DETAIL_REVALIDATE_SECONDS,
    );
  } catch (error) {
    console.error("Error cargando revista por id:", error);
    return null;
  }
};

export const getTop10Magazines = async () => {
  return fetchJson(`${LIBRARY_API_BASE_URL}/revistas/top10`);
};

export const getRecommendedMagazines = async () => {
  return fetchJson(`${LIBRARY_API_BASE_URL}/revistas/recomendados`);
};

export const getSimilarMagazines = async (id) => {
  try {
    return await fetchJson(
      `${LIBRARY_API_BASE_URL}/revistas/${id}/similares`,
      MAGAZINE_DETAIL_REVALIDATE_SECONDS,
    );
  } catch (error) {
    console.error("Error cargando revistas similares:", error);
    return [];
  }
};

export const getMagazinesPurchasesByUserId = async (id) => {
  return fetchJson(
    `${LIBRARY_API_BASE_URL}/compras/libros?usuario_id=${encodeURIComponent(id)}&tipo_producto_id=2`,
  );
};

export const getMagazinesCategories = async () => {
  return fetchJson(`${LIBRARY_API_BASE_URL}/categorias`);
};

export const getMagazinesByCategory = async (categoria) => {
  const query = `categoria=${encodeURIComponent(categoria)}`;
  return fetchJson(`${LIBRARY_API_BASE_URL}/revistas?${query}`);
};
