import { API_BASE_URL } from '@/constants/url';

export const getBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/libros`);
  return response.json();
};

export const getTop10Books = async () => {
  const response = await fetch(`${API_BASE_URL}/libros/top10`);
  return response.json();
};

export const getRecommendedBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/recomendaciones/libros`);
  return response.json();
};

export const getBookById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/libros/${id}`);
  return response.json();
};

export const getSimilarBooks = async (id) => {
  const response = await fetch(`${API_BASE_URL}/libros/${id}/similares`);
  return response.json();
};

export const getBooksPurchasesByUserId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/libros/usuarios/${id}`);
  return response.json();
};

export const getBooksCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categorias/libros`);
  return response.json();
};

export const getBooksByCategory = async (categoria) => {
  const query = `categoria=${encodeURIComponent(categoria)}`;
  const response = await fetch(`${API_BASE_URL}/libros?${query}`);
  return response.json();
};