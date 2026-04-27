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

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUserLogin } = useUser();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    
    <header className={styles.menu}>
      
      <div className={styles["menu-container"]}>
        <Link href="/" onClick={closeMenu}>
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
              src={menuOpen ? "/images/svg/close-icon.svg" : "/images/svg/menu-hamburger.svg"} 
              alt="icono de menú" 
              width={24} 
              height={24} 
            />
          </label>
        </div>

        {/* Lógica condicional usando el módulo CSS */}
        <nav className={menuOpen ? styles["nav-open"] : ""}>
          <ul>
            <NavItem label="Inicio" path="/" onClick={closeMenu} />
            <NavItem label="Librería" path="/library" onClick={closeMenu} />
            <NavItem label="Coworking" path="/coworking" onClick={closeMenu} />
            <li className={styles["button-group"]}>
              {user ? (
                <>
                  <h3>{user.nombre}</h3>
                  <Button
                    label="Cerrar Sesión"
                    variant="primary"
                    onClick={() => {
                      setUserLogin(undefined);
                      closeMenu();
                    }}
                  />
                </>
              ) : (
                <Button
                  label="Iniciar Sesión"
                  variant="primary"
                  onClick={() => {
                    router.push("/auth");
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