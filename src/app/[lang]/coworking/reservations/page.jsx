import { getReservations } from "@/server/coworking";
import { getMessages } from "@/config/i18n";
import ReservationList from "./components/ReservationList";

export default async function Reservations({ params }) {
  const { lang } = await params;
  const messages = getMessages(lang);
  const t = messages.reservations;

  const reservations = await getReservations();

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 text-center">
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="text-lg font-normal text-(--surface-600)">{t.subtitle}</p>
      </div>

      <div className="col-span-12  mt-6">
        {reservations.length === 0 ? (
          <>
            <h3 className="text-2xl">{t.emptyTitle}</h3>
            <p className="text-sm">{t.emptySubtitle}</p>
          </>
        ) : (
          <ReservationList reservations={reservations} />
        )}
      </div>
    </div>
  );
}
