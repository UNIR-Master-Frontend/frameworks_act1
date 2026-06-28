import { Suspense } from 'react';

import { getMessages } from '@/config/i18n';
import MagazinesCatalog from '@/app/[lang]/library/components/MagazinesCatalog';
import MagazinesCarousel from '@/app/[lang]/library/components/MagazinesCarousel';
import {
  getMagazines,
  getRecommendedMagazines,
  getTop10Magazines,
} from '@/server/libreria';

export const revalidate = 900;

export default async function MagazinesPage({ params }) {
  const { lang } = await params;
  const messages = getMessages(lang).library;
  const [magazinesData, topMagazinesData, recommendedMagazinesData] =
    await Promise.all([
      getMagazines(),
      getTop10Magazines(),
      getRecommendedMagazines(),
    ]);

  const magazines = Array.isArray(magazinesData) ? magazinesData : [];
  const topMagazines = Array.isArray(topMagazinesData) ? topMagazinesData : [];
  const recommendedMagazines = Array.isArray(recommendedMagazinesData)
    ? recommendedMagazinesData
    : [];

  return (
    <>
      <Suspense fallback={null}>
        <MagazinesCatalog
          magazines={magazines}
          title={messages.listMagazines}
          emptyMessage={messages.noMagazines}
        />
      </Suspense>
      <MagazinesCarousel title={messages.top10Magazines} magazines={topMagazines} />
      <MagazinesCarousel
        title={messages.recommendedMagazines}
        magazines={recommendedMagazines}
      />
    </>
  );
}
