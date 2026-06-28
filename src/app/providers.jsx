// src/app/providers.jsx
"use client";
import { UserProvider } from "@/context/UserContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { Auth0Provider } from "@auth0/nextjs-auth0";

export function Providers({ children }) {
  return (
    <UserProvider>
      <LoadingProvider>
        <Auth0Provider>{children}</Auth0Provider>
      </LoadingProvider>
    </UserProvider>
  );
}
