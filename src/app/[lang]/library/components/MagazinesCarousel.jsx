'use client';
import Carousel from '@/components/Carousel/Carousel';
import Magazine from './Magazine/Magazine';

export default function MagazinesCarousel({ title = '', magazines = [], emptyMessage = '' }) {
  return Array.isArray(magazines) && magazines.length ? (
    <Carousel title={title}>
      {magazines.map((magazine, index) => (
        <div
          className="carousel-item"
          key={`${magazine.detalle_compra_id ?? magazine.compra_id ?? 'magazine'}-${magazine.id}-${index}`}
        >
          <Magazine magazine={magazine} />
        </div>
      ))}
    </Carousel>
  ) : (
    <>
      <h3>{title}</h3>
      <h5 className="pl-5">{emptyMessage}</h5>
    </>
  );
}
