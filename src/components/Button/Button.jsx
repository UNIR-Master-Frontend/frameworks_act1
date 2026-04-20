'use client';
import './styles.css';

export default function Button({ variant, onClick, type, disabled, label }) {
  const btnVariant = variant || 'primary';

  return (
    <button
      className={btnVariant}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      <span>{label}</span>
    </button>
  );
}