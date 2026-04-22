"use client";

import Button from "@/components/Button/Button";
import Modal from "@/components/modal/Modal";
import { createReservation } from "@/services/coworking.service";
import { useState } from "react";

export default function ReservationModal({ isOpen, onClose, space = {} }) {
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
        reservas: [
          {
            espacioId: space.id,
            fecha_reserva: entrada.toISOString(),
            fecha_salida: salida.toISOString(),
            usuariosId: [1],
          },
        ],
      };

      await createReservation(reservaData);

      alert("¡Reserva confirmada exitosamente! ✅");
      onClose();
    } catch (error) {
      console.log(error);
      alert("Error al crear la reserva");
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="h-[90vh] lg:h-[85vh] flex flex-col">
        <div className="sticky top-0 bg-white px-4 sm:px-6 lg:px-8 py-4 lg:py-5 border-b border-gray-200 z-50 flex items-center justify-between gap-4 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl font-bold text-gray-900 flex-1">
            Reserva
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
                  {space.descripcion ||
                    "Espacio ideal para trabajo colaborativo"}
                </p>
                <ul className="space-details">
                  <li className="py-2 font-normal text-sm">
                    👥 {space.capacidad} personas
                  </li>
                  <li className="py-2 font-normal text-sm">☕ Café incluido</li>
                  <li className="py-2 font-normal text-sm">❄️ Climatización</li>
                </ul>
              </div>
            </section>
          </div>
          <div className="col-span-8">
            <section className="flex flex-col gap-4">
              <div className="rounded-2xl p-4 border-1 border-(--surface-200)">
                <h3 className="my-3 text-xl font-semibold">Datos personales</h3>
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label className="my-2">Nombre completo</label>
                    <input
                      autoComplete="name"
                      type="text"
                      placeholder="Nombre completo"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2">Correo electrónico</label>
                    <input
                      autoComplete="email"
                      type="email"
                      placeholder="correo@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2">Teléfono</label>
                    <input
                      autoComplete="tel"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="my-2">Fecha de reserva</label>
                    <input
                      type="datetime-local"
                      value={fechaReserva}
                      onChange={(e) => setFechaReserva(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-4 border-1 border-(--surface-200)">
                <h3 className="my-3 text-xl font-semibold">Método de pago</h3>

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
                    Tarjeta débito / crédito
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
                    PSE
                  </label>
                </div>

                {metodoPago === "tarjeta" && (
                  <div className="grid grid-cols-1  lg:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="my-2">Número de tarjeta</label>
                      <input
                        autoComplete="billing cc-number"
                        type="text"
                        placeholder="**** **** **** 1234"
                        value={numeroTarjeta}
                        onChange={(e) => setNumeroTarjeta(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">Nombre en la tarjeta</label>
                      <input
                        autoComplete="billing cc-name"
                        type="text"
                        value={nombreTarjeta}
                        placeholder=""
                        onInput={(e) => setNombreTarjeta(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">Fecha de expiración</label>
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
                      <label className="my-2">Tipo de persona</label>
                      <select
                        value={tipoPersona}
                        onChange={(e) => setTipoPersona(e.target.value)}
                      >
                        <option value="natural">Persona natural</option>
                        <option value="juridica">Persona jurídica</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">Banco</label>
                      <select
                        value={banco}
                        onChange={(e) => setBanco(e.target.value)}
                      >
                        <option value="">Selecciona tu banco</option>
                        <option value="bancolombia">Bancolombia</option>
                        <option value="davivienda">Davivienda</option>
                        <option value="bbva">BBVA</option>
                        <option value="bogota">Banco de Bogotá</option>
                        <option value="nequi">Nequi</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="my-2">Correo para PSE</label>
                      <input
                        autoComplete="email"
                        type="email"
                        placeholder="correo@email.com"
                        value={emailPse}
                        onChange={(e) => setEmailPse(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                label="Confirmar Reserva"
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
