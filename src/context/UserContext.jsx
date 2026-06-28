"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser as useAuth0User } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user: auth0User, isLoading, error } = useAuth0User();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!auth0User) {
      setUser(null);
      return;
    }

    setUser({
      id: auth0User.sub,
      name: auth0User.name ?? "",
      email: auth0User.email ?? "",
    });
  }, [auth0User, isLoading]);

  function logout() {
    router.push(`/auth/logout`);
  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }
  return context;
}
