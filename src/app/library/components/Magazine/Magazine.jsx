'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card/Card';
import './styles.css';

const imagesmagazines = [
  '/images/png/mag1.png',
  '/images/png/mag2.png',
  '/images/png/mag3.png',
  '/images/png/mag4.png',
  '/images/png/mag5.png',
  '/images/png/mag6.png',
  '/images/png/mag7.png',
  '/images/png/mag8.png',
  '/images/png/mag9.png',
  '/images/png/mag10.png',
];

export default function Magazine({ magazine }) {
  const router = useRouter();
  const imageIndex = Number(magazine?.id ?? 1) % imagesmagazines.length;
  const selectedImage = imagesmagazines[imageIndex];

  const goToDetail = () => {
    router.push(`/library/magazines/${magazine.id}`);
  };

  return (
    <Card onClick={goToDetail}>
      <div className="book-img">
        <img src={selectedImage} alt="Imagen de revista" />
      </div>
      <div className="magazine-content">
        <h4>Revista edicion {magazine.edicion}</h4>
        <h5>{magazine.nombre}</h5>
        <h5>Categoria: {magazine.categoria?.toLocaleUpperCase() ?? '-'}</h5>
        <small>${magazine.precio}</small>
        <div className="magazine-link">
          Mas informacion <span className="arrow">-&gt;</span>
        </div>
      </div>
    </Card>
  );
}
