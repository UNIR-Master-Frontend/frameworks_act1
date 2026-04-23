'use client';
import { useEffect, useState } from 'react';
import { getRecommendedBooks } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function RecommendedBooks() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadRecommendedBooks = async () => {
      setLoading(true);

      try {
        const data = await getRecommendedBooks();
        setRecommendedBooks(Array.isArray(data?.recomendaciones) ? data.recomendaciones : []);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedBooks();
  }, [setLoading]);

  return <BooksCarousel title="Libros recomendados" books={recommendedBooks} />;
}
