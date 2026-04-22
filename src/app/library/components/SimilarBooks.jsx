'use client';
import { useEffect, useState } from 'react';
import { getSimilarBooks } from '@/app/features/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function SimilarBooks({ id }) {
  const [similarBooks, setSimilarBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getSimilarBooksData();
  }, []);

  const getSimilarBooksData = async () => {
    setLoading(true);
    const data = await getSimilarBooks(id);
    setSimilarBooks(data);
    setLoading(false);
  };

  return <BooksCarousel title="Libros similares" books={similarBooks} />;
}