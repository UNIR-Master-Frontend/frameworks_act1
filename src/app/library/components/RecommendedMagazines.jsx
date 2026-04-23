'use client';
import { useEffect, useState } from 'react';
import { getRecommendedMagazines } from '@/app/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function RecommendedMagazines() {
  const [recommendedMagazines, setRecommendedMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadRecommendedMagazines = async () => {
      setLoading(true);

      try {
        const data = await getRecommendedMagazines();
        setRecommendedMagazines(Array.isArray(data?.recomendaciones) ? data.recomendaciones : []);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedMagazines();
  }, [setLoading]);

  return <MagazinesCarousel title="Revistas recomendadas" magazines={recommendedMagazines} />;
}
