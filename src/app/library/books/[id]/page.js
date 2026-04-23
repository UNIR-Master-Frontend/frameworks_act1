'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookById } from '@/app/library/services/book.service';
import useLoading from '@/hooks/useLoading';
import SimilarBooks from '@/app/library/components/SimilarBooks';
import BackButton from '@/components/BackButton/BackButton';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(undefined);
  const [counter, setCounter] = useState(1);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBookById(id)
        .then((data) => setBook(data))
        .finally(() => setLoading(false));
    }
  }, [id, setLoading]);

  const addToCounter = (value) => {
    setCounter((current) => current + value);
  };

  if (!book) return <></>;

  return (
    <>
      <div className="container overlay">
        <div className="p-4">
          <BackButton />
        </div>
        <div className="grid">
          <section className="intro-container">
            <h1>{book.nombre}</h1>
            <h3>{book.autor}</h3>
            <span>
              <h3>${book.precio + 50}</h3>
              <h2>${book.precio}</h2>
            </span>
          </section>
          <div className="image-container">
            <img className="book-image" src="/images/book.jpg" alt="Libro" />
          </div>
          <section className="info-container">
            <h3>Editorial</h3>
            <p>{book.editorial}</p>
          </section>
          <section className="quantity-container">
            <h3>Cantidad</h3>
            <div className="quantity-input-container">
              <button className="text minus" onClick={() => addToCounter(-1)} disabled={counter === 1}>-</button>
              <input id="quantity" type="number" value={counter} readOnly />
              <button className="text plus" onClick={() => addToCounter(1)} disabled={counter === 5}>+</button>
            </div>
            <small>Maximo 5 unidades</small>
            <div className="buttons-container">
              <button className="primary" onClick={() => alert('Compra realizada correctamente')}>
                Comprar
              </button>
            </div>
          </section>
        </div>
      </div>
      <SimilarBooks id={book.id} />
    </>
  );
}
