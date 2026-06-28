'use client';
import Book from './Book/Book';
import Carousel from '@/components/Carousel/Carousel';

export default function BooksCarousel({
  title = '',
  books = [],
  emptyMessage = ''
}) {
  if (!Array.isArray(books) || books.length === 0) {
    return (
      <>
        <h3>{title}</h3>
        <h5 className="pl-5">{emptyMessage || 'No hay libros disponibles'}</h5>
      </>
    );
  }

  return (
    <Carousel title={title}>
      {books.map((book, index) => (
        <div
          key={`${book.detalle_compra_id ?? book.compra_id ?? 'book'}-${book.id}-${index}`}
          className="carousel-item"
        >
          <Book book={book} />
        </div>
      ))}
    </Carousel>
  );
}
