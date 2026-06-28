"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Importamos los estilos como módulo
import styles from "./Header.module.css";

import NavItem from "../../components/NavItem/NavItem";
import useUser from "../../hooks/useUser";
import Button from "../../components/Button/Button";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLang, useMessages } from "@/context/LanguageContext";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useUser();

  const lang = useLang();
  const messages = useMessages();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const withLang = (path) => `/${lang}${path === "/" ? "" : path}`;

  return (
    <header className={styles.menu}>
      <div className={styles["menu-container"]}>
        <Link href={withLang("/")} onClick={closeMenu}>
          <Image
            src="/images/svg/logo_nexus.svg"
            alt="Logo Nexus"
            className={styles.logo}
            width={60}
            height={20}
          />
        </Link>

        <div className={styles["hamburger-container"]}>
          <input
            type="checkbox"
            className={styles["menu-icon"]}
            id="hamburguer"
            checked={menuOpen}
            onChange={(e) => setMenuOpen(e.target.checked)}
          />
          <label htmlFor="hamburguer">
            <Image
              src={
                menuOpen
                  ? "/images/svg/close-icon.svg"
                  : "/images/svg/menu-hamburger.svg"
              }
              alt="icono de menú"
              width={24}
              height={24}
            />
          </label>
        </div>

        {/* Lógica condicional usando el módulo CSS */}
        <nav className={menuOpen ? styles["nav-open"] : ""}>
          <ul>
            <NavItem
              label={messages.nav.home}
              path={withLang("/")}
              onClick={closeMenu}
            />
            <NavItem
              label={messages.nav.library}
              path={withLang("/library")}
              onClick={closeMenu}
            />
            <NavItem
              label={messages.nav.coworking}
              path={withLang("/coworking")}
              onClick={closeMenu}
            />
            <li
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LanguageSwitcher />
            </li>
            <li className={styles["button-group"]}>
              {user ? (
                <>
                  <h3>{user.nombre}</h3>
                  <Button
                    label={messages.nav.logout}
                    variant="primary"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  />
                </>
              ) : (
                <Button
                  label={messages.nav.login}
                  variant="primary"
                  onClick={() => {
                    router.push(withLang("/authorization"));
                    closeMenu();
                  }}
                />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
