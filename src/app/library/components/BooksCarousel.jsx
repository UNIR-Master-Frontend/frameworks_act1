'use client';
import Book from './Book/Book';
import Carousel from '@/components/Carousel/Carousel';

export default function BooksCarousel({ title = '', books = [], emptyMessage = '' }) {
  return Array.isArray(books) && books.length ? (
    <Carousel title={title}>
      {books.map((book) => (
        <div className="carousel-item" key={book.id + book.nombre}>
          <Book book={book} />
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