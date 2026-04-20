'use client';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown/Dropdown';
import MagazinesList from '@/app/features/library/components/MagazinesList/MagazinesList';
import RecommendedMagazines from '@/app/features/library/components/RecommendedMagazines';
import Top10Magazines from '@/app/features/library/components/Top10Magazines';
import { getMagazinesCategories } from '@/app/features/library/services/magazine.service';

export default function MagazinesPage() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    getMagazinesCategories().then((data) => {
      setCategories(data.map((value) => ({
        value,
        label: value.toLocaleUpperCase(),
      })));
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', margin: '1rem 2rem' }}>
        <Dropdown
          options={categories}
          label="Categorías"
          onChange={(option) => setCategory(option)}
        />
      </div>
      <MagazinesList category={category} />
      <Top10Magazines />
      <RecommendedMagazines />
    </>
  );
}