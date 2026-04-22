'use client';
import { useEffect, useState } from 'react';
import { getSimilarMagazines } from '@/app/features/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function SimilarMagazines({ id }) {
  const [similarMagazines, setSimilarMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    getSimilarMagazinesData();
  }, []);

  const getSimilarMagazinesData = async () => {
    setLoading(true);
    const data = await getSimilarMagazines(id);
    setSimilarMagazines(data);
    setLoading(false);
  };

  return <MagazinesCarousel title="Revistas similares" magazines={similarMagazines} />;
}