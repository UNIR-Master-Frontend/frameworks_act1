'use client';
import { useEffect, useState } from 'react';
import { getSimilarBooks } from '@/app/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function SimilarBooks({ id }) {
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

  return <BooksCarousel title="Libros similares" books={similarBooks} />;
}
