'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useMessages } from '@/context/LanguageContext';

function FilterSidebarInner({ onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useMessages().filters;

  const isBooks = pathname.includes('/library/books');

  const bookCategories = [
    'REFERENCIAS',
    'MONOGRAFIAS',
    'GUIAS',
    'TEXTO',
    'MANUALES',
  ];

  const magazineCategories = [
    'DIVULGACION',
    'BOLETINES INSTITUCIONALES',
    'CIENTIFICAS',
  ];

  const categories = isBooks ? bookCategories : magazineCategories;

  // estados
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  // sync con URL
  useEffect(() => {
    setCategory((searchParams.get('category') || '').toLowerCase());
    setYear(searchParams.get('year') || '');
    setPriceMin(searchParams.get('priceMin') || '');
    setPriceMax(searchParams.get('priceMax') || '');
  }, [searchParams]);

  // validaciones
  const handleYearChange = (value) => {
    const num = Number(value);
    if (num < 0) return;
    setYear(value);
  };

  const handlePriceMinChange = (value) => {
    const num = Number(value);
    if (num < 0) return;
    setPriceMin(value);
  };

  const handlePriceMaxChange = (value) => {
    const num = Number(value);
    if (num < 0) return;
    setPriceMax(value);
  };

  // aplicar filtros
  const applyFilters = (e) => {
    e.preventDefault();

    if (priceMin && priceMax && Number(priceMin) > Number(priceMax)) {
      alert(t.priceError);
      return;
    }

    const params = new URLSearchParams();

    if (category) params.set('category', category);
    if (year) params.set('year', year);
    if (priceMin) params.set('priceMin', priceMin);
    if (priceMax) params.set('priceMax', priceMax);

    router.push(`${pathname}?${params.toString()}`);

    onClose?.();
  };

  // limpiar filtros
  const clearFilters = () => {
    setCategory('');
    setYear('');
    setPriceMin('');
    setPriceMax('');

    router.push(pathname);

    onClose?.();
  };

  return (
    <aside className="bg-slate-100 p-5 w-full lg:w-64 lg:fixed lg:top-[90px] lg:left-0 lg:h-[calc(100vh-90px)] border-r border-slate-200 overflow-y-auto box-border">
      
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        {t.title}
      </h3>

      <form onSubmit={applyFilters}>
        
        {/* Categoría */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-3 w-full rounded border border-slate-300 p-2 bg-white"
        >
          <option value="">{t.all}</option>

          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>

        {/* Año */}
        <input
          type="number"
          placeholder={t.year}
          value={year}
          min="0"
          max={new Date().getFullYear()}
          onChange={(e) => handleYearChange(e.target.value)}
          className="mb-3 w-full rounded border border-slate-300 p-2 bg-white"
        />

        {/* Precio */}
        <div className="mb-4">
          <p className="mb-2 text-sm text-slate-600">{t.price}</p>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder={t.min}
              value={priceMin}
              min="0"
              onChange={(e) => handlePriceMinChange(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 bg-white"
            />
            <input
              type="number"
              placeholder={t.max}
              value={priceMax}
              min="0"
              onChange={(e) => handlePriceMaxChange(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 bg-white"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-2 mt-2 w-full">
          <button
            type="submit"
            className="flex-1 min-w-0 rounded bg-[var(--primary-600)] py-2 font-semibold text-white"
          >
            {t.apply}
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="flex-1 min-w-0 rounded border py-2 font-semibold bg-white text-slate-700"
          >
            {t.clear}
          </button>
        </div>
      </form>
    </aside>
  );
}

export default function FilterSidebar(props) {
  return (
    <Suspense fallback={<aside className="bg-slate-100 p-5 w-full lg:w-64" />}>
      <FilterSidebarInner {...props} />
    </Suspense>
  );
}