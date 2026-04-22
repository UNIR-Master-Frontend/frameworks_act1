'use client';
import Carousel from '@/components/Carousel/Carousel';
import Magazine from './Magazine/Magazine';

export default function MagazinesCarousel({ title = '', magazines = [], emptyMessage = '' }) {
  return magazines.length ? (
    <Carousel title={title}>
      {magazines.map((magazine) => (
        <div className="carousel-item" key={magazine.id + magazine.nombre}>
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