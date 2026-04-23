'use client';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      <div className="library-navbar">
        <button onClick={() => router.push('/library/books')}>
          Libros
        </button>
        <button onClick={() => router.push('/library/magazines')}>
          Revistas
        </button>
        {user && (
          <button onClick={() => router.push('/library/purchases')}>
            Mis compras
          </button>
        )}
      </div>
      {children}
    </>
  );
}
