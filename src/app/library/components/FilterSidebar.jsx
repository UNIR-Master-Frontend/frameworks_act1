'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function FilterSidebar({ onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isBooks = pathname.startsWith('/library/books');

  // categorías alineadas con backend
  const bookCategories = [
    { value: 'texto', label: 'TEXTO' },
    { value: 'guias', label: 'GUÍAS' },
    { value: 'manuales', label: 'MANUALES' },
    { value: 'monografias', label: 'MONOGRAFÍAS' },
    { value: 'referencias', label: 'REFERENCIAS' },
  ];

  const magazineCategories = [
    { value: 'divulgacion', label: 'DIVULGACIÓN' },
    { value: 'boletines institucionales', label: 'BOLETINES INSTITUCIONALES' },
    { value: 'cientificas', label: 'CIENTÍFICAS' },
  ];

  const categories = isBooks ? bookCategories : magazineCategories;

  // valores actuales desde URL
  const currentCategory = searchParams.get('category') || '';
  const currentYear = searchParams.get('year') || '';
  const currentPriceMin = searchParams.get('priceMin') || '';
  const currentPriceMax = searchParams.get('priceMax') || '';

  // aplicar filtros SOLO con botón
  const applyFilters = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) {
        params.set(key, value.toString().toLowerCase());
      }
    });

    router.push(`${pathname}?${params.toString()}`);

    if (onClose) onClose();
  };

  // limpiar filtros
  const clearFilters = () => {
    router.push(pathname);
    if (onClose) onClose();
  };

  return (
    <aside className="bg-white p-4 overflow-y-auto w-full lg:w-64 lg:fixed lg:top-[90px] lg:left-0 lg:h-[calc(100vh-90px)] border-r border-slate-200">
      
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Filtros
      </h3>

      <form onSubmit={applyFilters}>
        
        {/* Categoría */}
        <select
          name="category"
          defaultValue={currentCategory}
          className="mb-3 w-full rounded border border-slate-300 p-2"
        >
          <option value="">Todas</option>

          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Año */}
        <input
          name="year"
          type="number"
          placeholder="Año"
          defaultValue={currentYear}
          className="mb-3 w-full rounded border border-slate-300 p-2"
        />

        {/* Precio */}
        <div className="mb-4">
          <p className="mb-2 text-sm text-slate-600">Precio</p>

          <div className="flex gap-2">
            <input
              name="priceMin"
              type="number"
              placeholder="Mín"
              defaultValue={currentPriceMin}
              className="w-full rounded border border-slate-300 p-2"
            />
            <input
              name="priceMax"
              type="number"
              placeholder="Máx"
              defaultValue={currentPriceMax}
              className="w-full rounded border border-slate-300 p-2"
            />
          </div>
        </div>

        {/* botones */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full rounded bg-[var(--primary-600)] py-2 font-semibold text-white"
          >
            Aplicar
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded border py-2 font-semibold"
          >
            Limpiar
          </button>
        </div>
      </form>
    </aside>
  );
}