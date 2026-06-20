'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getSimilarMagazines } from '@/app/[lang]/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function SimilarMagazines({ id }) {
  const messages = useMessages();
  const [similarMagazines, setSimilarMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!id) return;

    const loadSimilarMagazines = async () => {
      setLoading(true);

      try {
        const data = await getSimilarMagazines(id);
        setSimilarMagazines(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    loadSimilarMagazines();
  }, [id, setLoading]);

  return <MagazinesCarousel title={messages.library.similarMagazines} magazines={similarMagazines} />;
}
