'use client';
import { useEffect, useState } from 'react';
import { getBooks, getBooksByCategory } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function BookList({ category = '', year, price, date }) {
  const [books, setBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);

      try {
        // Obtener datos base
        let booksData = category
          ? await getBooksByCategory(category)
          : await getBooks();

        //  Validación
        booksData = Array.isArray(booksData) ? booksData : [];

        // Aplicación de filtros (SIN romper API)

        if (year) {
          booksData = booksData.filter(
            (book) => String(book.year) === String(year)
          );
        }

        if (price) {
          booksData = booksData.filter(
            (book) => Number(book.price) <= Number(price)
          );
        }

        if (date) {
          booksData = booksData.filter(
            (book) => book.date === date
          );
        }

        //  Set final
        setBooks(booksData);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [category, year, price, date, setLoading]);

  return <BooksCarousel title="Listado de libros" books={books} />;
}