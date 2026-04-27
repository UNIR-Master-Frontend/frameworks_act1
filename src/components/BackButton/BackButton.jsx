'use client';
import { useRouter } from 'next/navigation';
import './styles.css';

export default function BackButton({ className = '' }) {
  const router = useRouter();

  return (
    <button className={`back-link ${className}`.trim()} onClick={() => router.back()}>
      <span className="back-link__arrow">←</span>
      <span>Volver</span>
    </button>
  );
}
