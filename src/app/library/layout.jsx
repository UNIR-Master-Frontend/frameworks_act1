'use client';
import { useRouter, usePathname } from 'next/navigation';
import useUser from '@/hooks/useUser';
import FilterSidebar from './components/FilterSidebar';

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  //  Mostrar sidebar SOLO en books y magazines
  const showSidebar =
    pathname.includes('/library/books') ||
    pathname.includes('/library/magazines');

  return (
    <>
      {/* NAVBAR */}
      <div className="library-navbar h-[60px] flex items-center gap-4 px-4 border-b bg-white z-20 relative">
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

      {/* SIDEBAR  */}
      {showSidebar && <FilterSidebar />}

      {/* CONTENIDO */}
      <main className={`${showSidebar ? 'ml-64' : ''} mt-[60px] p-4`}>
        {children}
      </main>
    </>
  );
}
