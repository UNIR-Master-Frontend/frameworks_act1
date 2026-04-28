'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUser from '@/hooks/useUser';
import FilterSidebar from './components/FilterSidebar';
import styles from './layout.module.css';

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isBooksRoute = pathname.startsWith('/library/books');
  const isMagazinesRoute = pathname.startsWith('/library/magazines') || pathname.startsWith('/library/magazine');
  const isPurchasesRoute = pathname.startsWith('/library/purchases');

  const showSidebar = isBooksRoute || isMagazinesRoute;

  useEffect(() => {
    router.prefetch('/library/books');
    router.prefetch('/library/magazines');
    router.prefetch('/library/purchases');
  }, [router]);

  return (
    <div className={styles.libraryShell}>
      <div className={styles.subnav}>
        <Link
          href="/library/books"
          className={`${styles.subnavButton} ${isBooksRoute ? styles.subnavButtonActive : ''}`.trim()}
        >
          Libros
        </Link>
        <Link
          href="/library/magazines"
          className={`${styles.subnavButton} ${isMagazinesRoute ? styles.subnavButtonActive : ''}`.trim()}
        >
          Revistas
        </Link>
        {user && (
          <Link
            href="/library/purchases"
            className={`${styles.subnavButton} ${isPurchasesRoute ? styles.subnavButtonActive : ''}`.trim()}
          >
            Mis compras
          </Link>
        )}
      </div>

      {showSidebar && <FilterSidebar />}

      <main className={`${styles.content} ${showSidebar ? styles.contentWithSidebar : ''}`.trim()}>
        {children}
      </main>
    </div>
  );
}
