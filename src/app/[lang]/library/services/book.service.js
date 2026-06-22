import { API_BASE_URL } from '@/constants/url';

export const BOOKS_REVALIDATE_SECONDS = 15 * 60;
export const BOOK_DETAIL_REVALIDATE_SECONDS = 60 * 60;

const fetchJson = async (url, revalidate = BOOKS_REVALIDATE_SECONDS) => {
  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.status}`);
  }

  return response.json();
};

export const getBooks = async () => {
  return fetchJson(`${API_BASE_URL}/libros`);
};

export const getTop10Books = async () => {
  return fetchJson(`${API_BASE_URL}/libros/top10`);
};

export const getRecommendedBooks = async () => {
  return fetchJson(`${API_BASE_URL}/recomendaciones/libros`);
};

export const getBookById = async (id) => {
  return fetchJson(`${API_BASE_URL}/libros/${id}`, BOOK_DETAIL_REVALIDATE_SECONDS);
};

export const getSimilarBooks = async (id) => {
  try {
    return await fetchJson(`${API_BASE_URL}/libros/${id}/similares`, BOOK_DETAIL_REVALIDATE_SECONDS);
  } catch (error) {
    console.error('Error cargando libros similares:', error);
    return [];
  }
};

export const getBooksPurchasesByUserId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/libros/usuarios/${id}`);
  return response.json();
};

export const getBooksCategories = async () => {
  return fetchJson(`${API_BASE_URL}/categorias/libros`);
};

export const getBooksByCategory = async (categoria) => {
  const query = `categoria=${encodeURIComponent(categoria)}`;
  return fetchJson(`${API_BASE_URL}/libros?${query}`);
};


