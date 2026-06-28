'use client';

import { useState } from 'react';
import useUser from '@/hooks/useUser';
import { createPurchase } from '@/app/[lang]/library/services/purchase.service';
import styles from '@/app/[lang]/library/detail.module.css';

export default function BookPurchaseControls({ book, messages }) {
  const { user } = useUser();
  const [counter, setCounter] = useState(1);
  const [isBuying, setIsBuying] = useState(false);

  const addToCounter = (value) => {
    setCounter((current) => Math.min(5, Math.max(1, current + value)));
  };

  const handlePurchase = async () => {
    try {
      setIsBuying(true);
      await createPurchase({ product: book, quantity: counter, user });
      alert(messages.purchaseSuccess);
    } catch (error) {
      console.error('Error comprando libro:', error);
      alert(error.message);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <section className={styles.purchaseCard}>
      <h2 className={styles.purchaseTitle}>{messages.quantity}</h2>
      <div className={styles.purchaseActions}>
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={() => addToCounter(-1)}
            disabled={counter === 1 || isBuying}
          >
            -
          </button>
          <input
            className={styles.quantityValue}
            id="quantity"
            type="number"
            value={counter}
            readOnly
          />
          <button
            className={styles.quantityButton}
            onClick={() => addToCounter(1)}
            disabled={counter === 5 || isBuying}
          >
            +
          </button>
        </div>
        <button
          className={styles.primaryButton}
          onClick={handlePurchase}
          disabled={isBuying}
        >
          {messages.buy}
        </button>
      </div>
      <p className={styles.quantityHint}>{messages.maxUnits}</p>
    </section>
  );
}
