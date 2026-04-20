'use client';
import { useEffect, useState } from 'react';
import { getBooks, getBooksByCategory } from '@/app/features/library/services/book.service';
import BooksCarousel from './BooksCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function BookList({ category = '' }) {
  const [books, setBooks] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (category) {
      getBooksDataByCategory();
    } else {
      getBooksData();
    }
  }, [category]);

  const getBooksData = async () => {
    setLoading(true);
    const booksData = await getBooks();
    setBooks(Array.isArray(booksData) ? booksData : []);
    setLoading(false);
  };

  const getBooksDataByCategory = async () => {
    setLoading(true);
    const booksData = await getBooksByCategory(category);
    setBooks(Array.isArray(booksData) ? booksData : []);
    setLoading(false);
  };

  return <BooksCarousel title="Listado de libros" books={books} />;
}