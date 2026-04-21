"use client";

import { useState, useEffect } from "react";
import { getSpaces } from "@/services/coworking.service";

const gridPositions = [
  { col: "1 / 2", row: "1 / 2" },
  { col: "2 / 5", row: "1 / 2" },
  { col: "1 / 3", row: "2 / 3" },
  { col: "3 / 5", row: "2 / 3" },
  { col: "1 / 3", row: "3 / 4" },
  { col: "3 / 5", row: "3 / 5" },
  { col: "1 / 2", row: "4 / 5" },
  { col: "2 / 3", row: "4 / 5" },
  { col: "5 / 6", row: "1 / 5" },
];

export default function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpaces = async () => {
      setLoading(true);
      const data = await getSpaces();
      setSpaces(data.slice(0, gridPositions.length));
      setLoading(false);
    };

    loadSpaces();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando espacios...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mt-8 mb-4">
        <h1
          className="text-5xl font-bold"
          style={{ color: "var(--surface-900)" }}
        >
          Espacios disponibles
        </h1>
        <p className="text-lg mt-2" style={{ color: "var(--surface-600)" }}>
          Encuentra espacios disponibles de co-working
        </p>
      </div>

      <div
        className="grid w-full gap-4 py-8"
        style={{
          height: "800px",
          gridTemplateColumns: "1.2fr 1.2fr 0.6fr 0.6fr 0.8fr",
          gridTemplateRows: "repeat(4, 1fr)",
        }}
      >
        {spaces.map((space, index) => {
          const position = gridPositions[index];
          if (!position) return null;

          const isUnavailable =
            space.estado === "ocupado" || space.estado === "reservado";

          return (
            <div
              key={space.id}
              className={`
                rounded-lg p-7 text-white font-semibold text-lg
                flex items-end justify-start cursor-pointer
                relative overflow-hidden shadow-md
                transition-all duration-500 ease-in-out hover:scale-105
                ${isUnavailable ? "opacity-60 cursor-not-allowed pointer-events-none saturate-50" : ""}
              `}
              style={{
                backgroundColor: "var(--primary-600)",
                gridColumn: position.col,
                gridRow: position.row,
              }}
            >
              <span className="relative z-10">{space.nombre}</span>

              {isUnavailable && (
                <>
                  <div className="absolute inset-0 bg-black/20 rounded-lg z-0" />
                  <span className="absolute top-2.5 right-2.5 z-20 text-xs px-3 py-1.5 rounded-full font-semibold bg-white/95 text-gray-600 shadow">
                    No disponible
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
