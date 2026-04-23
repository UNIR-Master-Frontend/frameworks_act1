'use client';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import useLoading from '@/hooks/useLoading';
import { getBooksPurchasesByUserId } from '@/app/library/services/book.service';
import { getMagazinesPurchasesByUserId } from '@/app/library/services/magazine.service';
import BooksCarousel from '@/app/library/components/BooksCarousel';
import MagazinesCarousel from '@/app/library/components/MagazinesCarousel';

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
        setBooks(Array.isArray(booksData) ? booksData : []);
        setMagazines(Array.isArray(magazinesData) ? magazinesData : []);
      })
      .finally(() => setLoading(false));
  }, [user, setLoading]);

  return (
    <div className="purchases-container">
      <h3>Mis compras</h3>
      <BooksCarousel title="Libros" books={books} emptyMessage="No hay compras registradas" />
      <MagazinesCarousel title="Revistas" magazines={magazines} emptyMessage="No hay compras registradas" />
    </div>
  );
}
