'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getRecommendedBooks } from '@/app/[lang]/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function RecommendedBooks() {
  const messages = useMessages();
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

  return <BooksCarousel title={messages.library.recommendedBooks} books={recommendedBooks} />;
}
