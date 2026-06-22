'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BooksCarousel from './BooksCarousel';

const normalize = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function BooksCatalog({ books = [], title = '', emptyMessage = '' }) {
  const searchParams = useSearchParams();

  const filteredBooks = useMemo(() => {
    let currentBooks = Array.isArray(books) ? books : [];
    const category = searchParams.get('category') || '';
    const year = searchParams.get('year') || '';
    const priceMin = searchParams.get('priceMin') || '';
    const priceMax = searchParams.get('priceMax') || '';

    if (category) {
      const normalizedCategory = normalize(category);

      currentBooks = currentBooks.filter(
        (book) => normalize(book?.categoria || '') === normalizedCategory,
      );
    }

    if (year) {
      currentBooks = currentBooks.filter(
        (book) => String(book.anio_publicacion) === String(year),
      );
    }

    if (priceMin) {
      currentBooks = currentBooks.filter(
        (book) => Number(book.precio) >= Number(priceMin),
      );
    }

    if (priceMax) {
      currentBooks = currentBooks.filter(
        (book) => Number(book.precio) <= Number(priceMax),
      );
    }

    return currentBooks;
  }, [books, searchParams]);

  return (
    <BooksCarousel
      title={title}
      books={filteredBooks}
      emptyMessage={emptyMessage}
    />
  );
}
