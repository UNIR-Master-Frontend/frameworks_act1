'use client';

import styles from '@/app/[lang]/library/detail.module.css';

export default function MagazineCartButton({ magazine, messages }) {
  const handleAddToCart = () => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    current.push(magazine);
    localStorage.setItem('cart', JSON.stringify(current));
    alert(messages.addedToCart);
  };

  return (
    <button className={styles.primaryButton} onClick={handleAddToCart}>
      {messages.addToCart}
    </button>
  );
}
