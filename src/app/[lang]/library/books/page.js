import { Suspense } from 'react';

import { getMessages } from '@/config/i18n';
import BooksCatalog from '@/app/[lang]/library/components/BooksCatalog';
import BooksCarousel from '@/app/[lang]/library/components/BooksCarousel';
import {
  getBooks,
  getRecommendedBooks,
  getTop10Books,
} from '@/app/[lang]/library/services/book.service';

export const revalidate = 900;

export default async function BooksPage({ params }) {
  const { lang } = await params;
  const messages = getMessages(lang).library;
  const [booksData, topBooksData, recommendedBooksData] = await Promise.all([
    getBooks(),
    getTop10Books(),
    getRecommendedBooks(),
  ]);

  const books = Array.isArray(booksData) ? booksData : [];
  const topBooks = Array.isArray(topBooksData) ? topBooksData : [];
  const recommendedBooks = Array.isArray(recommendedBooksData?.recomendaciones)
    ? recommendedBooksData.recomendaciones
    : [];

  return (
    <>
      <Suspense fallback={null}>
        <BooksCatalog
          books={books}
          title={messages.listBooks}
          emptyMessage={messages.noBooks}
        />
      </Suspense>
      <BooksCarousel title={messages.top10Books} books={topBooks} />
      <BooksCarousel title={messages.recommendedBooks} books={recommendedBooks} />
    </>
  );
}
