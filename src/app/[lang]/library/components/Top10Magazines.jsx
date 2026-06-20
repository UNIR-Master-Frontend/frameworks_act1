'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getTop10Magazines } from '@/app/[lang]/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';
import CarouselSkeleton from './CarouselSkeleton';

export default function Top10Magazines() {
  const messages = useMessages();
  const [magazines, setMagazines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadTopMagazines = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        const data = await getTop10Magazines();
        setMagazines(Array.isArray(data) ? data : []);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadTopMagazines();
  }, [setLoading]);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return <MagazinesCarousel title={messages.library.top10Magazines} magazines={magazines} />;
}
