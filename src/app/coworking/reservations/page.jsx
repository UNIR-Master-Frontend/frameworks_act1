import { getReservations } from "@/services/coworking.service";
import ReservationList from "./components/ReservationList";

export default async function Reservations() {
  const reservations = await getReservations();

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 text-center">
        <h1 className="text-4xl font-bold">Mis Reservas</h1>
        <p className="text-lg font-normal text-(--surface-600)">
          Gestiona tus espacios de co-working reservados
        </p>
      </div>

      <div className="col-span-12  mt-6">
        {reservations.length === 0 ? (
          <>
            <h3 className="text-2xl">📅 No tienes reservas activas</h3>
            <p className="text-sm">
              Reserva un espacio de co-working para empezar
            </p>
          </>
        ) : (
          <ReservationList reservations={reservations} />
        )}
      </div>
    </div>
  );
}
