'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import BookList from '@/app/library/components/BookList';
import RecommendedBooks from '@/app/library/components/RecommendedBooks';
import Top10Books from '@/app/library/components/Top10Books';
import Dropdown from '@/components/Dropdown/Dropdown';
import { getBooksCategories } from '@/app/library/services/book.service';

export default function BooksPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔥 filtros desde URL
  const category = searchParams.get('category') || '';
  const year = searchParams.get('year');
  const price = searchParams.get('price');
  const date = searchParams.get('date');

  useEffect(() => {
    getBooksCategories().then((data) => {
      if (Array.isArray(data)) {
        setCategories(
          data.map((value) => ({
            value,
            label: value.toUpperCase(),
          }))
        );
      }
    });
  }, []);

  // cambio dropdown → actualiza URL
  const handleCategoryChange = (option) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option) {
      params.set('category', option);
    } else {
      params.delete('category');
    }

    router.push(`/library/books?${params.toString()}`);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', margin: '1rem 2rem' }}>
        <Dropdown
          options={categories}
          label="Categorias"
          onChange={handleCategoryChange}
        />
      </div>

      <BookList
        category={category}
        year={year}
        price={price}
        date={date}
      />

      <Top10Books />
      <RecommendedBooks />
    </>
  );
}