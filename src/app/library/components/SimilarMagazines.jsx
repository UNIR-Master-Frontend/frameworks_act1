'use client';
import { useEffect, useState } from 'react';
import { getSimilarMagazines } from '@/app/library/services/magazine.service';
import MagazinesCarousel from './MagazinesCarousel';
import { useLoading } from '@/context/LoadingContext';

export default function SimilarMagazines({ id }) {
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

  return <MagazinesCarousel title="Revistas similares" magazines={similarMagazines} />;
}
