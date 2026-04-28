'use client';
import { useEffect, useState } from 'react';
import { getTop10Books } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function Top10Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadTopBooks = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        const data = await getTop10Books();
        setBooks(Array.isArray(data) ? data : []);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadTopBooks();
  }, [setLoading]);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return <BooksCarousel title="Top 10 de libros mas vendidos" books={books} />;
}
