'use client';
import { useEffect, useState } from 'react';
import { getBooks, getBooksByCategory } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function BookList({ category = '' }) {
  const [books, setBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);

      try {
        const booksData = category
          ? await getBooksByCategory(category)
          : await getBooks();

        setBooks(Array.isArray(booksData) ? booksData : []);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [category, setLoading]);

  return <BooksCarousel title="Listado de libros" books={books} />;
}
