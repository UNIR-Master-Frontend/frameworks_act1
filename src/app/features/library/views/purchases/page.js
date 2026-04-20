'use client';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import useLoading from '@/hooks/useLoading';
import { getBooksPurchasesByUserId } from '@/app/features/library/services/book.service';
import { getMagazinesPurchasesByUserId } from '@/app/features/library/services/magazine.service';
import BooksCarousel from '@/app/features/library/components/BooksCarousel';
import MagazinesCarousel from '@/app/features/library/components/MagazinesCarousel';

export default function PurchasesPage() {
  const { user } = useUser();
  const { setLoading } = useLoading();
  const [books, setBooks] = useState([]);
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      getBooksPurchasesByUserId(user.id),
      getMagazinesPurchasesByUserId(user.id),
    ])
      .then(([booksData, magazinesData]) => {
        setBooks(booksData);
        setMagazines(magazinesData);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="purchases-container">
      <h3>Mis compras</h3>
      <BooksCarousel
        title="Libros"
        books={books}
        emptyMessage="No hay compras registradas"
      />
      <MagazinesCarousel
        title="Revistas"
        magazines={magazines}
        emptyMessage="No hay compras registradas"
      />
    </div>
  );
}