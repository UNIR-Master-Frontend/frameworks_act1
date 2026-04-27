'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookById } from '@/app/library/services/book.service';
import useLoading from '@/hooks/useLoading';
import SimilarBooks from '@/app/library/components/SimilarBooks';
import BackButton from '@/components/BackButton/BackButton';
import styles from '@/app/library/detail.module.css';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(undefined);
  const [counter, setCounter] = useState(1);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBookById(id)
        .then((data) => setBook(data))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const addToCounter = (value) => {
    setCounter((current) => Math.min(5, Math.max(1, current + value)));
  };

  if (!book) return <></>;

  const originalPrice = Number((book.precio * 1.11).toFixed(2));

  return (
    <>
      <div className={styles.detailPage}>
        <div className={styles.detailTopbar}>
          <BackButton />
        </div>

        <div className={styles.detailGrid}>
          <div className={`${styles.visualPanel} ${styles.bookVisual}`}>
            <div className={styles.visualGlow} />
            <img className={styles.visualImage} src="/images/jpg/book.jpg" alt={book.nombre} />
          </div>

          <div className={styles.contentPanel}>
            <header className={styles.headlineBlock}>
              <p className={styles.eyebrow}>Libro recomendado</p>
              <h1 className={styles.title}>{book.nombre}</h1>
              <p className={styles.subtitle}>{book.autor}</p>
              <div className={styles.priceRow}>
                <p className={styles.oldPrice}>${originalPrice}</p>
                <p className={styles.currentPrice}>${book.precio}</p>
              </div>
            </header>

            <section className={styles.infoStack}>
              <div className={styles.infoBlock}>
                <p className={styles.label}>Editorial</p>
                <p className={styles.value}>{book.editorial}</p>
              </div>
            </section>

            <section className={styles.purchaseCard}>
              <h2 className={styles.purchaseTitle}>Cantidad</h2>
              <div className={styles.purchaseActions}>
                <div className={styles.quantityControls}>
                  <button className={styles.quantityButton} onClick={() => addToCounter(-1)} disabled={counter === 1}>
                    -
                  </button>
                  <input className={styles.quantityValue} id="quantity" type="number" value={counter} readOnly />
                  <button className={styles.quantityButton} onClick={() => addToCounter(1)} disabled={counter === 5}>
                    +
                  </button>
                </div>
                <button className={styles.primaryButton} onClick={() => alert('Compra realizada correctamente')}>
                  Comprar
                </button>
              </div>
              <p className={styles.quantityHint}>Maximo 5 unidades</p>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.similarSection}>
        <SimilarBooks id={book.id} />
      </div>
    </>
  );
}
