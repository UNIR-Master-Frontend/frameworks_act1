'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getTop10Books } from '@/app/[lang]/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function Top10Books() {
  const messages = useMessages();
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

  return <BooksCarousel title={messages.library.top10Books} books={books} />;
}
