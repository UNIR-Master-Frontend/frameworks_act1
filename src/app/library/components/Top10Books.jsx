'use client';
import { useEffect, useState } from 'react';
import { getTop10Books } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function Top10Books() {
  const [books, setBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadTopBooks = async () => {
      setLoading(true);

      try {
        const data = await getTop10Books();
        setBooks(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    loadTopBooks();
  }, [setLoading]);

  return <BooksCarousel title="Top 10 de libros mas vendidos" books={books} />;
}
