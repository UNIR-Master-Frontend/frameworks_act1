'use client';
import { useRef } from 'react';
import './styles.css';

export default function Carousel({ title = '', children }) {
  const carouselRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const moved = useRef(false);

  const onMouseDown = (e) => {
    isDown.current = true;
    moved.current = false;
    carouselRef.current.classList.add('dragging');
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    carouselRef.current.classList.remove('dragging');
  };

  const onMouseUp = () => {
    isDown.current = false;
    carouselRef.current.classList.remove('dragging');
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    moved.current = true;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-title">
        <span>
          <h3>{title}</h3>
        </span>
      </div>
      <div
        className="carousel-content"
        ref={carouselRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {children}
      </div>
    </div>
  );
}