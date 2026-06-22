import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMessages } from '@/config/i18n';
import MagazineCartButton from '@/app/[lang]/library/components/MagazineCartButton';
import MagazinesCarousel from '@/app/[lang]/library/components/MagazinesCarousel';
import BackButton from '@/components/BackButton/BackButton';
import {
  getMagazineById,
  getMagazines,
  getSimilarMagazines,
} from '@/app/[lang]/library/services/magazine.service';
import styles from '@/app/[lang]/library/detail.module.css';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const magazines = await getMagazines();

  if (!Array.isArray(magazines)) return [];

  return magazines
    .filter((magazine) => magazine?.id !== undefined && magazine?.id !== null)
    .map((magazine) => ({
      id: String(magazine.id),
    }));
}

export default async function MagazineDetailPage({ params }) {
  const { id, lang } = await params;
  const messages = getMessages(lang);
  const t = messages.detail;
  const [magazine, similarMagazinesData] = await Promise.all([
    getMagazineById(id),
    getSimilarMagazines(id),
  ]);

  if (!magazine) {
    notFound();
  }

  const similarMagazines = Array.isArray(similarMagazinesData)
    ? similarMagazinesData
    : [];

  return (
    <>
      <div className={styles.detailPage}>
        <div className={styles.detailTopbar}>
          <BackButton />
        </div>

        <div className={styles.detailGrid}>
          <div className={`${styles.visualPanel} ${styles.magazineVisual}`}>
            <div className={styles.visualGlow} />
            <Image
              className={styles.visualImage}
              src="/images/jpg/magazine.jpg"
              alt={magazine.nombre}
              fill
              sizes="(min-width: 900px) 45vw, 100vw"
            />
          </div>

          <div className={styles.contentPanel}>
            <header className={styles.headlineBlock}>
              <p className={styles.eyebrow}>{t.magazineEyebrow}</p>
              <h1 className={styles.title}>{t.magazineEdition} {magazine.edicion}</h1>
            </header>

            <section className={styles.infoStack}>
              <div className={styles.infoBlock}>
                <p className={styles.label}>{t.editorial}</p>
                <p className={styles.value}>{magazine.editorial}</p>
              </div>
              <div className={styles.infoBlock}>
                <p className={styles.label}>{t.category}</p>
                <p className={styles.value}>{magazine.categoria}</p>
              </div>
              <p className={styles.summary}>
                {t.magazineSummary
                  .replace('{periodicidad}', magazine.periodicidad)
                  .replace('{editorial}', magazine.editorial)}
              </p>
              <div className={styles.priceRow}>
                <p className={styles.currentPrice}>${magazine.precio}</p>
              </div>
              <MagazineCartButton magazine={magazine} messages={t} />
            </section>
          </div>
        </div>
      </div>

      <div className={styles.similarSection}>
        <MagazinesCarousel title={messages.library.similarMagazines} magazines={similarMagazines} />
      </div>
    </>
  );
}
