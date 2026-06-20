'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMagazineById } from '@/app/[lang]/library/services/magazine.service';
import useLoading from '@/hooks/useLoading';
import SimilarMagazines from '@/app/[lang]/library/components/SimilarMagazines';
import BackButton from '@/components/BackButton/BackButton';
import styles from '@/app/[lang]/library/detail.module.css';
import { useMessages } from '@/context/LanguageContext';

export default function MagazineDetailPage() {
  const { id } = useParams();
  const [magazine, setMagazine] = useState(undefined);
  const { setLoading } = useLoading();
  const t = useMessages().detail;

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMagazineById(id)
        .then((data) => setMagazine(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const handleAddToCart = () => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    current.push(magazine);
    localStorage.setItem('cart', JSON.stringify(current));
    alert(t.addedToCart);
  };

  if (!magazine) return <></>;

  return (
    <>
      <div className={styles.detailPage}>
        <div className={styles.detailTopbar}>
          <BackButton />
        </div>

        <div className={styles.detailGrid}>
          <div className={`${styles.visualPanel} ${styles.magazineVisual}`}>
            <div className={styles.visualGlow} />
            <img className={styles.visualImage} src="/images/jpg/magazine.jpg" alt={magazine.nombre} />
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
                  .replace("{periodicidad}", magazine.periodicidad)
                  .replace("{editorial}", magazine.editorial)}
              </p>
              <div className={styles.priceRow}>
                <p className={styles.currentPrice}>${magazine.precio}</p>
              </div>
              <button className={styles.primaryButton} onClick={handleAddToCart}>
                {t.addToCart}
              </button>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.similarSection}>
        <SimilarMagazines id={magazine.id} />
      </div>
    </>
  );
}
