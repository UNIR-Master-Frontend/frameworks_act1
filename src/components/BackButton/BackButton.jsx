'use client';
import { useRouter } from 'next/navigation';
import { useMessages } from '@/context/LanguageContext';
import './styles.css';

export default function BackButton({ className = '' }) {
  const router = useRouter();
  const messages = useMessages();

  return (
    <button className={`back-link ${className}`.trim()} onClick={() => router.back()}>
      <span className="back-link__arrow">←</span>
      <span>{messages.library.back}</span>
    </button>
  );
}
