'use client';
import { useEffect, useState } from 'react';
import { getMagazines, getMagazinesByCategory } from '@/app/library/services/magazine.service';
import MagazinesCarousel from '../MagazinesCarousel';
import useLoading from '@/hooks/useLoading';

export default function MagazinesList({ category = '' }) {
  const [magazines, setMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadMagazines = async () => {
      setLoading(true);

      try {
        const data = category
          ? await getMagazinesByCategory(category)
          : await getMagazines();

        setMagazines(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    loadMagazines();
  }, [category, setLoading]);

  return <MagazinesCarousel title="Listado de revistas" magazines={magazines} />;
}
