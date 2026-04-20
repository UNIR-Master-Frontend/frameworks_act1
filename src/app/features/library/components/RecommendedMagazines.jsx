'use client';
import { useEffect, useState } from 'react';
import { getRecommendedMagazines } from '@/app/features/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function RecommendedMagazines() {
  const [recommendedMagazines, setRecommendedMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getRecommendedMagazinesData();
  }, []);

  const getRecommendedMagazinesData = async () => {
    setLoading(true);
    const data = await getRecommendedMagazines();
    setRecommendedMagazines(data.recomendaciones);
    setLoading(false);
  };

  return <MagazinesCarousel title="Revistas recomendadas" magazines={recommendedMagazines} />;
}