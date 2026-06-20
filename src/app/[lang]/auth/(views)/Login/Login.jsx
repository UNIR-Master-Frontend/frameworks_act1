"use client";

import { useState } from "react";
import styles from "./Login.module.css";

import Button from "@/components/Button/Button";
import useLoading from "@/hooks/useLoading";
import { login } from "../../services/auth.service";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useMessages } from "@/context/LanguageContext";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoading();
  const { setUser: setUserLogin } = useUser();
  const router = useRouter();
  const t = useMessages().auth;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const userData = await login({ user, password });
    setUserLogin(userData);
    setLoading(false);
    
    router.back(); 
  };

  return (
    <div className={styles['login-page']}>
      <form className={styles['login-card']} onSubmit={onSubmit}>
        <img src="/images/svg/logo_nexus.svg" alt="Logo de Nexus" />

        <h2>{t.title}</h2>

        <label>
          {t.username}
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </label>

        <label>
          {t.password}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <Button
          type="submit"
          label={t.submit}
          disabled={!(user && password)}
        ></Button>
      </form>
    </div>
  );
}