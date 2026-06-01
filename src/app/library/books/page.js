'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import BookList from '@/app/library/components/BookList';
import RecommendedBooks from '@/app/library/components/RecommendedBooks';
import Top10Books from '@/app/library/components/Top10Books';

function BooksPageContent() {
  const searchParams = useSearchParams();

  const category = (searchParams.get('category') || '').toUpperCase();
  const year = searchParams.get('year') || '';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';

  return (
    <>
      <BookList
        category={category}
        year={year}
        priceMin={priceMin}
        priceMax={priceMax}
      />

      <Top10Books />
      <RecommendedBooks />
    </>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <BooksPageContent />
    </Suspense>
  );
}
