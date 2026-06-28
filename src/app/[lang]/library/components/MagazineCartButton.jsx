'use client';

import { useState } from 'react';
import useUser from '@/hooks/useUser';
import { createPurchase } from '@/app/[lang]/library/services/purchase.service';
import styles from '@/app/[lang]/library/detail.module.css';

export default function MagazineCartButton({ magazine, messages }) {
  const { user } = useUser();
  const [isBuying, setIsBuying] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsBuying(true);
      await createPurchase({ product: magazine, user });
      alert(messages.purchaseSuccess);
    } catch (error) {
      console.error('Error comprando revista:', error);
      alert(error.message);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <button
      className={styles.primaryButton}
      onClick={handlePurchase}
      disabled={isBuying}
    >
      {messages.buy}
    </button>
  );
}
