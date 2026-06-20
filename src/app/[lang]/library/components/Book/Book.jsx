'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card/Card';
import { useLang } from '@/context/LanguageContext';
import './styles.css';

const imagesbooks = [
  '/images/png/book1.png',
  '/images/png/book2.png',
  '/images/png/book3.png',
  '/images/png/book4.png',
  '/images/png/book5.png',
  '/images/png/book6.png',
  '/images/png/book7.png',
  '/images/png/book8.png',
  '/images/png/book9.png',
  '/images/png/book10.png',
];

export default function Book({ book }) {
  const router = useRouter();
  const lang = useLang();
  const imageIndex = Number(book?.id ?? 1) % imagesbooks.length;
  const selectedImage = imagesbooks[imageIndex];

  const goToDetail = () => {
    router.push(`/${lang}/library/books/${book.id}`);
  };

  return (
    <Card onClick={goToDetail}>
      <div className="book-img">
        <img src={selectedImage} alt="Imagen de libro" />
      </div>
      <div className="book-content">
        <h4>{book.nombre}</h4>
        <h5>{book.autor}</h5>
        <h5>Categoria: {book.categoria?.toLocaleUpperCase() ?? '-'}</h5>
        <small>${book.precio}</small>
        <div className="book-link">
          Mas informacion <span className="arrow">-&gt;</span>
        </div>
      </div>
    </Card>
  );
}
