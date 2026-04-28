"use client";

import { useState } from "react";
import styles from "./Login.module.css";

import Button from "@/components/Button/Button";
import useLoading from "@/hooks/useLoading";
import { login } from "../../services/auth.service";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useLoading();
  const { setUser: setUserLogin } = useUser();
  const router = useRouter(); 

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

        <h2>Iniciar sesión</h2>

        <label>
          Usuario
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <Button
          type="submit"
          label="Entrar"
          disabled={!(user && password)}
        ></Button>
      </form>
    </div>
  );
}