'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import MagazinesList from '@/app/library/components/MagazinesList/MagazinesList';
import RecommendedMagazines from '@/app/library/components/RecommendedMagazines';
import Top10Magazines from '@/app/library/components/Top10Magazines';

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
    <Suspense fallback={<div>Cargando...</div>}>
      <MagazinesPageContent />
    </Suspense>
  );
}
