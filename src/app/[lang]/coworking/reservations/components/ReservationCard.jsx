"use client";

import { formatDate } from "@/helpers/date";
import { deleteReservation } from "@/services/coworking.service";
import { useMessages } from "@/context/LanguageContext";

export default function ReservationCard({ reservation, onCancel }) {
  const messages = useMessages();
  const t = messages.reservations;

  const handleCancelReservation = async (reservationId) => {
    if (!confirm(t.confirmCancel)) return;

    try {
      await deleteReservation(reservationId);
      onCancel(reservationId);
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert(t.cancelError);
    }
  };

  return (
    <div
      key={reservation.id}
      className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl overflow-hidden border-1 border-(--surface-200) "
    >
      <div className="flex p-4 items-center bg-(--primary-700) text-white">
        <div className="space-info">
          <h3 className="text-2xl">
            {t.cardId} {reservation.id}
          </h3>
          <span className="text-sm">
            {t.space} {reservation.espacioId}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col p-2">
            <span className="text-sm font-medium text-(--surface-600)">
              {t.checkIn}{" "}
            </span>
            <span className="text-base">
              {formatDate(reservation.fecha_reserva)}
            </span>
          </div>
          <div className="flex flex-col p-2">
            <span className="text-sm font-medium text-(--surface-600)">
              {t.checkOut}{" "}
            </span>
            <span className="text-base">
              {formatDate(reservation.fecha_salida)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-(--surface-50) border-t-1 border-(--surface-200)">
        <button
          className="px-2 py-3 bg-red-700 text-base w-full rounded-md text-white cursor-pointer transition duration-150  scale-[1] hover:bg-red-800 hover:scale-[1.02]"
          onClick={() => handleCancelReservation(reservation.id)}
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
