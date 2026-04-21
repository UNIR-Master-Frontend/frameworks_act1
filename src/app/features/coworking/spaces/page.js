"use client";

import { useState, useEffect } from "react";
import { getSpaces } from "@/services/coworking.service";
import SpaceDetailModal from "./components/SpaceDetailModal";

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

const spaceImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1505624198937-c704aff72608?w=800&q=80",
  "https://images.unsplash.com/photo-1594235048794-fae8583a5af5?w=800&q=80",
  "https://images.unsplash.com/photo-1604328704120-91e8d2fdc188?w=800&q=80",
  "https://images.unsplash.com/photo-1687945727613-a4d06cc41024?w=800&q=80",
  "https://plus.unsplash.com/premium_photo-1661962361446-f450f3f21495?w=800&q=80",
  "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
];

export default function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const loadSpaces = async () => {
      setLoading(true);
      const data = await getSpaces();
      setSpaces(data.slice(0, gridPositions.length));
      setLoading(false);
    };

    loadSpaces();
  }, []);

  const handleSpaceClick = (space) => {
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-lg sm:text-xl text-gray-600">Cargando espacios...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mt-4 sm:mt-6 lg:mt-8 mb-3 sm:mb-4 px-4">
        <h1
          className="text-2xl sm:text-3xl lg:text-5xl font-bold"
          style={{ color: "var(--surface-900)" }}
        >
          Espacios disponibles
        </h1>
        <p
          className="text-sm sm:text-base lg:text-lg mt-1 sm:mt-2"
          style={{ color: "var(--surface-600)" }}
        >
          Encuentra espacios disponibles de co-working
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3 sm:gap-4 py-4 sm:py-6 px-4">
        {spaces.map((space, index) => {
          const isUnavailable =
            !space.disponible ||
            ["ocupado", "reservado"].includes(space.estado?.toLowerCase());

          const isHovered = hoveredIndex === index;
          const bgImage = spaceImages[index];

          return (
            <div
              key={space.id}
              onClick={() => !isUnavailable && handleSpaceClick(space)}
              onMouseEnter={() => !isUnavailable && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                rounded-lg p-5 sm:p-6 text-white font-semibold text-base sm:text-lg
                flex items-end justify-start cursor-pointer
                relative overflow-hidden shadow-md
                transition-all duration-500 ease-in-out hover:scale-105
                min-h-[180px] sm:min-h-[220px]
                ${isUnavailable ? "opacity-60 cursor-not-allowed pointer-events-none saturate-50" : ""}
              `}
              style={{
                backgroundColor: "var(--primary-600)",
                backgroundImage:
                  isHovered && !isUnavailable
                    ? `linear-gradient(to top, rgba(98, 44, 212, 0.6), rgba(98, 44, 212, 0.1)), url(${bgImage})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="relative z-10">{space.nombre}</span>

              {isUnavailable && (
                <>
                  <div className="absolute inset-0 bg-black/20 rounded-md z-0" />

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20">
                    <div className="backdrop-blur-xl bg-white/95 rounded-xl p-2.5 sm:p-3 shadow-xl border border-gray-200/50">
                      <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold text-[9px] sm:text-[10px] bg-slate-900 text-white shadow-lg">
                        No disponible
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center flex-shrink-0">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-purple-800 sm:w-5 sm:h-5"
                            >
                              <circle cx="10" cy="7" r="4" fill="#8B5CF6" />
                              <path
                                d="M3 17c0-2.7614 2.6863-5 7-5s7 2.2386 7 5"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-800">
                              Ocupado por
                            </p>
                            <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
                              {space.ocupadoPor || "Sin asignar"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center flex-shrink-0">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-purple-600 sm:w-5 sm:h-5"
                            >
                              <circle
                                cx="10"
                                cy="10"
                                r="8"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                fill="white"
                              />
                              <path
                                d="M10 6v4l3 2"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-600">
                              Horario
                            </p>
                            <p className="text-sm sm:text-base font-extrabold text-purple-700">
                              {space.ocupadoDesde || "--:--"} -{" "}
                              {space.ocupadoHasta || "--:--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="hidden lg:grid w-full gap-4 py-8"
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
            !space.disponible ||
            ["ocupado", "reservado"].includes(space.estado?.toLowerCase());

          const isHovered = hoveredIndex === index;
          const bgImage = spaceImages[index];

          return (
            <div
              key={space.id}
              onClick={() => !isUnavailable && handleSpaceClick(space)}
              onMouseEnter={() => !isUnavailable && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
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
                backgroundImage:
                  isHovered && !isUnavailable
                    ? `linear-gradient(to top, rgba(98, 44, 212, 0.6), rgba(98, 44, 212, 0.1)), url(${bgImage})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="relative z-10">{space.nombre}</span>

              {isUnavailable && (
                <>
                  <div className="absolute inset-0 bg-black/20 rounded-md z-0" />

                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="backdrop-blur-xl bg-white/95 rounded-xl p-3 shadow-xl border border-gray-200/50">
                      <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full font-semibold text-[10px] bg-slate-900 text-white shadow-lg">
                        No disponible
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-purple-800"
                            >
                              <circle cx="10" cy="7" r="4" fill="#8B5CF6" />
                              <path
                                d="M3 17c0-2.7614 2.6863-5 7-5s7 2.2386 7 5"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
                              Ocupado por
                            </p>
                            <p className="text-base font-bold text-gray-900">
                              {space.ocupadoPor || "Sin asignar"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-purple-600"
                            >
                              <circle
                                cx="10"
                                cy="10"
                                r="8"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                fill="white"
                              />
                              <path
                                d="M10 6v4l3 2"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          <div className="flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                              Horario
                            </p>
                            <p className="text-base font-extrabold text-purple-700">
                              {space.ocupadoDesde || "--:--"} -{" "}
                              {space.ocupadoHasta || "--:--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <SpaceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        space={selectedSpace}
      />
    </>
  );
}
