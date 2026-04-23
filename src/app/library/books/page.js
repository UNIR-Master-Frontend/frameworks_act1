'use client';
import { useEffect, useState } from 'react';
import BookList from '@/app/library/components/BookList';
import RecommendedBooks from '@/app/library/components/RecommendedBooks';
import Top10Books from '@/app/library/components/Top10Books';
import Dropdown from '@/components/Dropdown/Dropdown';
import { getBooksCategories } from '@/app/library/services/book.service';

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
        <Dropdown options={categories} label="Categorias" onChange={(option) => setCategory(option)} />
      </div>
      <BookList category={category} />
      <Top10Books />
      <RecommendedBooks />
    </>
  );
}
