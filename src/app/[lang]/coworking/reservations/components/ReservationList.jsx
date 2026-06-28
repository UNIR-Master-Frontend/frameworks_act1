"use client";

import { useState } from "react";
import ReservationCard from "./ReservationCard";

export default function ReservationList({ reservations = [] }) {
  const [reservationList, setReservationList] = useState(reservations);

  const onCancel = (reservationId) => {
    const index = reservationList.findIndex((r) => r.id === reservationId);
    if (index === -1) return;

    const newArray = reservationList.toSpliced(index, 1);
    setReservationList(newArray);
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {reservationList.map((reservation, index) => (
        <ReservationCard
          key={`${reservation.id}_${index}`}
          reservation={reservation}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
