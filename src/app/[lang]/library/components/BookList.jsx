'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getBooks } from '@/app/[lang]/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function BookList({ category = '', year, priceMin, priceMax }) {
  const messages = useMessages();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  // normalizador (para categoría)
  const normalize = (text) =>
    text
      ?.toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        let booksData = await getBooks();

        // validar respuesta
        booksData = Array.isArray(booksData) ? booksData : [];

        // DEBUG 
        const uniqueCategories = [
          ...new Set(booksData.map((b) => b.categoria)),
        ];
        console.log('🏷️ CATEGORIAS API:', uniqueCategories);

        // FILTRO POR CATEGORÍA
        if (category) {
          const normalizedCategory = normalize(category);

          booksData = booksData.filter((book) => {
            const cat = normalize(book?.categoria || '');
            return cat === normalizedCategory;
          });
        }

        // FILTRO POR AÑO
        if (year) {
          booksData = booksData.filter(
            (book) =>
              String(book.anio_publicacion) === String(year)
          );
        }

        // PRECIO MÍNIMO
        if (priceMin) {
          booksData = booksData.filter(
            (book) =>
              Number(book.precio) >= Number(priceMin)
          );
        }

        // PRECIO MÁXIMO
        if (priceMax) {
          booksData = booksData.filter(
            (book) =>
              Number(book.precio) <= Number(priceMax)
          );
        }

        setBooks(booksData);
      } catch (error) {
        console.error('Error cargando libros:', error);
        setBooks([]);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadBooks();
  }, [category, year, priceMin, priceMax, setLoading]);

  // loading
  if (isLoading) {
    return <CarouselSkeleton />;
  }

  // sin resultados
  if (books.length === 0) {
    return (
      <p className="p-4 text-gray-500">
        {messages.library.noBooks}
      </p>
    );
  }


  return (
    <BooksCarousel
      title={messages.library.listBooks}
      books={books}
    />
  );
}