"use client";

import Button from "@/components/Button/Button";
import Modal from "@/components/modal/Modal";
import { createReservation } from "@/services/coworking.service";
import { useState } from "react";
import { useMessages } from "@/context/LanguageContext";

export default function ReservationModal({ isOpen, onClose, space = {} }) {
  const t = useMessages().coworking;
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaReserva, setFechaReserva] = useState("");
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvv, setCvv] = useState("");

  const [tipoPersona, setTipoPersona] = useState("natural");
  const [banco, setBanco] = useState("");
  const [emailPse, setEmailPse] = useState("");

  const handleReservar = async () => {
    try {
      const fechaBase = fechaReserva || new Date().toISOString().slice(0, 16);
      const entrada = new Date(fechaBase);
      const salida = new Date(entrada);
      salida.setHours(salida.getHours() + 8);

      const reservaData = {
        espacio_id: space.id,
        fecha_reserva: entrada.toISOString(),
        fecha_salida: salida.toISOString(),
        usuario_id: 1,
      };

      await createReservation(reservaData);

      alert(t.reservationSuccess);
      onClose();
    } catch (error) {
      console.log(error);
      alert(t.reservationError);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="h-[90vh] lg:h-[85vh] flex flex-col">
        <div className="sticky top-0 bg-white px-4 sm:px-6 lg:px-8 py-4 lg:py-5 border-b border-gray-200 z-50 flex items-center justify-between gap-4 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl font-bold text-gray-900 flex-1">
            {t.reservationTitle}
          </h1>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center  hover:bg-gray-200 active:bg-gray-300 text-gray-900 rounded-full  hover:!bg-(--primary-50) transition-all border border-gray-300 flex-shrink-0 cursor-pointer"
            aria-label="Cerrar modal"
          >
            <span className="text-2xl font-bold leading-none">×</span>
          </button>
        </div>

        <div className="grid grid-cols-1 py-4 px-12 gap-y-4 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-4">
            <section className="rounded-2xl overflow-hidden border-1 border-(--surface-200) border-solid">
              <img
                src="https://images.unsplash.com/photo-1604328704120-91e8d2fdc188?q=80&w=1770"
                alt={space.nombre}
              />
              <div className="space-info p-5">
                <h2 className="text-2xl font-bold mb-2">{space.nombre}</h2>
                <p className="leading-4 font-normal mb-4">
                  {space.descripcion || t.defaultDescriptionShort}
                </p>
                <ul className="space-details">
                  <li className="py-2 font-normal text-sm">
                    👥 {space.capacidad} {t.people}
                  </li>
                  <li className="py-2 font-normal text-sm">☕ {t.svcCoffeeTitle}</li>
                  <li className="py-2 font-normal text-sm">❄️ {t.svcAcTitle}</li>
                </ul>
              </div>
            </section>
          </div>
          <div className="col-span-8">
            <section className="flex flex-col gap-4">
              <div className="rounded-2xl p-4 border-1 border-(--surface-200)">
                <h3 className="my-3 text-xl font-semibold">{t.personalData}</h3>
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className="my-2">{t.fullName}</label>
                    <input
                      autoComplete="name"
                      type="text"
                      placeholder={t.fullName}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2">{t.email}</label>
                    <input
                      autoComplete="email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2">{t.phone}</label>
                    <input
                      autoComplete="tel"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2">{t.reservationDate}</label>
                    <input
                      type="datetime-local"
                      value={fechaReserva}
                      onChange={(e) => setFechaReserva(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4 border-1 border-(--surface-200)">
                <h3 className="my-3 text-xl font-semibold">{t.paymentMethod}</h3>

                <div className="flex flex-col gap-2 mb-4">
                  <label className="flex p-4 gap-3 rounded-md border-1 border-(--surface-300) cursor-pointer hover:bg-(--surface-50)">
                    <input
                      className="appearance-none border-2 border-gray-300  checked:bg-(--primary-200) checked:!border-(--primary-500)"
                      type="radio"
                      name="pago"
                      value="tarjeta"
                      checked={metodoPago === "tarjeta"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    {t.cardOption}
                  </label>

                  <label className="flex p-4 gap-3 rounded-md border-1 border-(--surface-300) cursor-pointer hover:bg-(--surface-50)">
                    <input
                      className="appearance-none border-2 border-gray-300  checked:bg-(--primary-200) checked:!border-(--primary-500)"
                      type="radio"
                      name="pago"
                      value="pse"
                      checked={metodoPago === "pse"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    {t.pseOption}
                  </label>
                </div>

                {metodoPago === "tarjeta" && (
                  <div className="grid grid-cols-1  lg:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="my-2">{t.cardNumber}</label>
                      <input
                        autoComplete="billing cc-number"
                        type="text"
                        placeholder="**** **** **** 1234"
                        value={numeroTarjeta}
                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">{t.cardName}</label>
                      <input
                        autoComplete="billing cc-name"
                        type="text"
                        value={nombreTarjeta}
                        placeholder=""
                        onInput={(e) => setNombreTarjeta(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">{t.expiration}</label>
                      <input
                        autoComplete="billing cc-exp"
                        placeholder=""
                        type="month"
                        value={expiracion}
                        onChange={(e) => setExpiracion(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">CVV</label>
                      <input
                        autoComplete="current-password webauthn"
                        type="password"
                        placeholder="***"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {metodoPago === "pse" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="my-2">{t.personType}</label>
                      <select
                        value={tipoPersona}
                        onChange={(e) => setTipoPersona(e.target.value)}
                      >
                        <option value="natural">{t.naturalPerson}</option>
                        <option value="juridica">{t.legalPerson}</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">{t.bank}</label>
                      <select
                        value={banco}
                        onChange={(e) => setBanco(e.target.value)}
                      >
                        <option value="">{t.selectBank}</option>
                        <option value="bancolombia">Bancolombia</option>
                        <option value="davivienda">Davivienda</option>
                        <option value="bbva">BBVA</option>
                        <option value="bogota">Banco de Bogotá</option>
                        <option value="nequi">Nequi</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">{t.emailPse}</label>
                      <input
                        autoComplete="email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={emailPse}
                        onChange={(e) => setEmailPse(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                label={t.confirmReservation}
                variant="primary"
                onClick={handleReservar}
              />
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
}
