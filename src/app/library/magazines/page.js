'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Dropdown from '@/components/Dropdown/Dropdown';
import MagazinesList from '@/app/library/components/MagazinesList/MagazinesList';
import RecommendedMagazines from '@/app/library/components/RecommendedMagazines';
import Top10Magazines from '@/app/library/components/Top10Magazines';
import { getMagazinesCategories } from '@/app/library/services/magazine.service';

export default function MagazinesPage() {
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // filtros desde URL
  const category = searchParams.get('category') || '';
  const year = searchParams.get('year');
  const price = searchParams.get('price');
  const date = searchParams.get('date');

  useEffect(() => {
    getMagazinesCategories().then((data) => {
      if (Array.isArray(data)) {
        setCategories(
          data.map((value) => ({
            value,
            label: value.toUpperCase(),
          }))
        );
      }
    });
  }, []);

  // sincroniza dropdown con URL
  const handleCategoryChange = (option) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option) {
      params.set('category', option);
    } else {
      params.delete('category');
    }

    router.push(`/library/magazines?${params.toString()}`);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', margin: '1rem 2rem' }}>
        <Dropdown
          options={categories}
          label="Categorias"
          onChange={handleCategoryChange}
        />
      </div>

      <MagazinesList
        category={category}
        year={year}
        price={price}
        date={date}
      />

      <Top10Magazines />
      <RecommendedMagazines />
    </>
  );
}
