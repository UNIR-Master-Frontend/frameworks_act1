'use client';
import { useRouter } from 'next/navigation';

export default function FilterSidebar() {
  const router = useRouter();

  const applyFilters = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) params.append(key, value);
    });

    router.push(`/library/books?${params.toString()}`);
  };

  return (
    <aside className="fixed top-[72px] left-0 hidden h-[calc(100vh-72px)] w-64 border-r border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur lg:block">
      <h3 className="mb-4 font-bold text-slate-900">Filtros</h3>

      <form onSubmit={applyFilters}>
        <select name="category" className="mb-3 w-full rounded border border-slate-300 p-2">
          <option value="">Todas</option>
          <option value="monografias">Monografias</option>
        </select>

        <input name="year" type="number" placeholder="Ano" className="mb-3 w-full rounded border border-slate-300 p-2" />

        <input name="price" type="number" placeholder="Precio max" className="mb-3 w-full rounded border border-slate-300 p-2" />

        <input name="date" type="date" className="mb-3 w-full rounded border border-slate-300 p-2" />

        <button className="w-full rounded bg-[var(--primary-600)] py-2 font-semibold text-white">
          Aplicar
        </button>
      </form>
    </aside>
  );
}
