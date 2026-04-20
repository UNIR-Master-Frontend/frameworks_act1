'use client';
import { useEffect, useState } from 'react';
import { getMagazines, getMagazinesByCategory } from '@/app/features/library/services/magazine.service';
import MagazinesCarousel from '../MagazinesCarousel';
import useLoading from '@/hooks/useLoading';

export default function MagazinesList({ category = '' }) {
  const [magazines, setMagazines] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (category) {
      getMagazinesDataByCategory();
    } else {
      getMagazinesData();
    }
  }, [category]);

  const getMagazinesData = async () => {
    setLoading(true);
    const data = await getMagazines();
    setMagazines(data);
    setLoading(false);
  };

  const getMagazinesDataByCategory = async () => {
    setLoading(true);
    const data = await getMagazinesByCategory(category);
    setMagazines(data);
    setLoading(false);
  };

  return <MagazinesCarousel title="Listado de revistas" magazines={magazines} />;
}