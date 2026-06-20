'use client';
import './carousel-skeleton.css';

export default function CarouselSkeleton({ cards = 4 }) {
  return (
    <div className="library-skeleton">
      <div className="library-skeleton__title" />
      <div className="library-skeleton__row">
        {Array.from({ length: cards }).map((_, index) => (
          <div className="library-skeleton__card" key={index}>
            <div className="library-skeleton__image" />
            <div className="library-skeleton__line library-skeleton__line--lg" />
            <div className="library-skeleton__line" />
            <div className="library-skeleton__line library-skeleton__line--sm" />
            <div className="library-skeleton__line library-skeleton__line--price" />
            <div className="library-skeleton__cta" />
          </div>
        ))}
      </div>
    </div>
  );
}
