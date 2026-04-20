'use client';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  return (
    <>
      <div className="library-navbar">
        <button onClick={() => router.push('/features/library/views/books')}>
          Libros
        </button>
        <button onClick={() => router.push('/features/library/views/magazine')}>
          Revistas
        </button>
        {user && (
          <button onClick={() => router.push('/features/library/views/purchases')}>
            Mis compras
          </button>
        )}
      </div>
      {children}
    </>
  );
}