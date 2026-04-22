'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMagazineById } from '@/app/features/library/services/magazine.service';
import useLoading from '@/hooks/useLoading';
import SimilarMagazines from '@/app/features/library/components/SimilarMagazines';
import BackButton from '@/components/BackButton/BackButton';

export default function MagazineDetailPage() {
  const { id } = useParams();
  const [magazine, setMagazine] = useState(undefined);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMagazineById(id)
        .then((data) => setMagazine(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    const current = JSON.parse(localStorage.getItem('cart') || '[]');
    current.push(magazine);
    localStorage.setItem('cart', JSON.stringify(current));
    alert('Añadido al carrito');
  };

  if (!magazine) return <></>;

  return (
    <>
      <div className="mag-detail-page">
        <BackButton />
        <div className="mag-detail-main">
          <img src="/images/magazine.jpg" alt="Imagen de revista" />
          <div>
            <h1>Revista edición {magazine.edicion}</h1>
            <p><strong>Editorial:</strong> {magazine.editorial}</p>
            <p><strong>Categoría:</strong> {magazine.categoria}</p>
            <p>{`Revista ${magazine.periodicidad} de la editorial ${magazine.editorial}`}</p>
            <p className="price">${magazine.precio}</p>
            <button className="add-btn primary" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
      <SimilarMagazines id={magazine.id} />
    </>
  );
}