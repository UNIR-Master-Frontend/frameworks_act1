'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import useUser from '@/hooks/useUser';

import FilterSidebar from './components/FilterSidebar';
import styles from './layout.module.css';

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // detectar rutas
  const isBooksRoute = pathname.startsWith('/library/books');
  const isMagazinesRoute = pathname.startsWith('/library/magazines');
  const isPurchasesRoute = pathname.startsWith('/library/purchases');

  const showSidebar = isBooksRoute || isMagazinesRoute;

  // detectar mobile
  const [isMobile, setIsMobile] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // prefetch
  useEffect(() => {
    router.prefetch('/library/books');
    router.prefetch('/library/magazines');
    router.prefetch('/library/purchases');
  }, [router]);

  return (
    <div className={styles.libraryShell}>

      {/* NAV */}
      <div className={styles.subnav}>
        <Link
          href="/library/books"
          className={`${styles.subnavButton} ${isBooksRoute ? styles.subnavButtonActive : ''}`}
        >
          Libros
        </Link>

        <Link
          href="/library/magazines"
          className={`${styles.subnavButton} ${isMagazinesRoute ? styles.subnavButtonActive : ''}`}
        >
          Revistas
        </Link>

        {user && (
          <Link
            href="/library/purchases"
            className={`${styles.subnavButton} ${isPurchasesRoute ? styles.subnavButtonActive : ''}`}
          >
            Mis compras
          </Link>
        )}
      </div>

      {/* BOTÓN SOLO MOBILE */}
      {showSidebar && isMobile && (
        <button
          className="fixed top-[90px] left-4 z-50 bg-[var(--primary-600)] text-white px-4 py-2 rounded shadow"
          onClick={() => setOpenFilters(true)}
        >
          Filtros
        </button>
      )}

      {/* SIDEBAR DESKTOP */}
      {showSidebar && !isMobile && <FilterSidebar />}

      {/* SIDEBAR MOBILE (DRAWER) */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-50 transition ${
            openFilters ? 'bg-black/40' : 'pointer-events-none'
          }`}
          onClick={() => setOpenFilters(false)}
        >
          <div
            className={`w-72 h-full bg-white p-4 overflow-y-auto transform transition-transform ${
              openFilters ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mb-4 text-sm font-semibold"
              onClick={() => setOpenFilters(false)}
            >
              ✕ Cerrar
            </button>

            <FilterSidebar onClose={() => setOpenFilters(false)} />
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <main
        className={`${styles.content} ${
          showSidebar && !isMobile ? styles.contentWithSidebar : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
}