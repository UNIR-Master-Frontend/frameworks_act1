import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMessages } from '@/config/i18n';
import BooksCarousel from '@/app/[lang]/library/components/BooksCarousel';
import BookPurchaseControls from '@/app/[lang]/library/components/BookPurchaseControls';
import BackButton from '@/components/BackButton/BackButton';
import {
  getBookById,
  getBooks,
  getSimilarBooks,
} from '@/server/libreria';
import styles from '@/app/[lang]/library/detail.module.css';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const books = await getBooks();

  if (!Array.isArray(books)) return [];

  return books
    .filter((book) => book?.id !== undefined && book?.id !== null)
    .map((book) => ({
      id: String(book.id),
    }));
}

export default async function BookDetailPage({ params }) {
  const { id, lang } = await params;
  const messages = getMessages(lang);
  const t = messages.detail;
  const [book, similarBooksData] = await Promise.all([
    getBookById(id),
    getSimilarBooks(id),
  ]);

  if (!book) {
    notFound();
  }

  const similarBooks = Array.isArray(similarBooksData) ? similarBooksData : [];
  const originalPrice = Number((book.precio * 1.11).toFixed(2));

  return (
    <>
      <div className={styles.detailPage}>
        <div className={styles.detailTopbar}>
          <BackButton />
        </div>

        <div className={styles.detailGrid}>
          <div className={`${styles.visualPanel} ${styles.bookVisual}`}>
            <div className={styles.visualGlow} />
            <Image
              className={styles.visualImage}
              src="/images/jpg/book.jpg"
              alt={book.nombre}
              fill
              sizes="(min-width: 900px) 45vw, 100vw"
            />
          </div>

          <div className={styles.contentPanel}>
            <header className={styles.headlineBlock}>
              <p className={styles.eyebrow}>{t.bookEyebrow}</p>
              <h1 className={styles.title}>{book.nombre}</h1>
              <p className={styles.subtitle}>{book.autor}</p>
              <div className={styles.priceRow}>
                <p className={styles.oldPrice}>${originalPrice}</p>
                <p className={styles.currentPrice}>${book.precio}</p>
              </div>
            </header>

            <section className={styles.infoStack}>
              <div className={styles.infoBlock}>
                <p className={styles.label}>{t.editorial}</p>
                <p className={styles.value}>{book.editorial}</p>
              </div>
            </section>

            <BookPurchaseControls book={book} messages={t} />
          </div>
        </div>
      </div>

      <div className={styles.similarSection}>
        <BooksCarousel title={messages.library.similarBooks} books={similarBooks} />
      </div>
    </>
  );
}
