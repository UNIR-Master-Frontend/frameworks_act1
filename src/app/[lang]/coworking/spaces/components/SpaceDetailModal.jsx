"use client";

import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { useMessages } from "@/context/LanguageContext";

export default function SpaceDetailModal({
  isOpen,
  onClose,
  space,
  onReserve,
}) {
  const t = useMessages().coworking;
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  if (!space) return null;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const horarios = [
    { hora: "09:00 - 10:00", disponible: false },
    { hora: "10:00 - 11:00", disponible: true },
    { hora: "11:00 - 12:00", disponible: true },
    { hora: "12:00 - 13:00", disponible: true },
    { hora: "13:00 - 14:00", disponible: true },
    { hora: "14:00 - 15:00", disponible: false },
  ];

  const servicios = space.servicios || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[90vh] lg:h-[85vh] flex flex-col">
        <div className="sticky top-0 bg-white px-4 sm:px-6 lg:px-8 py-4 lg:py-5 border-b border-gray-200 z-50 flex items-center justify-between gap-4 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl font-bold text-gray-900 flex-1">
            {t.detailsTitle}
          </h1>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 rounded-full shadow-md hover:shadow-lg transition-all border border-gray-300 flex-shrink-0 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <span className="text-2xl font-bold leading-none">×</span>
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.5fr_400px] xl:grid-cols-[2fr_420px] gap-0 overflow-hidden min-h-0">
          <div className="px-4 sm:px-6 lg:px-10 xl:px-12 py-4 lg:py-6 pb-32 lg:pb-6 overflow-y-auto overflow-x-hidden">
            <div className="relative rounded-xl overflow-hidden mb-5 lg:mb-6">
              <img
                src={space.imagen}
                alt={space.nombre}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/70 to-transparent">
                <span className="inline-block px-3 py-1.5 backdrop-blur-lg rounded-full border border-white text-[0.65rem] lg:text-xs font-semibold uppercase tracking-wide text-white mb-2">
                  {space.categoria || t.category}
                </span>
                <h2 className="text-white text-xl lg:text-2xl font-bold mb-1 leading-tight">
                  {space.nombre}
                </h2>
                <p className="text-white/90 text-sm lg:text-base">
                  ⭐ {space.rating || "4.8"} - {space.valoraciones || "120"}{" "}
                  {t.ratings}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-full">
                <span className="text-lg">👥</span>
                <span className="text-sm lg:text-base font-medium text-gray-900 whitespace-nowrap">
                  {space.capacidad} {t.people}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-full">
                <span className="text-lg">🕐</span>
                <span className="text-sm lg:text-base font-medium text-gray-900 whitespace-nowrap">
                  {space.horario || "9:00 - 18:00"}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-full">
                <span className="text-lg">📏</span>
                <span className="text-sm lg:text-base font-medium text-gray-900 whitespace-nowrap">
                  {space.metros_cuadrados || "50"} m²
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 text-left">
                {t.about}
              </h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed text-left">
                {space.descripcion || t.defaultDescription}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 text-left">
                {t.selectDate}
              </h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <div className="flex items-center justify-around bg-purple-800 text-white px-4 py-3 lg:py-4">
                  <button className="text-gray-300 hover:text-white transition text-xl lg:text-2xl">
                    ←
                  </button>
                  <h3 className="text-sm lg:text-lg font-semibold">
                    {t.calendarMonth}
                  </h3>
                  <button className="text-gray-300 hover:text-white transition text-xl lg:text-2xl">
                    →
                  </button>
                </div>
                <div className="grid grid-cols-7 bg-purple-500 text-white font-semibold text-xs lg:text-sm">
                  {t.weekdays.map((name, i) => (
                    <div
                      key={i}
                      className="text-center py-2 lg:py-3 border-r border-purple-400 last:border-r-0"
                    >
                      {name.charAt(0)}
                      <span className="hidden lg:inline">{name.slice(1)}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 bg-white">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square sm:aspect-auto sm:py-4 lg:py-6 text-sm lg:text-base border-r border-b border-gray-200 last:border-r-0 transition-all duration-200 ${
                        selectedDay === day
                          ? "bg-purple-100 text-purple-700 font-bold border-2 border-purple-600"
                          : "bg-white text-gray-900 hover:bg-purple-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedDay && (
              <div className="mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 text-left">
                  {t.availableSchedule}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {horarios.map((horario, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        horario.disponible && setSelectedHour(horario.hora)
                      }
                      disabled={!horario.disponible}
                      className={`px-4 py-3 lg:py-4 rounded-lg text-sm lg:text-base font-semibold transition-all ${
                        !horario.disponible
                          ? "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed line-through"
                          : selectedHour === horario.hora
                            ? "bg-purple-600 border-2 border-purple-600 text-white shadow-lg"
                            : "bg-white border-2 border-gray-300 text-gray-900 hover:border-purple-500 hover:bg-purple-50"
                      }`}
                    >
                      {horario.hora}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 text-left">
                {t.includedServices}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicios.length > 0 ? (
                  servicios.map((servicio, index) => (
                    <div
                      key={index}
                      className="flex lg:flex-col items-start lg:items-center gap-3 lg:gap-4 p-4 lg:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-3xl lg:text-5xl flex-shrink-0">
                        {servicio.icono}
                      </div>
                      <div className="flex-1 lg:text-center">
                        <h4 className="text-sm lg:text-base font-bold text-gray-900 mb-1">
                          {servicio.nombre}
                        </h4>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {servicio.descripcion}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex lg:flex-col items-start lg:items-center gap-3 p-4 lg:p-6 bg-gray-50 rounded-xl">
                      <div className="text-3xl lg:text-5xl">☕</div>
                      <div className="lg:text-center">
                        <h4 className="text-sm lg:text-base font-bold text-gray-900 mb-1">
                          {t.svcCoffeeTitle}
                        </h4>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {t.svcCoffeeDesc}
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:flex-col items-start lg:items-center gap-3 p-4 lg:p-6 bg-gray-50 rounded-xl">
                      <div className="text-3xl lg:text-5xl">📶</div>
                      <div className="lg:text-center">
                        <h4 className="text-sm lg:text-base font-bold text-gray-900 mb-1">
                          {t.svcWifiTitle}
                        </h4>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {t.svcWifiDesc}
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:flex-col items-start lg:items-center gap-3 p-4 lg:p-6 bg-gray-50 rounded-xl">
                      <div className="text-3xl lg:text-5xl">❄️</div>
                      <div className="lg:text-center">
                        <h4 className="text-sm lg:text-base font-bold text-gray-900 mb-1">
                          {t.svcAcTitle}
                        </h4>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {t.svcAcDesc}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <aside className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto bg-slate-50 z-[101] lg:overflow-y-auto">
            <div className="bg-white lg:bg-transparent p-4 lg:p-6 lg:pt-6 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:shadow-none text-center">
              <div className="lg:bg-white lg:rounded-2xl lg:p-8 lg:border lg:border-gray-200">
                <div className="flex items-baseline justify-center gap-2 mb-3 lg:pb-6 lg:border-b lg:border-gray-200 lg:mb-6">
                  <span className="text-3xl lg:text-5xl font-bold text-gray-900">
                    {space.precio || "25"}€
                  </span>
                  <span className="text-sm lg:text-lg text-gray-500">
                    {t.perHour}
                  </span>
                </div>
                <div className="hidden lg:block mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">
                    {t.yourBooking}
                  </h3>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">{t.date}</span>
                      <span className="font-semibold text-gray-900">
                        {selectedDay
                          ? `${selectedDay} ${t.monthName}`
                          : t.dateNotSelected}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">{t.time}</span>
                      <span className="font-semibold text-gray-900">
                        {selectedHour || t.notSelected}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">{t.duration}</span>
                      <span className="font-semibold text-gray-900">
                        {t.durationValue}
                      </span>
                    </div>
                    <div className="h-px bg-gray-300 my-4" />
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-gray-900">
                        {t.total}
                      </span>
                      <span className="text-2xl font-extrabold text-gray-900">
                        €{space.precio || "25"}.00
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onReserve}
                  disabled={space.estado !== "disponible"}
                  className="w-full px-6 py-4 bg-purple-600 text-white text-base lg:text-lg font-bold rounded-xl transition-all hover:bg-purple-700 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {space.estado === "disponible"
                    ? t.bookButton
                    : t.notAvailable}
                </button>
                <p className="hidden lg:block text-sm text-gray-500 mt-6">
                  {t.cancelationPolicy}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Modal>
  );
}
