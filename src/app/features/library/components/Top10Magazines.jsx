'use client';
import { useEffect, useState } from 'react';
import { getTop10Magazines } from '@/app/features/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function Top10Magazines() {
  const [magazines, setMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getMagazinesData();
  }, []);

  const getMagazinesData = async () => {
    setLoading(true);
    const data = await getTop10Magazines();
    setMagazines(data);
    setLoading(false);
  };

  return <MagazinesCarousel title="Top 10 de revistas más vendidas" magazines={magazines} />;
}