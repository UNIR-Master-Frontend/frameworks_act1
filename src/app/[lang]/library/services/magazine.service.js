import { API_BASE_URL } from '@/constants/url';

export const getMagazines = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/revistas`);
    return response.json();
  } catch (error) {
    console.error('Fallo al conectar con Apidog:', error);
    return [];
  }
};

export const getMagazineById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/revistas/${id}`);
    return response.json();
  } catch (error) {
    console.error('Error cargando revista por id:', error);
    return null;
  }
};

export const getTop10Magazines = async () => {
  const response = await fetch(`${API_BASE_URL}/revistas/top10`);
  return response.json();
};

export const getRecommendedMagazines = async () => {
  const response = await fetch(`${API_BASE_URL}/recomendaciones/revistas`);
  return response.json();
};

export const getSimilarMagazines = async (id) => {
  const response = await fetch(`${API_BASE_URL}/revistas/${id}/similares`);
  return response.json();
};

export const getMagazinesPurchasesByUserId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/revistas/usuarios/${id}`);
  return response.json();
};

export const getMagazinesCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categorias/revistas`);
  return response.json();
};

export const getMagazinesByCategory = async (categoria) => {
  const query = `categoria=${encodeURIComponent(categoria)}`;
  const response = await fetch(`${API_BASE_URL}/revistas?${query}`);
  return response.json();
};