'use client';

import { useState } from 'react';
import styles from '@/app/[lang]/library/detail.module.css';

export default function BookPurchaseControls({ messages }) {
  const [counter, setCounter] = useState(1);

  const addToCounter = (value) => {
    setCounter((current) => Math.min(5, Math.max(1, current + value)));
  };

  return (
    <section className={styles.purchaseCard}>
      <h2 className={styles.purchaseTitle}>{messages.quantity}</h2>
      <div className={styles.purchaseActions}>
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={() => addToCounter(-1)}
            disabled={counter === 1}
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
            disabled={counter === 5}
          >
            +
          </button>
        </div>
        <button
          className={styles.primaryButton}
          onClick={() => alert(messages.purchaseSuccess)}
        >
          {messages.buy}
        </button>
      </div>
      <p className={styles.quantityHint}>{messages.maxUnits}</p>
    </section>
  );
}
