'use client';
import { useEffect, useState } from 'react';
import { getRecommendedMagazines } from '@/app/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function RecommendedMagazines() {
  const [recommendedMagazines, setRecommendedMagazines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadRecommendedMagazines = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        const data = await getRecommendedMagazines();
        setRecommendedMagazines(Array.isArray(data?.recomendaciones) ? data.recomendaciones : []);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadRecommendedMagazines();
  }, [setLoading]);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return <MagazinesCarousel title="Revistas recomendadas" magazines={recommendedMagazines} />;
}
