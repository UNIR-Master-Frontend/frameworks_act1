'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <aside className="fixed top-[60px] left-0 w-64 h-[calc(100vh-60px)] bg-white border-r p-4 shadow">
      <h3 className="font-bold mb-4">Filtros</h3>

      <form onSubmit={applyFilters}>
        <select name="category" className="w-full p-2 border rounded mb-3">
          <option value="">Todas</option>
          <option value="monografias">Monografías</option>
        </select>

        <input name="year" type="number" placeholder="Año" className="w-full p-2 border rounded mb-3" />

        <input name="price" type="number" placeholder="Precio máx" className="w-full p-2 border rounded mb-3" />

        <input name="date" type="date" className="w-full p-2 border rounded mb-3" />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Aplicar
        </button>
      </form>
    </aside>
  );
}