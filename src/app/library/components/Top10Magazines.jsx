'use client';
import { useEffect, useState } from 'react';
import { getTop10Magazines } from '@/app/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function Top10Magazines() {
  const [magazines, setMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadTopMagazines = async () => {
      setLoading(true);

      try {
        const data = await getTop10Magazines();
        setMagazines(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    loadTopMagazines();
  }, [setLoading]);

  return <MagazinesCarousel title="Top 10 de revistas mas vendidas" magazines={magazines} />;
}
