'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getRecommendedMagazines } from '@/app/[lang]/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function RecommendedMagazines() {
  const messages = useMessages();
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

  return <MagazinesCarousel title={messages.library.recommendedMagazines} magazines={recommendedMagazines} />;
}
