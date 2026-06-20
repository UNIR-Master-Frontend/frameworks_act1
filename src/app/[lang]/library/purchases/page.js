'use client';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import useLoading from '@/hooks/useLoading';
import { getBooksPurchasesByUserId } from '@/app/[lang]/library/services/book.service';
import { getMagazinesPurchasesByUserId } from '@/app/[lang]/library/services/magazine.service';
import BooksCarousel from '@/app/[lang]/library/components/BooksCarousel';
import MagazinesCarousel from '@/app/[lang]/library/components/MagazinesCarousel';
import { useMessages } from '@/context/LanguageContext';

export default function PurchasesPage() {
  const { user } = useUser();
  const { setLoading } = useLoading();
  const [books, setBooks] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const t = useMessages().library;

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      getBooksPurchasesByUserId(user.id),
      getMagazinesPurchasesByUserId(user.id),
    ])
      .then(([booksData, magazinesData]) => {
        setBooks(Array.isArray(booksData) ? booksData : []);
        setMagazines(Array.isArray(magazinesData) ? magazinesData : []);
      })
      .finally(() => setLoading(false));
  }, [user, setLoading]);

  return (
    <div className="purchases-container">
      <h3>{t.myPurchases}</h3>
      <BooksCarousel title={t.booksShort} books={books} emptyMessage={t.noPurchases} />
      <MagazinesCarousel title={t.magazinesShort} magazines={magazines} emptyMessage={t.noPurchases} />
    </div>
  );
}
