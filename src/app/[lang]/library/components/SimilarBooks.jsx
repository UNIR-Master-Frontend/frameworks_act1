'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getSimilarBooks } from '@/app/[lang]/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function SimilarBooks({ id }) {
  const messages = useMessages();
  const [similarBooks, setSimilarBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!id) return;

    const loadSimilarBooks = async () => {
      setLoading(true);

      try {
        const data = await getSimilarBooks(id);
        setSimilarBooks(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    loadSimilarBooks();
  }, [id, setLoading]);

  return <BooksCarousel title={messages.library.similarBooks} books={similarBooks} />;
}
