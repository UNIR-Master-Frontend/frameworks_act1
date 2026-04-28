'use client';
import { useEffect, useState } from 'react';
import { getRecommendedBooks } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function RecommendedBooks() {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadRecommendedBooks = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        const data = await getRecommendedBooks();
        setRecommendedBooks(Array.isArray(data?.recomendaciones) ? data.recomendaciones : []);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadRecommendedBooks();
  }, [setLoading]);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return <BooksCarousel title="Libros recomendados" books={recommendedBooks} />;
}
