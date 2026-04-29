"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import useUser from "@/hooks/useUser";

import styles from "./layout.module.css";

export default function LibraryLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // detectar rutas
  const isSpacesRoute = pathname.startsWith("/coworking/spaces");
  const isMyReservationsRoute = pathname.startsWith("/coworking/reservations");

  // prefetch
  useEffect(() => {
    router.prefetch("/coworking/spaces");
  }, [router]);

  return (
    <div className={styles.libraryShell}>
      {/* NAV */}
      <div className={styles.subnav}>
        <Link
          href="/coworking/spaces"
          className={`${styles.subnavButton} ${isSpacesRoute ? styles.subnavButtonActive : ""}`}
        >
          Espacios
        </Link>

        {user && (
          <Link
            href="/coworking/reservations"
            className={`${styles.subnavButton} ${isMyReservationsRoute ? styles.subnavButtonActive : ""}`}
          >
            Mis reservas
          </Link>
        )}
      </div>

      {/* CONTENIDO */}
      <main className={`${styles.content}`}>{children}</main>
    </div>
  );
}
