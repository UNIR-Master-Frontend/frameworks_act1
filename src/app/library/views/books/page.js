'use client';
import { useEffect, useState } from 'react';
import BookList from '@/app/features/library/components/BookList';
import RecommendedBooks from '@/app/features/library/components/RecommendedBooks';
import Top10Books from '@/app/features/library/components/Top10Books';
import Dropdown from '@/components/Dropdown/Dropdown';
import { getBooksCategories } from '@/app/features/library/services/book.service';

export default function BooksPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getBooksCategories().then((data) => {
      if (Array.isArray(data)) {
        setCategories(data.map((value) => ({
          value,
          label: value.toLocaleUpperCase(),
        })));
      }
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', margin: '1rem 2rem' }}>
        <Dropdown
          options={categories}
          label="Categorías"
          onChange={(option) => setCategory(option)}
        />
      </div>
      <BookList category={category} />
      <Top10Books />
      <RecommendedBooks />
    </>
  );
}