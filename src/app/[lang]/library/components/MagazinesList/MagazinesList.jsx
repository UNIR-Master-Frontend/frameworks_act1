'use client';
import { useEffect, useState } from 'react';
import { useMessages } from '@/context/LanguageContext';
import { getMagazines } from '@/app/[lang]/library/services/magazine.service';
import MagazinesCarousel from '../MagazinesCarousel';
import useLoading from '@/hooks/useLoading';

export default function MagazinesList({ category = '', year, priceMin, priceMax }) {
  const messages = useMessages();
  const [magazines, setMagazines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoading();

  // normalizador 
  const normalize = (text) =>
    text
      ?.toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  useEffect(() => {
    const loadMagazines = async () => {
      setLoading(true);
      setIsLoading(true);

      try {
        let data = await getMagazines();

        // validar
        data = Array.isArray(data) ? data : [];

        // DEBUG 
        const uniqueCategories = [
          ...new Set(data.map((m) => m.categoria)),
        ];
        console.log('📰 CATEGORIAS REVISTAS:', uniqueCategories);

        // FILTRO POR CATEGORÍA
        if (category) {
          const normalizedCategory = normalize(category);

          data = data.filter((m) => {
            const cat = normalize(m?.categoria || '');
            return cat === normalizedCategory;
          });
        }

        // FILTRO POR AÑO
        if (year) {
          data = data.filter(
            (m) =>
              String(m.anio_publicacion) === String(year)
          );
        }

        // PRECIO MÍNIMO
        if (priceMin) {
          data = data.filter(
            (m) =>
              Number(m.precio) >= Number(priceMin)
          );
        }

        // PRECIO MÁXIMO
        if (priceMax) {
          data = data.filter(
            (m) =>
              Number(m.precio) <= Number(priceMax)
          );
        }

        setMagazines(data);
      } catch (error) {
        console.error('Error cargando revistas:', error);
        setMagazines([]);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    loadMagazines();
  }, [category, year, priceMin, priceMax, setLoading]);

  // loading
  if (isLoading) {
    return <p className="p-4">{messages.library.loading}</p>;
  }

  // sin resultados
  if (magazines.length === 0) {
    return (
      <p className="p-4 text-gray-500">
        {messages.library.noMagazines}
      </p>
    );
  }


  return (
    <MagazinesCarousel
      title={messages.library.listMagazines}
      magazines={magazines}
    />
  );
}