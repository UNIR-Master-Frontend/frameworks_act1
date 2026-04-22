'use client';
import { useEffect, useState } from 'react';
import { getTop10Books } from '@/app/features/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function Top10Books() {
  const [books, setBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getBooksData();
  }, []);

  const getBooksData = async () => {
    setLoading(true);
    const data = await getTop10Books();
    setBooks(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  return <BooksCarousel title="Top 10 de libros más vendidos" books={books} />;
}