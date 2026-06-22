'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import useUser from '@/hooks/useUser';

import FilterSidebar from './components/FilterSidebar';
import styles from './layout.module.css';
import { useLang, useMessages } from '@/context/LanguageContext';

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const lang = useLang();
  const messages = useMessages();

  const isBooksRoute = pathname.includes('/library/books');
  const isMagazinesRoute = pathname.includes('/library/magazines');
  const isPurchasesRoute = pathname.includes('/library/purchases');

  const showSidebar = isBooksRoute || isMagazinesRoute;

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

  useEffect(() => {
    router.prefetch(`/${lang}/library/books`);
    router.prefetch(`/${lang}/library/magazines`);
    router.prefetch(`/${lang}/library/purchases`);
  }, [router, lang]);

  return (
    <div className={styles.libraryShell}>
      <div className={styles.subnav}>
        <Link
          href={`/${lang}/library/books`}
          className={`${styles.subnavButton} ${isBooksRoute ? styles.subnavButtonActive : ''}`}
        >
          {messages.library.books}
        </Link>

        <Link
          href={`/${lang}/library/magazines`}
          className={`${styles.subnavButton} ${isMagazinesRoute ? styles.subnavButtonActive : ''}`}
        >
          {messages.library.magazines}
        </Link>

        {user && (
          <Link
            href={`/${lang}/library/purchases`}
            className={`${styles.subnavButton} ${isPurchasesRoute ? styles.subnavButtonActive : ''}`}
          >
            {messages.library.myPurchases}
          </Link>
        )}
      </div>

      {showSidebar && isMobile && (
        <button
          className="fixed top-[90px] left-4 z-50 bg-[var(--primary-600)] text-white px-4 py-2 rounded shadow"
          onClick={() => setOpenFilters(true)}
        >
          Filtros
        </button>
      )}

      {showSidebar && !isMobile && (
        <Suspense fallback={null}>
          <FilterSidebar />
        </Suspense>
      )}

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
              Cerrar
            </button>

            <Suspense fallback={null}>
              <FilterSidebar onClose={() => setOpenFilters(false)} />
            </Suspense>
          </div>
        </div>
      )}

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
