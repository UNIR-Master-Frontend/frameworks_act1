'use client';
import { useEffect, useState } from 'react';
import { getRecommendedBooks } from '@/app/features/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function RecommendedBooks() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getRecommendedBooksData();
  }, []);

  const getRecommendedBooksData = async () => {
    setLoading(true);
    const data = await getRecommendedBooks();
    setRecommendedBooks(data?.recomendaciones ?? []);
    setLoading(false);
  };

  return <BooksCarousel title="Libros recomendados" books={recommendedBooks} />;
}