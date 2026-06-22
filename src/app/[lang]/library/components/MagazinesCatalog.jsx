'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import MagazinesCarousel from './MagazinesCarousel';

const normalize = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function MagazinesCatalog({ magazines = [], title = '', emptyMessage = '' }) {
  const searchParams = useSearchParams();

  const filteredMagazines = useMemo(() => {
    let currentMagazines = Array.isArray(magazines) ? magazines : [];
    const category = searchParams.get('category') || '';
    const year = searchParams.get('year') || '';
    const priceMin = searchParams.get('priceMin') || '';
    const priceMax = searchParams.get('priceMax') || '';

    if (category) {
      const normalizedCategory = normalize(category);

      currentMagazines = currentMagazines.filter(
        (magazine) => normalize(magazine?.categoria || '') === normalizedCategory,
      );
    }

    if (year) {
      currentMagazines = currentMagazines.filter(
        (magazine) => String(magazine.anio_publicacion) === String(year),
      );
    }

    if (priceMin) {
      currentMagazines = currentMagazines.filter(
        (magazine) => Number(magazine.precio) >= Number(priceMin),
      );
    }

    if (priceMax) {
      currentMagazines = currentMagazines.filter(
        (magazine) => Number(magazine.precio) <= Number(priceMax),
      );
    }

    return currentMagazines;
  }, [magazines, searchParams]);

  return (
    <MagazinesCarousel
      title={title}
      magazines={filteredMagazines}
      emptyMessage={emptyMessage}
    />
  );
}
