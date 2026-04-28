'use client';
import { useEffect, useState } from 'react';
import { getMagazines, getMagazinesByCategory } from '@/app/library/services/magazine.service';
import MagazinesCarousel from '../MagazinesCarousel';
import useLoading from '@/hooks/useLoading';
import CarouselSkeleton from '../CarouselSkeleton';

export default function MagazinesList({ category = '', year, price, date }) {
  const [magazines, setMagazines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  useEffect(() => {
    const loadMagazines = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        // 🔹 1. Obtener datos base
        let data = category
          ? await getMagazinesByCategory(category)
          : await getMagazines();

        // 🔹 2. Validar
        data = Array.isArray(data) ? data : [];

        // 🔥 3. Aplicar filtros

        if (year) {
          data = data.filter(
            (m) => String(m.year) === String(year)
          );
        }

        if (price) {
          data = data.filter(
            (m) => Number(m.price) <= Number(price)
          );
        }

        if (date) {
          data = data.filter(
            (m) => m.date === date
          );
        }

        // 🔹 4. Set final
        setMagazines(data);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadMagazines();
  }, [category, year, price, date, setLoading]);

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return <MagazinesCarousel title="Listado de revistas" magazines={magazines} />;
}
