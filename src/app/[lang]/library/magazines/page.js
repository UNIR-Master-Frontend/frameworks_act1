'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import MagazinesList from '@/app/[lang]/library/components/MagazinesList/MagazinesList';
import RecommendedMagazines from '@/app/[lang]/library/components/RecommendedMagazines';
import Top10Magazines from '@/app/[lang]/library/components/Top10Magazines';

function MagazinesPageContent() {
  const searchParams = useSearchParams();

  // 🔥 NORMALIZAR filtros (CLAVE)
  const category = (searchParams.get('category') || '').toUpperCase();
  const year = searchParams.get('year') || '';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';

  return (
    <>
      {/* 📚 LISTADO */}
      <MagazinesList
        category={category}
        year={year}
        priceMin={priceMin}
        priceMax={priceMax}
      />

      {/* 🔥 SECCIONES */}
      <Top10Magazines />
      <RecommendedMagazines />
    </>
  );
}

export default function MagazinesPage() {
  return (
    <Suspense fallback={null}>
      <MagazinesPageContent />
    </Suspense>
  );
}
