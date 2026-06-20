"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { LANGUAGES, SUPPORTED_LANGUAGES } from "@/config/i18n";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const lang = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLang = (newLang) => {
    const segments = pathname.split("/").filter(Boolean);
    if (SUPPORTED_LANGUAGES.includes(segments[0])) {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    router.push("/" + segments.join("/"));
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles.switcher}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
        aria-label="Cambiar idioma"
        aria-expanded={isOpen}
      >
        <span>{lang.toUpperCase()}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => changeLang(code)}
                className={`${styles.option} ${lang === code ? styles.optionActive : ""}`}
              >
                <span className={styles.optionCode}>{code.toUpperCase()}</span>
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
